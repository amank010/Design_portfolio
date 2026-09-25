import { useMemo } from "react";

import { ArrowUpRightIcon, YouTubeIcon } from "../components/Icons";
import VideoTile from "../components/media/VideoTile";
import YouTubeTile from "../components/media/YouTubeTile";
import SectionHeader from "../components/SectionHeader";
import { longForm, moreLongForm } from "../data/work";
import { withMedia } from "../lib/media";
import { formatMonth } from "../lib/timecode";

const ACCENT = "var(--color-track-blue)";

const LongForm = () => {
  const items = useMemo(() => withMedia("long", longForm), []);

  return (
    <section
      id="long-form"
      data-marker="Long-form"
      className="container-x relative pb-28 pt-12 sm:pb-36"
    >
      <SectionHeader
        track="V2"
        color={ACCENT}
        label="Long-form · 16:9"
        title={
          <>
            Long-form that
            <br />
            <em>keeps them watching</em>.
          </>
        }
      >
        <a
          href={moreLongForm.href}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-light btn-sm"
        >
          <YouTubeIcon className="h-4 w-4 text-[#ff3b30]" />
          {moreLongForm.label}
          <ArrowUpRightIcon className="h-3.5 w-3.5" />
        </a>
      </SectionHeader>

      <div className="mt-14 grid gap-x-6 gap-y-12 md:grid-cols-2">
        {items.map((item) => (
          <article key={item.id}>
            <div className="glass-light rounded-[26px] p-2">
              {item.youtube ? (
                <YouTubeTile item={item} accent={ACCENT} badge={item.client} meta={item.duration} />
              ) : (
                <VideoTile
                  item={item}
                  aspect="16 / 9"
                  accent={ACCENT}
                  badge={item.client}
                  meta={item.duration}
                />
              )}
            </div>
            <div className="mt-4 px-2">
              <h3 className="text-xl font-medium leading-snug tracking-tight">{item.title}</h3>
              <p className="eyebrow mt-2 text-ink/45">
                {[item.role, formatMonth(item.date)].filter(Boolean).join(" · ")}
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default LongForm;
