import { useEffect, useLayoutEffect, useRef, useState } from "react";

import { shadowVector } from "./paper";

// Where an anchor sits inside the board, from layout offsets. Transforms (a
// scrap swinging on hover, the board tilting on scroll) don't change offsets,
// and scraps swing around their own pin anyway, so the strings stay attached.
const offsetWithin = (element, root) => {
  let x = 0;
  let y = 0;
  let node = element;
  while (node && node !== root) {
    x += node.offsetLeft;
    y += node.offsetTop;
    node = node.offsetParent;
  }
  return [x, y];
};

// A string sags a little under its own weight: a quadratic curve whose control
// point hangs below the midpoint. Steep strings barely sag.
const sagPath = ([ax, ay], [bx, by]) => {
  const length = Math.hypot(bx - ax, by - ay);
  const flatness = Math.abs(bx - ax) / (length || 1);
  const sag = (6 + length * 0.07) * flatness;
  return `M${ax.toFixed(1)} ${ay.toFixed(1)} Q${((ax + bx) / 2).toFixed(1)} ${((ay + by) / 2 + sag).toFixed(1)} ${bx.toFixed(1)} ${by.toFixed(1)}`;
};

const reducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// A shadow offset and blur (px) for something at `point` that stands `lift` px
// off the board, falling away from the lamp (see shadowVector).
const awayFrom = (lampPoint, point, width, lift) => {
  const [sx, sy, length] = shadowVector(point[0], point[1], lampPoint[0], lampPoint[1], width);
  return [sx * lift, sy * lift, 1 + length * lift * 0.16];
};

// Red strings from the `from` anchor to every other anchor on the board (any
// element with data-anchor), plus one loose string running off the board at
// `loose` (percent of the board). Pins are drawn on top of the strings.
const Strings = ({ boardRef, from, loose, lamp, layoutKey }) => {
  const [geometry, setGeometry] = useState(null);
  const svgRef = useRef(null);
  const drawn = useRef(false);

  // useEffect, not useLayoutEffect: a child's layout effect runs before the
  // parent's ref (the board) is attached
  useEffect(() => {
    const board = boardRef.current;
    if (!board) return undefined;

    const measure = () => {
      const anchors = [...board.querySelectorAll("[data-anchor]")].map((element) => ({
        id: element.dataset.anchor,
        point: offsetWithin(element, board),
      }));
      const origin = anchors.find((anchor) => anchor.id === from);
      if (!origin) return;
      const width = board.offsetWidth;
      const height = board.offsetHeight;
      const lampPoint = [(lamp[0] / 100) * width, (lamp[1] / 100) * height];
      // "<from>-foot" (if there is one) is where the loose string leaves from
      const foot = anchors.find((anchor) => anchor.id === `${from}-foot`) ?? origin;
      const ends = anchors
        .filter((anchor) => anchor.id !== from && anchor !== foot)
        .map((anchor) => anchor.point);
      const paths = ends.map((end) => sagPath(origin.point, end));
      if (loose) paths.push(sagPath(foot.point, [(loose[0] / 100) * width, (loose[1] / 100) * height]));
      setGeometry({
        width,
        height,
        paths,
        // the strings stand off the paper between the pins
        stringShadow: awayFrom(lampPoint, origin.point, width, width * 0.007),
        pins: anchors.map((anchor) => ({
          point: anchor.point,
          shadow: awayFrom(lampPoint, anchor.point, width, width * 0.012),
        })),
      });
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(board);
    document.fonts?.ready.then(measure);
    return () => observer.disconnect();
  }, [boardRef, from, loose, lamp, layoutKey]);

  // draw the strings in, one after another, the first time they appear
  useLayoutEffect(() => {
    if (!geometry || drawn.current || reducedMotion()) return;
    drawn.current = true;
    const paths = [...svgRef.current.querySelectorAll("path")];
    paths.forEach((path, index) => {
      const length = path.getTotalLength();
      path.style.strokeDasharray = `${length}`;
      path.style.strokeDashoffset = `${length}`;
      path.getBoundingClientRect(); // commit the start state before transitioning
      path.style.transition = `stroke-dashoffset 1.1s cubic-bezier(0.6, 0, 0.3, 1) ${0.5 + index * 0.12}s`;
      path.style.strokeDashoffset = "0";
      // afterwards the string is a plain line again, so a resize redraws it whole
      path.addEventListener(
        "transitionend",
        () => {
          path.style.strokeDasharray = "";
          path.style.strokeDashoffset = "";
          path.style.transition = "";
        },
        { once: true },
      );
    });
  }, [geometry]);

  if (!geometry) return null;

  return (
    <>
      <svg
        ref={svgRef}
        className="string cast pointer-events-none absolute left-0 top-0 z-20 overflow-visible"
        width={geometry.width}
        height={geometry.height}
        style={{
          "--sx": `${geometry.stringShadow[0].toFixed(1)}px`,
          "--sy": `${geometry.stringShadow[1].toFixed(1)}px`,
          "--sb": `${geometry.stringShadow[2].toFixed(1)}px`,
        }}
        aria-hidden="true"
      >
        {geometry.paths.map((d, index) => (
          <path key={index} d={d} />
        ))}
      </svg>
      <div className="pointer-events-none absolute inset-0 z-30" aria-hidden="true">
        {geometry.pins.map(({ point: [x, y], shadow: [sx, sy, sb] }, index) => (
          <span
            key={index}
            className="pin cast"
            style={{ left: x, top: y, "--sx": `${sx.toFixed(1)}px`, "--sy": `${sy.toFixed(1)}px`, "--sb": `${sb.toFixed(1)}px` }}
          />
        ))}
      </div>
    </>
  );
};

export default Strings;
