import { formatMonth } from "../../lib/timecode";
import { ArrowUpRightIcon, InstagramIcon } from "../Icons";

const Cell = ({ label, value, className = "" }) => (
  <div className={`slate-cell min-w-0 px-2.5 py-2 ${className}`}>
    <p className="font-mono text-[9px] uppercase tracking-[0.14em] text-white/40">{label}</p>
    <p className="mt-1 truncate text-[12px] font-medium text-white/90">{value}</p>
  </div>
);

// Stands in for a reel until its video file is added: a clapperboard slate
// that links to the reel on Instagram.
const SlateTile = ({ item, accent, index }) => (
  <a
    href={item.href}
    target="_blank"
    rel="noopener noreferrer"
    className="slate group @container"
    style={{ "--c": accent }}
    aria-label={`${item.title} for ${item.client}, watch on Instagram`}
  >
    <div className="slate-clapper">
      <span className="slate-stick is-top" />
      <span className="slate-stick is-bottom" />
    </div>

    <div className="flex min-h-0 flex-1 flex-col p-2.5">
      <div className="slate-cell flex min-h-0 flex-1 flex-col rounded-xl border">
        <Cell label="Prod." value={item.client} className="border-b" />
        <div className="grid grid-cols-2 @max-[200px]:hidden">
          <Cell label="Roll" value={`A${String(index + 1).padStart(3, "0")}`} className="border-b border-r" />
          <Cell label="Take" value="01" className="border-b" />
        </div>
        <div className="flex min-h-0 flex-1 items-center px-3">
          <p className="font-serif text-[clamp(1.1rem,13cqw,1.9rem)] leading-[1.02] italic">
            {item.title}
          </p>
        </div>
        <div className="grid grid-cols-[1fr_auto]">
          <Cell label="Date" value={formatMonth(item.date)} className="border-r border-t" />
          <Cell label="Fmt" value="9:16" className="border-t" />
        </div>
      </div>

      <span className="mt-2.5 flex h-9 items-center justify-center gap-2 rounded-full border border-white/15 bg-white/5 text-[12px] font-medium text-white/85 transition-colors group-hover:bg-white/10">
        <InstagramIcon className="h-3.5 w-3.5" />
        <span>
          Watch<span className="@max-[200px]:hidden"> on Instagram</span>
        </span>
        <ArrowUpRightIcon className="h-3 w-3" />
      </span>

      {import.meta.env.DEV && (
        <span className="mt-2 text-center font-mono text-[9px] leading-tight text-amber-300/80 @max-[200px]:hidden">
          dev: add videos/short/{item.id}.mp4
        </span>
      )}
    </div>
  </a>
);

export default SlateTile;
