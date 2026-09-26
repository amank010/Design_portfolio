import { useRef, useState } from "react";

import { ScrollTrigger, useGSAP } from "../lib/gsap";
import { toTimecode } from "../lib/timecode";
import { useSound } from "./media/soundContext";

// The page plays like a three-minute sequence: scrolling moves the playhead.
export const SEQUENCE_SECONDS = 180;

// Fixed transport bar: timecode, a mini timeline with a marker per section
// (click to jump) and the sound toggle.
const Transport = () => {
  const { soundOn, setSoundOn, audibleId } = useSound();
  const barRef = useRef(null);
  const headRef = useRef(null);
  const timecodeRef = useRef(null);
  const [markers, setMarkers] = useState([]);

  useGSAP(() => {
    const measure = () => {
      const max = ScrollTrigger.maxScroll(window) || 1;
      setMarkers(
        [...document.querySelectorAll("[data-marker]")].map((section) => ({
          id: section.id,
          label: section.dataset.marker,
          at: Math.min((section.getBoundingClientRect().top + window.scrollY) / max, 1),
        })),
      );
    };
    ScrollTrigger.addEventListener("refresh", measure);
    measure();

    ScrollTrigger.create({
      start: 0,
      end: "max",
      onUpdate: ({ progress }) => {
        barRef.current.style.transform = `scaleX(${progress})`;
        headRef.current.style.transform = `translateX(${progress * 100}%)`;
        timecodeRef.current.textContent = toTimecode(progress * SEQUENCE_SECONDS);
        barRef.current.closest("[data-transport]").dataset.shown =
          window.scrollY > window.innerHeight * 0.55 ? "true" : "false";
      },
    });

    return () => ScrollTrigger.removeEventListener("refresh", measure);
  }, []);

  const jump = (id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <div
      data-transport=""
      data-shown="false"
      className="pointer-events-none fixed inset-x-0 bottom-3 z-40 flex justify-center px-3 transition-[opacity,translate] duration-500 data-[shown=false]:translate-y-[140%] data-[shown=false]:opacity-0 sm:bottom-5"
    >
      <div className="nav-paper pointer-events-auto flex h-12 w-auto max-w-[620px] items-center gap-3 rounded-full pl-4 pr-1.5 sm:w-full">
        <span className="flex items-center gap-2 font-mono text-[13px] tabular-nums text-accent">
          <span className="h-1.5 w-1.5 rounded-full bg-accent" />
          <span ref={timecodeRef}>00:00:00:00</span>
        </span>

        <div className="relative hidden h-7 flex-1 sm:block" aria-label="Sections">
          <div className="absolute inset-x-0 top-1/2 h-1 -translate-y-1/2 overflow-hidden rounded-full bg-ink/10">
            <span
              ref={barRef}
              className="block h-full w-full origin-left bg-gradient-to-r from-accent to-[#f0a13a] will-change-transform"
              style={{ transform: "scaleX(0)" }}
            />
          </div>
          {markers.map((marker) => (
            <button
              key={marker.id}
              type="button"
              onClick={() => jump(marker.id)}
              className="group absolute top-1/2 h-5 w-3 -translate-x-1/2 -translate-y-1/2"
              style={{ left: `${marker.at * 100}%` }}
              aria-label={`Jump to ${marker.label}`}
            >
              <span className="absolute left-1/2 top-1/2 h-2.5 w-[3px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-ink/35 transition-colors group-hover:bg-ink" />
              <span className="pointer-events-none absolute bottom-full left-1/2 mb-2 -translate-x-1/2 whitespace-nowrap rounded-md bg-black/80 px-2 py-1 font-mono text-[10px] uppercase tracking-wider text-white opacity-0 transition-opacity group-hover:opacity-100">
                {marker.label}
              </span>
            </button>
          ))}
          <span
            ref={headRef}
            className="pointer-events-none absolute inset-y-0 left-0 w-full will-change-transform"
            aria-hidden="true"
          >
            <span className="absolute -left-px inset-y-0 w-0.5 rounded-full bg-ink" />
          </span>
        </div>

        <button
          type="button"
          onClick={() => setSoundOn(!soundOn)}
          aria-pressed={soundOn}
          title="Sound for previews (M)"
          className={`ml-auto flex h-9 shrink-0 items-center gap-2 rounded-full px-3.5 text-xs font-medium transition-colors sm:ml-0 ${
            soundOn ? "bg-ink text-paper" : "bg-ink/8 text-ink hover:bg-ink/12"
          }`}
        >
          <span className={`eq ${soundOn && audibleId ? "is-on" : ""}`} aria-hidden="true">
            <i />
            <i />
            <i />
            <i />
          </span>
          {soundOn ? "Sound on" : "Sound off"}
        </button>
      </div>
    </div>
  );
};

export default Transport;
