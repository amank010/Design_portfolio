import { lazy, Suspense, useCallback, useEffect, useRef, useState } from "react";
import { useMediaQuery } from "react-responsive";

import CaseBoard from "../components/hero/CaseBoard";
import { desktop, mobile } from "../components/hero/layout";
import useTheme from "../hooks/useTheme";
import { gsap, useGSAP } from "../lib/gsap";

const HeroBulb = lazy(() => import("./HeroBulb"));

// The board leans toward the pointer a little (mouse only).
const usePointerTilt = (sectionRef, targetRef) => {
  useEffect(() => {
    const section = sectionRef.current;
    if (!window.matchMedia("(hover: hover) and (prefers-reduced-motion: no-preference)").matches) {
      return undefined;
    }
    let frame = 0;
    const onMove = (event) => {
      const { innerWidth, innerHeight } = window;
      const x = event.clientX / innerWidth - 0.5;
      const y = event.clientY / innerHeight - 0.5;
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const target = targetRef.current;
        target.style.setProperty("--tilt-x", `${(-y * 3).toFixed(2)}deg`);
        target.style.setProperty("--tilt-y", `${(x * 4).toFixed(2)}deg`);
        section.style.setProperty("--drift-x", `${(-x * 26).toFixed(1)}px`);
        section.style.setProperty("--drift-y", `${(-y * 16).toFixed(1)}px`);
      });
    };
    section.addEventListener("pointermove", onMove);
    return () => {
      section.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(frame);
    };
  }, [sectionRef, targetRef]);
};

const clamp = (value, a, b) => (a <= b ? Math.min(Math.max(value, a), b) : (a + b) / 2);

// Double-click (or double-tap) anywhere on the board to zoom into that spot;
// do it again, press Escape or scroll away to zoom back out. A single click on
// a scrap still follows its link, a moment later, once it's clear it wasn't
// the first half of a double-click.
const useBoardZoom = (zoomRef, factor) => {
  const [zoomed, setZoomed] = useState(false);
  const last = useRef({ time: 0, x: 0, y: 0 });
  const pending = useRef(0);

  const zoomOut = useCallback(() => {
    const element = zoomRef.current;
    if (!element) return;
    element.style.transform = "";
    setZoomed(false);
  }, [zoomRef]);

  const zoomIn = useCallback(
    (x, y) => {
      const element = zoomRef.current;
      const rect = element.getBoundingClientRect();
      const outer = rect.width / element.offsetWidth; // the scroll animation's scale
      const width = element.offsetWidth;
      const height = element.offsetHeight;
      const px = (x - rect.left) / outer;
      const py = (y - rect.top) / outer;
      const top = 76; // below the navbar
      const cx = window.innerWidth / 2;
      const cy = (window.innerHeight + top) / 2;
      // centre the point, but don't pull the board's edges into view
      const tx = clamp(
        (cx - rect.left) / outer - factor * px,
        (window.innerWidth - rect.left) / outer - factor * width,
        -rect.left / outer,
      );
      const ty = clamp(
        (cy - rect.top) / outer - factor * py,
        (window.innerHeight - rect.top) / outer - factor * height,
        (top - rect.top) / outer,
      );
      element.style.transform = `translate(${tx.toFixed(1)}px, ${ty.toFixed(1)}px) scale(${factor})`;
      setZoomed(true);
    },
    [zoomRef, factor],
  );

  const onClick = useCallback(
    (event) => {
      if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const link = event.target.closest("a");
      // keyboard activation: follow links straight away
      if (event.detail === 0) return;
      if (link) event.preventDefault();

      const now = performance.now();
      const { clientX: x, clientY: y } = event;
      const previous = last.current;
      // timed ourselves rather than trusting event.detail: a scrap shifts a
      // little on hover, so the second click can land on a different element
      // and the browser starts counting again
      const double =
        event.detail >= 2 || (now - previous.time < 500 && Math.hypot(x - previous.x, y - previous.y) < 40);
      last.current = double ? { time: 0, x: 0, y: 0 } : { time: now, x, y };

      if (double) {
        window.clearTimeout(pending.current);
        if (zoomed) zoomOut();
        else zoomIn(x, y);
        return;
      }
      if (link) {
        const href = link.getAttribute("href");
        window.clearTimeout(pending.current);
        pending.current = window.setTimeout(() => {
          zoomOut();
          document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
        }, 500);
      }
    },
    [zoomed, zoomIn, zoomOut],
  );

  useEffect(() => {
    if (!zoomed) return undefined;
    const onKey = (event) => event.key === "Escape" && zoomOut();
    const onScroll = () => window.scrollY > window.innerHeight * 0.25 && zoomOut();
    window.addEventListener("keydown", onKey);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("scroll", onScroll);
    };
  }, [zoomed, zoomOut]);

  useEffect(() => () => window.clearTimeout(pending.current), []);

  return { zoomed, onClick, zoomOut };
};

