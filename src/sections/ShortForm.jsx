import { useMemo, useRef, useState } from "react";
import { useMediaQuery } from "react-responsive";

import SlateTile from "../components/media/SlateTile";
import VideoTile from "../components/media/VideoTile";
import SectionHeader from "../components/SectionHeader";
import TimelineBackdrop from "../components/TimelineBackdrop";
import { clientColors, shortForm } from "../data/work";
import { gsap, useGSAP } from "../lib/gsap";
import { withMedia } from "../lib/media";

const useColumnCount = () => {
  const xl = useMediaQuery({ minWidth: 1180 });
  const lg = useMediaQuery({ minWidth: 960 });
  const md = useMediaQuery({ minWidth: 640 });
  return xl ? 5 : lg ? 4 : md ? 3 : 2;
};

const ReelCard = ({ item, index }) => {
  const accent = clientColors[item.group] ?? "#8b7cf6";

  // no fade-in here: fading a card with a playing video in it makes the GPU
  // redraw it off-screen every frame
  return (
    <article aria-label={`${item.title} for ${item.client}`}>
      {item.src ? (
        <VideoTile item={item} aspect="9 / 16" accent={accent} badge={item.group} />
      ) : (
        <SlateTile item={item} accent={accent} index={index} />
      )}
    </article>
  );
};

const ShortForm = () => {
  const items = useMemo(() => withMedia("short", shortForm), []);
  const groups = useMemo(
    () => ["All", ...new Set(items.map((item) => item.group).filter(Boolean))],
    [items],
  );
  const [filter, setFilter] = useState("All");
  const shown = filter === "All" ? items : items.filter((item) => item.group === filter);
  const cols = useColumnCount();
  const columns = Array.from({ length: Math.min(cols, shown.length) }, (_, column) =>
    shown.filter((_, index) => index % cols === column),
  );

  const sectionRef = useRef(null);
  const gridRef = useRef(null);

  // Alternate columns drift at different speeds, and the timeline behind the
  // title slides sideways.
  useGSAP(
    () => {
      gsap
        .matchMedia()
        .add("(min-width: 640px) and (prefers-reduced-motion: no-preference)", () => {
          gsap.utils.toArray("[data-speed]", gridRef.current).forEach((column) => {
            gsap.to(column, {
              y: -Number(column.dataset.speed),
              ease: "none",
              scrollTrigger: {
                trigger: gridRef.current,
                start: "top bottom",
                end: "bottom top",
                scrub: 0.6,
              },
            });
          });
          gsap.to(".timeline-backdrop", {
            x: -420,
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          });
        });
    },
    { scope: sectionRef, dependencies: [cols, filter], revertOnUpdate: true },
  );

  return (
    <section
      id="short-form"
      data-marker="Short-form"
      ref={sectionRef}
      className="relative pb-24 pt-28 sm:pb-32 sm:pt-36"
    >
      {/* decorative Premiere-style timeline behind the header, right half only.
          The mask is fine here because the area is small; a full-screen mask
          under the hero's 3D canvas cost a GPU pass every frame. */}
      <div className="pointer-events-none absolute left-[46%] right-0 top-16 hidden overflow-hidden text-ink opacity-85 [mask-image:linear-gradient(90deg,transparent,black_25%,black_80%,transparent)] sm:block">
        <TimelineBackdrop
          labels={false}
          className="timeline-backdrop h-[230px] w-auto max-w-none will-change-transform"
        />
      </div>

      <div className="container-x relative">
        <SectionHeader
          track="V1"
          color="var(--color-track-violet)"
          label="Short-form · 9:16"
          title={
            <>
              Short-form that
              <br />
              <em>stops the scroll</em>.
            </>
          }
        >
          <div className="flex max-w-md flex-wrap gap-2 lg:justify-end" role="group" aria-label="Filter reels">
            {groups.map((group) => {
              const count =
                group === "All" ? items.length : items.filter((item) => item.group === group).length;
              const selected = filter === group;
              return (
                <button
                  key={group}
                  type="button"
                  onClick={() => setFilter(group)}
                  aria-pressed={selected}
                  className={`flex h-9 items-center gap-2 rounded-full border px-4 text-sm transition-colors ${
                    selected
                      ? "border-ink bg-ink text-paper"
                      : "border-ink/10 bg-surface/60 text-ink/70 hover:border-ink/25 hover:text-ink"
                  }`}
                >
                  {group !== "All" && (
                    <span className="h-2 w-2 rounded-full" style={{ background: clientColors[group] }} />
                  )}
                  {group}
                  <span className={selected ? "text-paper/55" : "text-ink/35"}>{count}</span>
                </button>
              );
            })}
          </div>
        </SectionHeader>

        <div
          ref={gridRef}
          className="mt-14 grid justify-center gap-4 sm:mt-16 sm:gap-5"
          style={{ gridTemplateColumns: `repeat(${columns.length}, minmax(0, 230px))` }}
        >
          {columns.map((column, index) => (
            <div
              key={`${filter}-${index}`}
              data-speed={index % 2 ? 110 : 30}
              className={`flex flex-col gap-8 will-change-transform ${index % 2 ? "pt-16" : ""}`}
            >
              {column.map((item) => (
                <ReelCard key={item.id} item={item} index={items.indexOf(item)} />
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ShortForm;
