export const FPS = 25;

const pad = (n) => String(n).padStart(2, "0");

// 83.4 -> "00:01:23:10" (HH:MM:SS:FF)
export const toTimecode = (seconds, fps = FPS) => {
  const frames = Math.max(0, Math.floor(seconds * fps));
  const f = frames % fps;
  const s = Math.floor(frames / fps) % 60;
  const m = Math.floor(frames / (fps * 60)) % 60;
  const h = Math.floor(frames / (fps * 3600));
  return `${pad(h)}:${pad(m)}:${pad(s)}:${pad(f)}`;
};

// one shared formatter: toLocaleString builds a new one on every call
const monthYear = new Intl.DateTimeFormat("en", { month: "short", year: "numeric" });

// months since year 0 -> "Jul 2024"
export const formatMonthIndex = (months) =>
  monthYear.format(new Date(Math.floor(months / 12), Math.floor(months) % 12));

// "2024-07" -> "Jul 2024"
export const formatMonth = (yearMonth) => (yearMonth ? formatMonthIndex(toMonths(yearMonth)) : "");

// "2024-07" -> months since year 0, for placing things on a timeline
export function toMonths(yearMonth) {
  const [year, month] = yearMonth.split("-").map(Number);
  return year * 12 + (month - 1);
}
