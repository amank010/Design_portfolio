import { lazy, Suspense, useEffect, useRef, useState } from "react";
import { useMediaQuery } from "react-responsive";

import Reveal from "../components/Reveal";
import useTheme from "../hooks/useTheme";
import { stats } from "../data/work";
import { gsap, useGSAP } from "../lib/gsap";
import { observe } from "../lib/observe";

const IntroLaptop = lazy(() => import("./IntroLaptop"));

// Each phrase is split into words that light up as the statement scrolls past.
const statement = [
  { text: "I edit" },
  { text: "short-form", em: "var(--color-accent)" },
  { text: "that stops the scroll and" },
  { text: "long-form", em: "#c47a1c" },
  { text: "that keeps people watching —" },
  { text: "for brands, startups and creators.", muted: true },
];

const CountUp = ({ value, suffix }) => {
  const ref = useRef(null);

  useEffect(() => {
    const element = ref.current;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      element.textContent = `${value}${suffix}`;
      return undefined;
    }

    let frame = 0;
    const stop = observe(
      element,
      (entry) => {
        if (!entry.isIntersecting) return;
        stop();
        const start = performance.now();
        const step = (now) => {
          const t = Math.min((now - start) / 1400, 1);
          const current = value * (1 - (1 - t) ** 3);
          const shown = t === 1 ? value : value < 10 ? current.toFixed(1) : Math.round(current);
          element.textContent = `${shown}${suffix}`;
          if (t < 1) frame = requestAnimationFrame(step);
        };
        frame = requestAnimationFrame(step);
      },
      { threshold: 0.6 },
    );

    return () => {
      stop();
      cancelAnimationFrame(frame);
    };
  }, [value, suffix]);

  return <span ref={ref}>{`0${suffix}`}</span>;
};

// Mounts the laptop once the page has settled after loading, or as soon as the
// intro gets close, whichever comes first (and keeps it). Waiting keeps its 4 MB
// of model and video from competing with the hero on first load.
const useNearby = () => {
  const ref = useRef(null);
  const [near, setNear] = useState(false);
  useEffect(() => {
    let timer = 0;
    const mount = () => setNear(true);
    const whenSettled = () => {
      timer = window.setTimeout(mount, 2500);
    };
    if (document.readyState === "complete") whenSettled();
    else window.addEventListener("load", whenSettled, { once: true });

    const stop = observe(
      ref.current,
      (entry) => {
        if (entry.isIntersecting) mount();
      },
      { rootMargin: "35% 0px" },
    );
    return () => {
      stop();
      window.clearTimeout(timer);
      window.removeEventListener("load", whenSettled);
    };
  }, []);
  return [ref, near];
};

const Intro = () => {
  const ref = useRef(null);
  const [laptopRef, near] = useNearby();
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const [theme] = useTheme();

  useGSAP(
    () => {
      gsap.matchMedia().add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(
          ".intro-word",
          { opacity: 0.16 },
          {
            opacity: 1,
            stagger: 0.1,
            ease: "none",
            scrollTrigger: { trigger: ref.current, start: "top 85%", end: "top 25%", scrub: true },
          },
        );
      });
    },
    { scope: ref },
  );

  return (
    <section className="container-x relative pb-36 pt-20 sm:pb-44 sm:pt-28">
      <div className="grid items-center gap-8 lg:grid-cols-[1.05fr_1fr] lg:gap-6">
        <p
          ref={ref}
          className="max-w-[18ch] text-[clamp(2.1rem,4.3vw,4rem)] font-medium leading-[1.04] tracking-[-0.035em] sm:max-w-[21ch]"
        >
          {statement.map((phrase) =>
            phrase.text.split(" ").map((word, index) => (
              <span
                key={`${phrase.text}-${index}`}
                className={`intro-word will-change-[opacity] ${phrase.em ? "serif-em" : ""} ${phrase.muted ? "text-ink/40" : ""}`}
                style={phrase.em ? { color: phrase.em } : undefined}
              >
                {word}{" "}
              </span>
            )),
          )}
        </p>

        {/* the laptop, playing the showreel */}
        <div ref={laptopRef} className="relative -mx-4 aspect-[1.2] sm:mx-0">
          {near && (
            <Suspense fallback={null}>
              <IntroLaptop isMobile={isMobile} dark={theme === "dark"} />
            </Suspense>
          )}
        </div>
      </div>

      <dl className="mt-16 grid grid-cols-2 gap-x-6 gap-y-10 sm:mt-20 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <Reveal key={stat.label} delay={index * 90} className="border-t border-ink/15 pt-5">
            <dt className="sr-only">{stat.label}</dt>
            <dd className="text-[clamp(2.6rem,5vw,4rem)] font-semibold leading-none tracking-[-0.04em] tabular-nums">
              <CountUp value={stat.value} suffix={stat.suffix} />
            </dd>
            <dd className="mt-3 max-w-[22ch] text-[15px] leading-snug text-ink/70">{stat.label}</dd>
            <dd className="eyebrow mt-3 text-ink/40">{stat.note}</dd>
          </Reveal>
        ))}
      </dl>
    </section>
  );
};

export default Intro;
