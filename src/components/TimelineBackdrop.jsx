import { useMemo } from "react";

// Small seeded random generator so the timeline looks the same on every load.
const seeded = (seed) => () => {
  seed = (seed + 0x6d2b79f5) | 0;
  let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
  t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
};

const WIDTH = 2400;
const ROW = 34;
const GAP = 6;
const RULER = 28;

const ROWS = [
  { id: "V3", color: "#f472b6", fill: 0.4, names: ["TITLE_card", "LOWER_third", "CAPTIONS"] },
  { id: "V2", color: "#8b7cf6", fill: 0.65, names: ["BROLL_city.mp4", "ZOOM_punch", "SCREEN_rec.mov"] },
  { id: "V1", color: "#4d7cff", fill: 0.95, names: ["AROLL_01.mov", "HOOK_v3.mp4", "AROLL_02.mov", "CTA_end.mp4"] },
  { id: "A1", color: "#22c3a6", fill: 0.9, audio: true, names: ["VO_final.wav"] },
  { id: "A2", color: "#22c3a6", fill: 0.6, audio: true, names: ["MUSIC_bed.mp3", "SFX_whoosh.wav"] },
];

const HEIGHT = RULER + ROWS.length * (ROW + GAP);

const waveform = (random, x, y, width) => {
  const middle = y + ROW / 2;
  let d = "";
  for (let i = 6; i < width - 4; i += 3) {
    const h = (0.15 + random() * 0.85) * (ROW / 2 - 7);
    d += `M${(x + i).toFixed(1)} ${(middle - h).toFixed(1)}V${(middle + h).toFixed(1)}`;
  }
  return d;
};

// A decorative Premiere-style timeline (tracks, clips, waveforms) used as a
// background texture behind the short-form header. Ruler ticks use the text
// colour; `labels` adds timecodes and clip names.
const TimelineBackdrop = ({ className = "", labels = true }) => {
  const rows = useMemo(() => {
    const random = seeded(11);
    return ROWS.map((row, index) => {
      const y = RULER + index * (ROW + GAP);
      const clips = [];
      let x = random() * 80;
      while (x < WIDTH) {
        const width = 110 + random() * 280;
        if (random() < row.fill) {
          clips.push({
            x,
            width,
            name: row.names[clips.length % row.names.length],
            wave: row.audio ? waveform(random, x, y, width) : null,
          });
        }
        x += width + (random() < 0.3 ? 30 + random() * 90 : 4);
      }
      return { ...row, y, clips };
    });
  }, []);

  const ticks = [];
  for (let x = 0; x <= WIDTH; x += 24) ticks.push(x);

  return (
    <svg
      viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
      width={WIDTH}
      height={HEIGHT}
      className={className}
      aria-hidden="true"
    >
      {ticks.map((x) => (
        <line
          key={x}
          x1={x}
          x2={x}
          y1={x % 240 === 0 ? 4 : 14}
          y2={RULER - 6}
          stroke="currentColor"
          strokeOpacity={x % 240 === 0 ? 0.35 : 0.15}
        />
      ))}
      {labels &&
        ticks
          .filter((x) => x % 240 === 0)
          .map((x) => (
            <text
              key={x}
              x={x + 6}
              y={13}
              fill="#fff"
              fillOpacity="0.4"
              fontSize="10"
              fontFamily="Geist Mono, monospace"
            >
              {`00:00:${String(x / 48).padStart(2, "0")}:00`}
            </text>
          ))}

      {rows.map((row) =>
        row.clips.map((clip) => (
          <g key={`${row.id}-${clip.x}`}>
            <rect
              x={clip.x}
              y={row.y}
              width={clip.width}
              height={ROW}
              rx="5"
              fill={row.color}
              fillOpacity="0.28"
              stroke={row.color}
              strokeOpacity="0.65"
            />
            {clip.wave && (
              <path d={clip.wave} stroke={row.color} strokeOpacity="0.55" strokeWidth="1.4" />
            )}
            {labels && !clip.wave && (
              <text
                x={clip.x + 9}
                y={row.y + 21}
                fill="#fff"
                fillOpacity="0.6"
                fontSize="11"
                fontFamily="Geist Mono, monospace"
              >
                {clip.name}
              </text>
            )}
          </g>
        )),
      )}
    </svg>
  );
};

export default TimelineBackdrop;
