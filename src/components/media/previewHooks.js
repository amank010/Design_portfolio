import { useCallback, useEffect, useRef, useState } from "react";

import { observe } from "../../lib/observe";

// `near`: within about a screen of the viewport, time to start loading (stays
// true once set). `visible`: at least 30% on screen, time to play.
export const usePreviewState = (ref) => {
  const [near, setNear] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(
    () =>
      observe(
        ref.current,
        (entry) => {
          if (entry.isIntersecting) setNear(true);
        },
        { rootMargin: "80% 0px" },
      ),
    [ref],
  );

  useEffect(
    () =>
      observe(
        ref.current,
        (entry) => setVisible(entry.isIntersecting && entry.intersectionRatio >= 0.3),
        { threshold: [0, 0.3] },
      ),
    [ref],
  );

  return { near, visible };
};

// Tilts the tile toward the pointer and moves its glass highlight.
export const useTilt = (max = 6) => {
  const frame = useRef(0);

  const onPointerMove = useCallback(
    (event) => {
      if (event.pointerType !== "mouse") return;
      const tile = event.currentTarget;
      const { left, top, width, height } = tile.getBoundingClientRect();
      const x = (event.clientX - left) / width;
      const y = (event.clientY - top) / height;

      cancelAnimationFrame(frame.current);
      frame.current = requestAnimationFrame(() => {
        tile.style.setProperty("--ry", `${(x - 0.5) * max}deg`);
        tile.style.setProperty("--rx", `${(0.5 - y) * max}deg`);
        tile.style.setProperty("--gx", `${x * 100}%`);
        tile.style.setProperty("--gy", `${y * 100}%`);
      });
    },
    [max],
  );

  const onPointerLeave = useCallback((event) => {
    cancelAnimationFrame(frame.current);
    event.currentTarget.style.removeProperty("--rx");
    event.currentTarget.style.removeProperty("--ry");
  }, []);

  return { onPointerMove, onPointerLeave };
};
