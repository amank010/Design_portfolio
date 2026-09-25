import { PlayIcon, VolumeOffIcon, VolumeOnIcon } from "../Icons";

// Shown on hover (always on touch screens): a hint that clicking opens the
// full video, and the speaker toggle.
const TileControls = ({ audible, onSound }) => (
  <div className="tile-controls">
    <span className="tile-pill pointer-events-none max-sm:hidden">
      <PlayIcon className="h-3 w-3" />
      Watch
    </span>
    <button
      type="button"
      className={`tile-pill ml-auto max-sm:h-9 max-sm:w-9 max-sm:justify-center max-sm:px-0 ${audible ? "is-on" : ""}`}
      onClick={(event) => {
        event.stopPropagation();
        onSound();
      }}
      aria-pressed={audible}
      aria-label={audible ? "Mute" : "Play with sound"}
    >
      {audible ? (
        <VolumeOnIcon className="h-3.5 w-3.5" />
      ) : (
        <VolumeOffIcon className="h-3.5 w-3.5" />
      )}
      <span className="max-sm:hidden">{audible ? "Sound on" : "Sound"}</span>
    </button>
  </div>
);

export default TileControls;

// Small labels over the top of a tile: client on the left, e.g. duration on
// the right.
export const TileBadges = ({ left, right, color }) => (
  <div className="pointer-events-none absolute inset-x-2.5 top-2.5 z-[4] flex items-start justify-between gap-2">
    {left ? (
      <span className="flex h-6 min-w-0 items-center gap-1.5 rounded-full bg-black/45 px-2.5 text-[11px] font-medium text-white">
        {color && <span className="h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: color }} />}
        <span className="truncate">{left}</span>
      </span>
    ) : (
      <span />
    )}
    {right && (
      <span className="flex h-6 items-center rounded-full bg-black/45 px-2.5 font-mono text-[11px] tabular-nums text-white">
        {right}
      </span>
    )}
  </div>
);
