// Torn-paper outlines as CSS clip-path polygons, and shadows that fall away
// from the lamp. Seeded, so each scrap tears differently but the same way on
// every visit.

const random = (seed) => {
  let value = (Math.abs(Math.floor(seed * 9973)) % 2147483646) + 1;
  return () => {
    value = (value * 16807) % 2147483647;
    return (value - 1) / 2147483646;
  };
};

// Smooth 1D noise: random values every `period` samples, eased in between.
const waves = (r, count, period) => {
  const knots = Array.from({ length: Math.ceil(count / period) + 2 }, r);
  return (i) => {
    const k = Math.floor(i / period);
    const t = (i % period) / period;
    const e = (1 - Math.cos(t * Math.PI)) / 2;
    return knots[k] * (1 - e) + knots[k + 1] * e;
  };
};

const pct = (n) => `${n.toFixed(2)}%`;

// A rectangle whose edges are torn: fine fibrous jags on top of slower waves,
// up to `jag` percent deep. `edges` lists which sides are torn ("t", "r", "b",
// "l"); the rest stay cleanly cut.
export const tornRect = (seed, { jag = 2, steps = 36, edges = "trbl" } = {}) => {
  const r = random(seed);
  const side = () => {
    const slow = waves(r, steps + 1, 6);
    return (i) => jag * (0.55 * slow(i) + 0.45 * r() ** 1.5);
  };
  const t = side();
  const rt = side();
  const b = side();
  const l = side();
  const cut = (edge, fn, i) => (edges.includes(edge) ? fn(i) : 0);
  const points = [];
  for (let i = 0; i <= steps; i += 1) points.push([(i / steps) * 100, cut("t", t, i)]);
  for (let i = 1; i <= steps; i += 1) points.push([100 - cut("r", rt, i), (i / steps) * 100]);
  for (let i = steps - 1; i >= 0; i -= 1) points.push([(i / steps) * 100, 100 - cut("b", b, i)]);
  for (let i = steps - 1; i >= 1; i -= 1) points.push([cut("l", l, i), (i / steps) * 100]);
  return `polygon(${points.map(([x, y]) => `${pct(x)} ${pct(y)}`).join(",")})`;
};

// A roughly round scrap, torn all the way around.
export const tornBlob = (seed, { points = 64, jag = 7 } = {}) => {
  const r = random(seed);
  const slow = waves(r, points + 1, 8);
  const outline = [];
  for (let i = 0; i < points; i += 1) {
    const angle = (i / points) * Math.PI * 2;
    const radius = 50 - jag * (0.6 * slow(i) + 0.4 * r() ** 1.5);
    outline.push([50 + Math.cos(angle) * radius, 50 + Math.sin(angle) * radius]);
  }
  return `polygon(${outline.map(([x, y]) => `${pct(x)} ${pct(y)}`).join(",")})`;
};

// Direction and length of a shadow cast by something at (x, y) lit by a lamp
// at (lampX, lampY), in the same units. The bulb hangs up and to the right in
// front of the board, so shadows fall mostly to the left (and a little down),
// getting longer further from it.
export const shadowVector = (x, y, lampX, lampY, scale) => {
  const dx = (x - lampX) / scale;
  const dy = ((y - lampY) / scale) * 0.35 + 0.08;
  const distance = Math.hypot(dx, dy) || 1;
  const length = 0.35 + 0.75 * Math.hypot(dx, (y - lampY) / scale);
  return [(dx / distance) * length, (dy / distance) * length, length];
};

// Shadow cast by something at `center` (board %) lit by the lamp at `lamp`
// (board %); `lift` is how far it stands off the board (flat paper ~1, a
// polaroid stack ~1.7). Returns CSS variables in cqw (percent of the board's
// width) for the .cast class: crisp, with only a little blur.
export const castShadow = (center, lamp, aspect, lift = 1) => {
  const [sx, sy, length] = shadowVector(center[0], center[1] / aspect, lamp[0], lamp[1] / aspect, 100);
  return {
    "--sx": `${(sx * lift).toFixed(3)}cqw`,
    "--sy": `${(sy * lift).toFixed(3)}cqw`,
    "--sb": `${(0.08 + length * lift * 0.12).toFixed(3)}cqw`,
  };
};
