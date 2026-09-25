import { useMemo, useRef, useState } from "react";
import { useMediaQuery } from "react-responsive";

import Reveal from "../components/Reveal";
import SectionHeader from "../components/SectionHeader";
import { ToolLogo } from "../components/ToolLogo";
import { journey, range, tracks } from "../data/journey";
import { ScrollTrigger, useGSAP } from "../lib/gsap";
import { formatMonthIndex, toMonths } from "../lib/timecode";

const START = toMonths(range.start);
const END = toMonths(range.end) + 1;
const SPAN = END - START;

// the pinned block sits just under the navbar
const PIN_TOP = 88;

const trackById = Object.fromEntries(tracks.map((track) => [track.id, track]));

// Clips in the order the playhead reaches them.
const stops = [...journey].sort((a, b) => toMonths(a.start) - toMonths(b.start));

// one-month clips would be too thin to label
const MIN_CLIP = 5.2;

const percent = (month) => Math.min(Math.max(((month - START) / SPAN) * 100, 0), 100);

const monthLabel = (month) => formatMonthIndex(month).toUpperCase();

// Each clip gets an equal share of the scroll; within its share the playhead
// travels from this clip's start to the next one's.
const locate = (progress) => {
  const scaled = Math.min(progress * stops.length, stops.length - 0.0001);
  const index = Math.floor(scaled);
  const from = toMonths(stops[index].start);
  const to =
    index + 1 < stops.length ? toMonths(stops[index + 1].start) : toMonths(stops[index].end) + 1;
  return { index, month: from + (to - from) * (scaled - index) };
};

const header = (
  <SectionHeader
    track="A1"
    color="var(--color-track-teal)"
    label="Journey"
    title={
      <>
        The career <em>sequence</em>.
      </>
    }
  />
);

const Waveform = ({ color }) => {
  const d = useMemo(() => {
    let path = "";
    for (let x = 2; x < 400; x += 4) {
      const h = 3 + Math.abs(Math.sin(x * 0.07) * Math.cos(x * 0.023)) * 13;
      path += `M${x} ${20 - h}V${20 + h}`;
    }
    return path;
  }, []);

  return (
    <svg viewBox="0 0 400 40" preserveAspectRatio="none" className="absolute inset-0 h-full w-full">
      <path d={d} stroke={color} strokeOpacity="0.55" strokeWidth="1.5" />
    </svg>
  );
};

const Monitor = ({ item, index }) => {
  const track = trackById[item.track];

  return (
    <div className="grid min-h-[260px] gap-6 rounded-[28px] bg-night p-6 text-white ring-1 ring-white/5 shadow-[0_30px_60px_-30px_rgb(12_12_16/0.6)] sm:p-8 md:grid-cols-[1fr_auto]">
      <div key={index} className="[animation:monitor-in_0.45s_ease]">
        <p className="eyebrow flex items-center gap-3 text-white/50">
          <span className="track-chip" style={{ "--chip": track.color }}>
            {track.id}
          </span>
          {item.when}
        </p>
        <h3 className="mt-5 text-[clamp(1.8rem,3vw,2.6rem)] font-semibold leading-none tracking-tight">
          {item.title}
        </h3>
        <p className="serif-em mt-2 text-2xl text-white/70">{item.role}</p>
        <p className="mt-4 max-w-2xl leading-relaxed text-white/65">{item.text}</p>
      </div>
      <div className="flex items-end justify-between gap-6 md:flex-col">
        <span className="eyebrow tabular-nums text-white/40">
          {String(index + 1).padStart(2, "0")} / {String(stops.length).padStart(2, "0")}
        </span>
        <div className="flex gap-2">
          {item.tools.map((id) => (
            <ToolLogo key={id} id={id} className="h-9 w-9 rounded-xl" />
          ))}
        </div>
      </div>
    </div>
  );
};

