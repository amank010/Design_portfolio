import { useMemo, useRef } from "react";

import { longForm, shortForm } from "../../data/work";
import { withMedia, youtubePoster } from "../../lib/media";
import { ToolLogo } from "../ToolLogo";
import { castShadow, tornBlob, tornRect } from "./paper";
import Strings from "./Strings";

const place = ({ x, y, w, h }) => ({
  left: `${x}%`,
  top: `${y}%`,
  width: w == null ? undefined : `${w}%`,
  height: h == null ? undefined : `${h}%`,
});

const cq = (size) => `${size}cqw`;

// Centre of a placed item, in board %; items without a height use `h`.
const centre = ({ x, y, w = 0, h }, fallbackH = 10) => [x + w / 2, y + (h ?? fallbackH) / 2];

// A different patch of the rough paper texture for every scrap.
const roughAt = (seed) => ({ "--rough-pos": `${(seed * 37) % 100}% ${(seed * 61) % 100}%` });

// Marks where a push pin goes; Strings.jsx finds these and ties string to them.
const Anchor = ({ id, pin }) => (
  <span
    data-anchor={id}
    className="absolute h-0 w-0"
    style={{ left: `${pin[0]}%`, top: `${pin[1]}%` }}
    aria-hidden="true"
  />
);

// Torn paper: a white, fibrous under-layer torn a little wider than the
// coloured paper on top, the way the inside of real paper shows at a rip.
const Torn = ({ paper, clip, fibre, seed, className = "", children }) => (
  <>
    {fibre && (
      <span className="paper-fibre absolute -inset-[1.2%]" style={{ clipPath: fibre, ...roughAt(seed + 3) }} aria-hidden="true" />
    )}
    <span className={`paper-${paper} paper-rough relative ${className}`} style={{ clipPath: clip, ...roughAt(seed) }}>
      {children}
    </span>
  </>
);

// A torn scrap of paper pinned to the board, linking to a section. It swings
// from its pin on hover.
const Scrap = ({ id, spot, href, paper, clip, fibre, seed, label, shadow, children }) => (
  <a
    href={href}
    aria-label={label}
    className="scrap cast absolute z-10 block"
    style={{
      ...place(spot),
      ...shadow,
      "--rotate": `${spot.rotate}deg`,
      "--hover-rotate": `${spot.rotate * 0.25}deg`,
      transformOrigin: `${spot.pin[0]}% ${spot.pin[1]}%`,
    }}
  >
    <Torn paper={paper} clip={clip} fibre={fibre} seed={seed} className="flex h-full w-full flex-col items-center justify-center text-center">
      {children}
    </Torn>
    <Anchor id={id} pin={spot.pin} />
  </a>
);

// A small polaroid of a piece of work, taped to the board.
const Thumb = ({ spot, src, alt, href, caption, ratio, shadow }) => (
  <a
    href={href}
    className="scrap cast absolute z-10 block"
    style={{ ...place(spot), ...shadow, "--rotate": `${spot.rotate}deg`, "--hover-rotate": "0deg" }}
  >
    <span className="polaroid block p-[6%] pb-[4%]" style={roughAt(spot.x)}>
      <img
        src={src}
        alt={alt}
        className="block w-full object-cover [filter:sepia(.18)_contrast(1.05)]"
        style={{ aspectRatio: ratio }}
        loading="lazy"
        decoding="async"
      />
      <span className="mt-[4%] block text-center font-hand leading-none text-[#2b2320]" style={{ fontSize: cq(spot.size) }}>
        {caption}
      </span>
    </span>
    <span
      className="paper-red paper-rough absolute -top-[6%] left-1/2 h-[12%] w-[46%] -translate-x-1/2 -rotate-3 opacity-90"
      style={{ clipPath: tornRect(spot.x + 11, { jag: 9, steps: 14, edges: "lr" }), ...roughAt(spot.y) }}
      aria-hidden="true"
    />
  </a>
);

const INK = "text-[#241b16]";
const RED = "text-[#c0261f]";

