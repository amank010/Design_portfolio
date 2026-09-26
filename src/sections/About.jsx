import { lazy, Suspense, useEffect, useRef, useState } from "react";

import { ArrowUpRightIcon, MailIcon, WhatsAppIcon } from "../components/Icons";
import Reveal from "../components/Reveal";
import SectionHeader from "../components/SectionHeader";
import SocialLinks from "../components/SocialLinks";
import { EMAIL, RESUME_URL, WHATSAPP_URL } from "../data/work";
import { observe } from "../lib/observe";

const About3D = lazy(() => import("./About3D"));

const facts = [
  ["Based in", "Delhi, India"],
  ["Focus", "Short-form · Long-form · Motion"],
  ["Also", "UI/UX · 3D"],
  // wide: spans both columns on phones, where a long value won't fit in half
  ["Email", <a href={`mailto:${EMAIL}`} className="underline-offset-4 hover:underline">{EMAIL}</a>, true],
];

// The DTU model is 15 MB and takes a moment to set up. Load it once the page
// has settled (while the visitor is still up top), or as soon as About gets
// close, whichever comes first, so the setup cost doesn't land mid-scroll.
const useDeferredMount = () => {
  const ref = useRef(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let timer = 0;
    let idle = 0;
    const mount = () => setReady(true);

    const whenIdle = () => {
      timer = window.setTimeout(() => {
        if ("requestIdleCallback" in window) idle = window.requestIdleCallback(mount, { timeout: 4000 });
        else mount();
      }, 2500);
    };
    if (document.readyState === "complete") whenIdle();
    else window.addEventListener("load", whenIdle, { once: true });

    const stop = observe(
      ref.current,
      (entry) => {
        if (entry.isIntersecting) mount();
      },
      { rootMargin: "100% 0px" },
    );

    return () => {
      stop();
      window.clearTimeout(timer);
      if (idle) window.cancelIdleCallback(idle);
      window.removeEventListener("load", whenIdle);
    };
  }, []);

  return [ref, ready];
};

const About = () => {
  const [modelRef, near] = useDeferredMount();

  return (
  <section id="about" data-marker="About" className="container-x py-24 sm:py-32">
    <SectionHeader
      track="V4"
      color="#3a3a46"
      label="About"
      title={
        <>
          Behind the <em>timeline</em>.
        </>
      }
    />

    <div className="mt-14 grid gap-5 lg:grid-cols-[1.1fr_1fr]">
      <Reveal className="paper-card flex flex-col gap-8 p-7 sm:p-10">
        <div className="flex items-center gap-4">
          <img src="/assets/face.jpeg" alt="Aman Kumar" className="h-16 w-16 rounded-2xl object-cover" />
          <div>
            <p className="text-2xl font-semibold tracking-tight">Aman Kumar</p>
            <p className="text-ink/60">Video editor & motion designer</p>
          </div>
        </div>

        <p className="text-lg leading-relaxed text-ink/75">
          I'm a video editor and motion designer, and a Computer Engineering graduate of Delhi
          Technological University. I've made 100+ short-form videos for PokerBaazi's IP, worked on
          content and ads for Paytm and Fisdom at Growth Rocket, and cut long-form for YouTube
          creators. On the side I design interfaces and build in 3D. I care about the first second,
          the pacing after it, and motion that feels clean.
        </p>

        <dl className="grid grid-cols-2 gap-x-6 gap-y-5 border-t border-ink/10 pt-7">
          {facts.map(([term, detail, wide]) => (
            <div key={term} className={`min-w-0 ${wide ? "col-span-2 sm:col-span-1" : ""}`}>
              <dt className="eyebrow text-ink/45">{term}</dt>
              <dd className="mt-1.5 break-words font-medium">{detail}</dd>
            </div>
          ))}
        </dl>

        {/* "Let's talk" in the navbar and hero jumps here */}
        <div id="contact" className="mt-auto scroll-mt-28 border-t border-ink/10 pt-7">
          <p className="text-2xl font-semibold tracking-tight">
            Got <span className="serif-em">footage</span>? Let's make it unmissable.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <a href={`mailto:${EMAIL}`} className="btn btn-accent">
              <MailIcon className="h-4 w-4" />
              Email me
            </a>
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="btn btn-light">
              <WhatsAppIcon className="h-4 w-4" />
              WhatsApp
            </a>
            <a href={RESUME_URL} target="_blank" rel="noopener noreferrer" className="btn btn-ink">
              Resume
              <ArrowUpRightIcon className="h-4 w-4" />
            </a>
          </div>
          <div className="mt-5">
            <SocialLinks />
          </div>
        </div>
      </Reveal>

      <Reveal
        ref={modelRef}
        delay={120}
        className="paper-card relative min-h-[380px] sm:min-h-[460px]"
        style={{ "--tape-rotate": "3deg" }}
      >
        {/* the model sits in the paper like a mounted print */}
        <div className="absolute inset-3 overflow-hidden rounded-[3px] bg-[#e9e2d6] dark:bg-[#1a1612]">
          {near && (
            <Suspense fallback={null}>
              <About3D />
            </Suspense>
          )}
        </div>
        <p className="pointer-events-none absolute bottom-7 left-7 font-hand text-xl font-bold text-[#c0261f]">
          DTU, where it started
        </p>
      </Reveal>
    </div>
  </section>
  );
};

export default About;