// Desktop: the monitor and timeline pin while scrolling moves the playhead
// clip by clip.
const JourneyTimeline = () => {
  const sectionRef = useRef(null);
  const pinRef = useRef(null);
  const headRef = useRef(null);
  const dateRef = useRef(null);
  const activeRef = useRef(0);
  const [active, setActive] = useState(0);

  useGSAP(
    () => {
      const wrapper = pinRef.current.parentElement;
      ScrollTrigger.create({
        trigger: wrapper,
        start: `top ${PIN_TOP}px`,
        end: () => `+=${wrapper.offsetHeight - pinRef.current.offsetHeight}`,
        onUpdate: ({ progress }) => {
          const { index, month } = locate(progress);
          headRef.current.style.transform = `translateX(${percent(month)}%)`;
          dateRef.current.textContent = monthLabel(month);
          if (index !== activeRef.current) {
            activeRef.current = index;
            setActive(index);
          }
        },
      });
    },
    { scope: sectionRef },
  );

  const years = [];
  for (let year = Math.ceil(START / 12); year * 12 < END; year += 1) years.push(year);

  return (
    <section id="journey" data-marker="Journey" ref={sectionRef} className="relative pt-24 sm:pt-32">
      <div className="container-x">{header}</div>

      <div className="relative" style={{ height: `${stops.length * 30 + 100}vh` }}>
        <div
          ref={pinRef}
          className="container-x sticky flex flex-col justify-center pb-6"
          style={{ top: PIN_TOP, height: `calc(100vh - ${PIN_TOP}px)` }}
        >
          <Monitor item={stops[active]} index={active} />

          <div className="mt-4 overflow-hidden rounded-[24px] border border-white/10 bg-[#141419] text-white shadow-[0_40px_80px_-40px_rgb(12_12_16/0.7)]">
            <div className="eyebrow flex items-center justify-between border-b border-white/5 px-5 py-3 text-white/45">
              <span>Sequence 01 · Career · scroll to scrub</span>
              <span className="flex items-center gap-2 tabular-nums text-[#7fa6ff]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#7fa6ff]" />
                <span ref={dateRef}>{monthLabel(toMonths(stops[0].start))}</span>
              </span>
            </div>

            <div className="flex">
              <div className="w-[118px] shrink-0 border-r border-white/5">
                <div className="h-8 border-b border-white/5" />
                {tracks.map((track) => (
                  <div
                    key={track.id}
                    className="flex h-[52px] items-center gap-2.5 border-b border-white/5 px-3 last:border-b-0"
                  >
                    <span className="track-chip" style={{ "--chip": track.color }}>
                      {track.id}
                    </span>
                    <span className="text-xs text-white/55">{track.label}</span>
                  </div>
                ))}
              </div>

              <div className="relative flex-1">
                {/* ruler: a tick every month, a label every January */}
                <div
                  className="relative h-8 border-b border-white/5"
                  style={{
                    backgroundImage: `repeating-linear-gradient(90deg, rgb(255 255 255 / 0.18) 0 1px, transparent 1px calc(100% / ${SPAN}))`,
                    backgroundSize: "100% 8px",
                    backgroundPosition: "0 100%",
                    backgroundRepeat: "no-repeat",
                  }}
                >
                  {years.map((year) => (
                    <span
                      key={year}
                      className="absolute top-0 flex h-full items-start border-l border-white/30 pl-1.5 pt-1.5 font-mono text-[10px] text-white/50"
                      style={{ left: `${percent(year * 12)}%` }}
                    >
                      {year}
                    </span>
                  ))}
                </div>

                {tracks.map((track) => (
                  <div key={track.id} className="relative h-[52px] border-b border-white/5 last:border-b-0">
                    {journey
                      .filter((clip) => clip.track === track.id)
                      .map((clip) => {
                        const left = percent(toMonths(clip.start));
                        const right = Math.min(
                          Math.max(percent(toMonths(clip.end) + 1), left + MIN_CLIP),
                          100,
                        );
                        const isActive = stops[active] === clip;
                        return (
                          <div
                            key={clip.title}
                            title={clip.title}
                            className="absolute inset-y-2 flex items-center overflow-hidden rounded-md border transition-[background-color,box-shadow] duration-300"
                            style={{
                              left: `${left}%`,
                              width: `${right - left}%`,
                              borderColor: `color-mix(in srgb, ${track.color} 70%, transparent)`,
                              background: isActive
                                ? `color-mix(in srgb, ${track.color} 70%, #16161b)`
                                : `color-mix(in srgb, ${track.color} 22%, #16161b)`,
                              boxShadow: isActive ? `0 0 0 1px #fff, 0 0 28px -4px ${track.color}` : "none",
                            }}
                          >
                            {track.audio && <Waveform color={isActive ? "#fff" : track.color} />}
                            <span className="relative truncate px-1.5 text-[11px] font-medium text-white/90">
                              {clip.label ?? clip.title}
                            </span>
                          </div>
                        );
                      })}
                  </div>
                ))}

                <div
                  ref={headRef}
                  className="pointer-events-none absolute inset-y-0 left-0 w-full will-change-transform"
                  style={{ transform: `translateX(${percent(toMonths(stops[0].start))}%)` }}
                  aria-hidden="true"
                >
                  <span className="absolute -left-[6px] top-0 h-3.5 w-3 bg-[#3d7bff] [clip-path:polygon(0_0,100%_0,100%_65%,50%_100%,0_65%)]" />
                  <span className="absolute bottom-0 left-0 top-0 w-px bg-[#3d7bff] shadow-[0_0_14px_#3d7bff]" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Phones and tablets: a plain vertical list.
const JourneyList = () => (
  <section id="journey" data-marker="Journey" className="container-x py-24">
    {header}
    <ol className="relative mt-12 space-y-4 border-l border-ink/10 pl-6">
      {stops.map((item) => {
        const track = trackById[item.track];
        return (
          <Reveal as="li" key={item.title} className="relative">
            <span
              className="absolute -left-[30px] top-6 h-2.5 w-2.5 rounded-full ring-4 ring-paper"
              style={{ background: track.color }}
            />
            <div className="glass-light rounded-3xl p-5 sm:p-6">
              <p className="eyebrow flex items-center gap-3 text-ink/50">
                <span className="track-chip" style={{ "--chip": track.color }}>
                  {track.id}
                </span>
                {item.when}
              </p>
              <h3 className="mt-4 text-2xl font-semibold tracking-tight">{item.title}</h3>
              <p className="serif-em mt-1 text-xl text-ink/65">{item.role}</p>
              <p className="mt-3 leading-relaxed text-ink/65">{item.text}</p>
              {item.tools.length > 0 && (
                <div className="mt-4 flex gap-2">
                  {item.tools.map((id) => (
                    <ToolLogo key={id} id={id} className="h-8 w-8 rounded-lg" />
                  ))}
                </div>
              )}
            </div>
          </Reveal>
        );
      })}
    </ol>
  </section>
);

const Journey = () => {
  const desktop = useMediaQuery({ minWidth: 1024, minHeight: 680 });
  return desktop ? <JourneyTimeline /> : <JourneyList />;
};

export default Journey;
