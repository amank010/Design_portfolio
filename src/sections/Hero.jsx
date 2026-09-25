import { lazy, Suspense, useEffect, useRef } from "react";
import { useMediaQuery } from "react-responsive";

import { ArrowDownIcon } from "../components/Icons";
import { gsap, useGSAP } from "../lib/gsap";
import { observe } from "../lib/observe";
import { toTimecode } from "../lib/timecode";

const Hero3D = lazy(() => import("./Hero3D"));

// Runs the REC timecode at 25fps while the hero is on screen.
const useRecTimecode = (sectionRef, textRef) => {
  useEffect(() => {
    const start = performance.now();
    let frame = 0;
    let last = "";

    const tick = (now) => {
      const text = toTimecode((now - start) / 1000);
      if (text !== last) {
        textRef.current.textContent = text;
        last = text;
      }
      frame = requestAnimationFrame(tick);
    };

    const stop = observe(sectionRef.current, (entry) => {
      cancelAnimationFrame(frame);
      if (entry.isIntersecting) frame = requestAnimationFrame(tick);
    });

    return () => {
      stop();
      cancelAnimationFrame(frame);
    };
  }, [sectionRef, textRef]);
};

const Hero = () => {
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const sectionRef = useRef(null);
  const wordRef = useRef(null);
  const timecodeRef = useRef(null);

  useRecTimecode(sectionRef, timecodeRef);

  useGSAP(
    () => {
      gsap.matchMedia().add("(prefers-reduced-motion: no-preference)", () => {
        gsap.to(wordRef.current, {
          yPercent: 40,
          scale: 1.06,
          opacity: 0.1,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
      });
    },
    { scope: sectionRef },
  );

  return (
    <section
      id="top"
      data-marker="Intro"
      data-animates=""
      ref={sectionRef}
      className="relative isolate flex min-h-[100svh] flex-col overflow-hidden"
    >
      {/* sky, dot grid and a glow behind the laptop */}
      {/* dots and sky in one static background: a masked dot layer made the GPU
          redraw the whole hero every frame under the animating laptop */}
      <div className="absolute inset-0 -z-20 bg-[radial-gradient(var(--dot)_1px,transparent_1.4px),radial-gradient(120%_85%_at_50%_0%,var(--sky-top)_0%,var(--sky-mid)_40%,var(--color-paper)_78%)] bg-[length:22px_22px,100%_100%]" />
      <div className="absolute left-1/2 top-[56%] -z-10 aspect-[3/2] w-[80vw] max-w-[1100px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,rgb(51_102_255/0.28),transparent)]" />

      {/* camera viewfinder */}
      <div className="pointer-events-none absolute inset-x-3 bottom-3 top-[76px] sm:inset-x-6 sm:bottom-6 sm:top-[92px]">
        <span className="vf-corner tl" />
        <span className="vf-corner tr" />
        <span className="vf-corner bl" />
        <span className="vf-corner br" />
        {/* own layer, so the 25fps ticks don't repaint the hero behind it */}
        <div className="eyebrow absolute left-4 top-4 flex items-center gap-2 text-ink/60 will-change-transform sm:left-6 sm:top-5">
          <span className="rec-dot" />
          REC
          <span ref={timecodeRef} className="tabular-nums text-ink/80">
            00:00:00:00
          </span>
        </div>
        <p className="eyebrow absolute right-6 top-5 hidden text-ink/45 sm:block">4K · 25P · 16:9</p>
        <p className="eyebrow absolute bottom-5 left-6 hidden text-ink/45 lg:block">Delhi, IN</p>
        <p className="eyebrow absolute bottom-5 right-6 hidden text-ink/45 lg:block">Scroll to scrub</p>
      </div>

      <div className="relative mt-[128px] text-center sm:mt-[150px]">
        <p className="eyebrow px-4 text-ink/60">Video editing · Motion graphics · UI/UX</p>
        <h1 ref={wordRef} className="hero-word mt-4 select-none will-change-[transform,opacity]">
          <span className="sr-only">Aman Kumar, video editor and motion designer. </span>
          PORTFOLIO
        </h1>
      </div>

      <div className="absolute inset-0 z-10">
        <Suspense fallback={null}>
          <Hero3D isMobile={isMobile} />
        </Suspense>
      </div>

      <div className="container-x relative z-20 mt-auto flex flex-col items-center gap-5 pb-12 md:flex-row md:items-end md:justify-between md:pb-16">
        <div className="glass-light flex items-center gap-3 rounded-full py-2 pl-2 pr-6">
          <img src="/assets/face.jpeg" alt="" className="h-11 w-11 rounded-full object-cover" />
          <div className="leading-tight">
            <p className="font-semibold tracking-tight">Aman Kumar</p>
            <p className="text-sm text-ink/60">Video Editor & Motion Designer</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <a href="#work" className="btn btn-ink">
            Watch the work
            <ArrowDownIcon className="h-4 w-4" />
          </a>
          <a href="#contact" className="btn btn-light">
            Let's talk
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