const Hero = () => {
  const small = useMediaQuery({ maxWidth: 699 });
  const layout = small ? mobile : desktop;
  const [theme, toggleTheme] = useTheme();

  const sectionRef = useRef(null);
  const boardRef = useRef(null);
  const zoomRef = useRef(null);
  const tiltRef = useRef(null);
  const poolRef = useRef(null);
  const shadeRef = useRef(null);
  const bloomRef = useRef(null);

  usePointerTilt(sectionRef, tiltRef);
  const zoom = useBoardZoom(zoomRef, layout.zoom);

  // a different layout (phone/desktop) starts unzoomed
  const { zoomOut } = zoom;
  useEffect(() => zoomOut(), [small, zoomOut]);

  // the bulb reports its brightness (flicker included); the light it throws on
  // the wall and board follows it
  const onLevel = useCallback((level) => {
    poolRef.current.style.opacity = level;
    shadeRef.current.style.opacity = level;
    bloomRef.current.style.opacity = level;
  }, []);

  // Scrolling away: the board sinks and leans back, the scraps flutter on their
  // pins, and the ropes in the foreground slide past faster than the wall.
  useGSAP(
    () => {
      gsap.matchMedia().add("(prefers-reduced-motion: no-preference)", () => {
        const scrub = { trigger: sectionRef.current, start: "top top", end: "bottom top", scrub: 0.6 };
        gsap.fromTo(
          boardRef.current,
          { yPercent: 0, rotation: -0.6, scale: 1 },
          { yPercent: 12, rotation: -2.4, scale: 0.94, ease: "none", scrollTrigger: scrub },
        );
        // each rope's cut ends sit off the top/left (a) or bottom/right (b) of
        // the hero, so they only ever move further out of view
        gsap.to(".hero-rope-a", { y: () => -window.innerHeight * 0.45, x: -60, ease: "none", scrollTrigger: scrub });
        gsap.to(".hero-rope-b", { y: () => -window.innerHeight * 0.3, x: 30, ease: "none", scrollTrigger: scrub });
        gsap.utils.toArray(".scrap", sectionRef.current).forEach((scrap, index) => {
          gsap.to(scrap, { rotation: index % 2 ? 7 : -6, ease: "none", scrollTrigger: scrub });
        });
      });
    },
    { scope: sectionRef, dependencies: [small], revertOnUpdate: true },
  );

  return (
    <section
      id="top"
      data-marker="Intro"
      ref={sectionRef}
      className="hero-case hero-wall relative isolate flex min-h-[100svh] flex-col items-center overflow-hidden pb-20 [padding-top:var(--board-top)] sm:pb-24"
    >
      <div ref={boardRef} className="relative z-10 w-[var(--bw)] will-change-transform">
        <div
          ref={zoomRef}
          onClick={zoom.onClick}
          data-zoomed={zoom.zoomed ? "true" : "false"}
          className="board-zoom origin-top-left touch-manipulation transition-transform duration-700 ease-[cubic-bezier(0.2,0.7,0.2,1)]"
        >
          <div
            ref={tiltRef}
            className="transition-transform duration-500 ease-out [transform:perspective(1600px)_rotateX(var(--tilt-x,0deg))_rotateY(var(--tilt-y,0deg))]"
          >
            <CaseBoard layout={layout} />
          </div>
        </div>
      </div>

      {/* the bulb's light on the wall and board (night only; follows the bulb) */}
      <div ref={shadeRef} className="lamp-shade pointer-events-none absolute inset-0 z-20" aria-hidden="true" />
      <div ref={poolRef} className="lamp-pool pointer-events-none absolute inset-0 z-20" aria-hidden="true" />

      {/* out-of-focus rope in the foreground: each one comes in from one edge,
          bends, and leaves by another, so no cut end is ever on screen */}
      <div className="pointer-events-none absolute inset-0 z-30 overflow-hidden" aria-hidden="true">
        <img src="/hero/rope-a.webp" alt="" className="hero-rope hero-rope-a absolute -left-[3vw] -top-[12vh] w-[30vw] min-w-[240px]" />
        <img src="/hero/rope-b.webp" alt="" className="hero-rope hero-rope-b absolute -right-[1vw] top-[66vh] w-[15vw] min-w-[120px] max-sm:top-[92vh]" />
      </div>

      {/* the wall fades into the page below */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 z-[35] h-40 bg-gradient-to-b from-transparent to-paper"
        aria-hidden="true"
      />

      {/* the bulb's glow, outside its canvas so nothing boxes it in */}
      <div ref={bloomRef} className="lamp-bloom pointer-events-none absolute inset-0 z-[38]" aria-hidden="true" />

      <div className="hero-bulb z-40">
        <Suspense fallback={null}>
          <HeroBulb lit={theme === "dark"} onToggle={toggleTheme} onLevel={onLevel} />
        </Suspense>
      </div>

      <a
        href="#work"
        className="absolute bottom-6 left-[calc(50%+60px)] z-40 -translate-x-1/2 whitespace-nowrap font-hand text-2xl font-bold text-[#2b2320]/80 transition-colors hover:text-accent dark:text-[#efe3d3]/80"
      >
        follow the red string ↓
      </a>
      <p
        className="absolute bottom-7 left-6 z-40 hidden font-type text-xs text-[#2b2320]/60 lg:block dark:text-[#efe3d3]/55"
        aria-hidden="true"
      >
        {zoom.zoomed ? "double-click to zoom back out" : "double-click the board to zoom in"}
      </p>
      <p
        className="absolute bottom-16 left-1/2 z-40 hidden -translate-x-1/2 whitespace-nowrap font-type text-[11px] text-[#2b2320]/60 pointer-coarse:block lg:hidden dark:text-[#efe3d3]/55"
        aria-hidden="true"
      >
        {zoom.zoomed ? "double-tap to zoom back out" : "double-tap the board to zoom in"}
      </p>
    </section>
  );
};

export default Hero;