const CaseBoard = ({ layout }) => {
  const boardRef = useRef(null);
  const year = new Date().getFullYear();
  const { aspect, lamp, title, label, photo, stamp, scraps, sticky, thumbs, notes, tapes } = layout;
  const shadow = (spot, lift, h) => castShadow(centre(spot, h), lamp, aspect, lift);

  const reelPoster = useMemo(() => withMedia("short", shortForm).find((item) => item.poster)?.poster, []);
  const clips = useMemo(
    () => ({
      board: tornRect(3, { jag: 0.7, steps: 90 }),
      title: tornRect(5, { jag: 2.4, steps: 30, edges: "lr" }),
      titleFibre: tornRect(6, { jag: 3.2, steps: 30, edges: "lr" }),
      label: tornRect(8, { jag: 4.5, steps: 34 }),
      labelFibre: tornRect(9, { jag: 6, steps: 34 }),
      short: tornRect(13, { jag: 8, steps: 40 }),
      shortFibre: tornRect(14, { jag: 9, steps: 40 }),
      long: tornRect(21, { jag: 5, steps: 36 }),
      longFibre: tornRect(22, { jag: 7, steps: 36 }),
      motion: tornBlob(34, { jag: 8 }),
      motionFibre: tornBlob(35, { jag: 6 }),
      design: tornRect(55, { jag: 7, steps: 40 }),
      designFibre: tornRect(56, { jag: 9, steps: 40 }),
      about: tornRect(89, { jag: 8, steps: 36 }),
      aboutFibre: tornRect(90, { jag: 10, steps: 36 }),
      journey: tornRect(144, { jag: 5, steps: 36, edges: "tbr" }),
      journeyFibre: tornRect(145, { jag: 7, steps: 36, edges: "tbr" }),
      sticky: tornRect(233, { jag: 1.2, steps: 20, edges: "b" }),
      tape: tornRect(2, { jag: 10, steps: 12, edges: "lr" }),
    }),
    [],
  );

  return (
    <div ref={boardRef} className="relative w-full [container-type:inline-size]" style={{ aspectRatio: aspect }}>
      {/* the sheet, casting its shadow onto the wall */}
      <div className="cast absolute inset-0" style={castShadow([50, 50], lamp, aspect, 1.5)} aria-hidden="true">
        <div className="paper-white paper-rough h-full w-full" style={{ clipPath: clips.board, ...roughAt(1) }} />
      </div>
      {tapes.map((tape, index) => (
        <span
          key={index}
          className="cast absolute z-20"
          style={{ ...place(tape), ...shadow(tape, 0.35), rotate: `${tape.rotate}deg` }}
          aria-hidden="true"
        >
          <span className="tape block h-full w-full" style={{ clipPath: clips.tape }} />
        </span>
      ))}

      {/* title, dry-brushed onto a strip of masking tape */}
      <div className="cast absolute z-10" style={{ ...place(title), ...shadow(title, 0.5), rotate: `${title.rotate}deg` }}>
        <span className="paper-fibre absolute -inset-[1.5%] opacity-70" style={{ clipPath: clips.titleFibre }} aria-hidden="true" />
        <div className="tape relative flex h-full w-full items-center justify-center" style={{ clipPath: clips.title }}>
          <h1 className={`board-title leading-none ${INK}`} style={{ fontSize: cq(title.size) }}>
            <span className="sr-only">Aman Kumar, video editor and motion designer. </span>
            <span aria-hidden="true">Portfolio</span>
          </h1>
        </div>
      </div>
      <span
        className={`absolute z-10 font-hand font-bold ${RED}`}
        style={{ ...place(layout.year), rotate: `${layout.year.rotate}deg`, fontSize: cq(layout.year.size) }}
        aria-hidden="true"
      >
        {year}
      </span>

      {/* case file label on red paper */}
      <div className="cast absolute z-10" style={{ ...place(label), ...shadow(label, 0.8), rotate: `${label.rotate}deg` }}>
        <Torn paper="red" clip={clips.label} fibre={clips.labelFibre} seed={8} className="flex h-full w-full flex-col justify-center px-[3%]">
          <p className="font-type leading-tight text-[#1c0d0a]" style={{ fontSize: cq(label.size) }}>
            Case File #010:
            <br />
            Aman Kumar, Video Editor
          </p>
        </Torn>
      </div>

      {/* the suspect: a small stack of polaroids */}
      <figure
        className="cast absolute z-10"
        style={{
          ...place(photo),
          ...shadow(photo, 1.7, photo.w * aspect * 1.2),
          rotate: `${photo.rotate}deg`,
          transformOrigin: `${photo.pin[0]}% ${photo.pin[1]}%`,
        }}
      >
        <span className="polaroid absolute inset-0 -rotate-6" style={roughAt(4)} aria-hidden="true" />
        <span className="polaroid absolute inset-0 rotate-3" style={roughAt(7)} aria-hidden="true" />
        <span className="polaroid relative block p-[5%] pb-[3%]" style={roughAt(2)}>
          <img
            src="/assets/face.jpeg"
            alt="Aman Kumar"
            className="block aspect-[1/1.05] w-full object-cover [filter:grayscale(1)_sepia(.22)_contrast(1.12)_brightness(.96)]"
          />
          <figcaption className={`py-[5%] text-center font-serif italic leading-tight ${INK}`} style={{ fontSize: cq(photo.captionSize) }}>
            “He is known as a video editor.”
          </figcaption>
        </span>
        <Anchor id="photo" pin={photo.pin} />
        {/* the loose string leaves from the bottom of the photo */}
        <Anchor id="photo-foot" pin={[50, 97]} />
      </figure>

      <a
        href="#contact"
        className={`stamp absolute z-20 px-[1.2%] py-[0.6%] font-type tracking-[0.12em] ${RED} opacity-80 transition-opacity hover:opacity-100`}
        style={{ ...place(stamp), rotate: `${stamp.rotate}deg`, fontSize: cq(stamp.size) }}
      >
        OPEN FOR WORK
      </a>

      {/* the leads */}
      <Scrap id="short" spot={scraps.short} shadow={shadow(scraps.short, 1)} href="#short-form" paper="white" clip={clips.short} fibre={clips.shortFibre} seed={13} label="Short-form reels">
        <span className={`font-hand font-bold leading-none ${RED}`} style={{ fontSize: cq(scraps.short.size) }}>
          Short-form
        </span>
      </Scrap>
      <Scrap id="long" spot={scraps.long} shadow={shadow(scraps.long, 1)} href="#long-form" paper="yellow" clip={clips.long} fibre={clips.longFibre} seed={21} label="Long-form YouTube edits">
        <span className={`board-marker leading-[1.05] ${INK}`} style={{ fontSize: cq(scraps.long.size) }}>
          Long-
          <br />
          form
        </span>
      </Scrap>
      <Scrap id="motion" spot={scraps.motion} shadow={shadow(scraps.motion, 1)} href="#toolkit" paper="cream" clip={clips.motion} fibre={clips.motionFibre} seed={34} label="Motion graphics and toolkit">
        <span className={`board-marker leading-[1.05] ${INK}`} style={{ fontSize: cq(scraps.motion.size) }}>
          Motion
          <br />
          graphics
        </span>
      </Scrap>
      <Scrap id="design" spot={scraps.design} shadow={shadow(scraps.design, 1)} href="#design" paper="kraft" clip={clips.design} fibre={clips.designFibre} seed={55} label="UI/UX and 3D">
        <span className={`board-marker leading-none ${INK}`} style={{ fontSize: cq(scraps.design.size) }}>
          UI/UX &amp; 3D
        </span>
      </Scrap>
      <Scrap id="about" spot={scraps.about} shadow={shadow(scraps.about, 1)} href="#about" paper="kraft" clip={clips.about} fibre={clips.aboutFibre} seed={89} label="About Aman">
        <span className={`board-marker leading-[1.1] ${INK}`} style={{ fontSize: cq(scraps.about.size) }}>
          find
          <br />
          out
          <br />
          about
          <br />
          him!
        </span>
      </Scrap>

      {scraps.journey && (
        <Scrap id="journey" spot={scraps.journey} shadow={shadow(scraps.journey, 1)} href="#journey" paper="lined" clip={clips.journey} fibre={clips.journeyFibre} seed={144} label="Career journey">
          <span className={`font-hand font-bold leading-none ${INK}`} style={{ fontSize: cq(scraps.journey.size) }}>
            the journey
          </span>
          <span className={`mt-[3%] font-hand leading-none ${RED}`} style={{ fontSize: cq(scraps.journey.size * 0.6) }}>
            on the case since 2023 →
          </span>
        </Scrap>
      )}

      {/* the toolkit, on a sticky note */}
      {sticky && (
        <Scrap id="sticky" spot={sticky} shadow={shadow(sticky, 1.1)} href="#toolkit" paper="sticky" clip={clips.sticky} seed={233} label="Toolkit">
          <span className={`mt-[14%] font-hand font-bold leading-none ${INK}`} style={{ fontSize: cq(sticky.size) }}>
            his tools:
          </span>
          <span className="mt-[8%] grid w-[76%] grid-cols-2 gap-[8%]">
            {["premiere", "aftereffects", "photoshop", "blender"].map((id) => (
              <ToolLogo key={id} id={id} className="aspect-square w-full rounded-[18%] shadow-[0_1px_2px_rgb(0_0_0/0.3)]" />
            ))}
          </span>
        </Scrap>
      )}

      {thumbs.long && (
        <Thumb
          spot={thumbs.long}
          shadow={shadow(thumbs.long, 1.3, thumbs.long.w * aspect * 0.7)}
          src={youtubePoster(longForm[0].youtube, "mqdefault")}
          alt={longForm[0].title}
          href="#long-form"
          caption="this is one of his works"
          ratio="16 / 9"
        />
      )}
      {thumbs.reel && reelPoster && (
        <Thumb
          spot={thumbs.reel}
          shadow={shadow(thumbs.reel, 1.3, thumbs.reel.w * aspect * 1.4)}
          src={reelPoster}
          alt="A short-form reel"
          href="#short-form"
          caption="and this one"
          ratio="4 / 5"
        />
      )}

      {/* red pen notes */}
      <div
        className={`absolute z-10 font-hand font-bold leading-[1.05] ${RED}`}
        style={{ ...place(notes.seen), rotate: `${notes.seen.rotate}deg`, fontSize: cq(notes.seen.size) }}
      >
        <svg
          viewBox="0 0 200 90"
          preserveAspectRatio="none"
          className="absolute -inset-x-[8%] -inset-y-[22%] h-[144%] w-[116%] overflow-visible"
          aria-hidden="true"
        >
          <path
            d="M20 52c-9-24 36-42 86-43 50-1 86 12 88 34 2 24-46 40-98 40-46 0-80-12-84-31-2-10 6-18 16-24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            opacity=".85"
          />
        </svg>
        <p className="relative text-center">Where was he last seen?</p>
        <p className="relative mt-[4%] text-center font-medium opacity-80" style={{ fontSize: "0.62em" }}>
          Delhi, deep in a timeline
        </p>
      </div>
      <div
        className={`absolute z-10 font-hand font-bold leading-[1.1] ${RED}`}
        style={{ ...place(notes.said), rotate: `${notes.said.rotate}deg`, fontSize: cq(notes.said.size) }}
      >
        <svg viewBox="0 0 40 60" className="absolute -left-[10%] -top-[40%] h-[70%] w-auto overflow-visible" aria-hidden="true">
          <path d="M30 58C18 44 10 28 12 4M4 14l8-11 9 9" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <p className="relative">
          The last thing he said was, <span className="underline decoration-2 underline-offset-4">“Send me the raw footage.”</span>
        </p>
      </div>

      <Strings boardRef={boardRef} from="photo" loose={layout.loose} lamp={lamp} layoutKey={layout.aspect} />
    </div>
  );
};

export default CaseBoard;
