import { useEffect, useRef } from "react";

import { observe } from "../lib/observe";

// Fades and lifts its content in the first time it scrolls into view.
const Reveal = ({ as = "div", delay = 0, className = "", style, children, ref: outerRef, ...rest }) => {
  const Tag = as;
  const ref = useRef(null);

  // keep our ref and pass the element on to a ref from outside, if any
  const setRef = (node) => {
    ref.current = node;
    if (typeof outerRef === "function") outerRef(node);
    else if (outerRef) outerRef.current = node;
  };

  useEffect(() => {
    const element = ref.current;
    const stop = observe(
      element,
      (entry) => {
        if (!entry.isIntersecting) return;
        element.classList.add("is-in");
        stop();
      },
      { rootMargin: "0px 0px -8% 0px" },
    );
    return stop;
  }, []);

  return (
    <Tag
      ref={setRef}
      data-reveal=""
      className={className}
      style={{ ...style, "--delay": `${delay}ms` }}
      {...rest}
    >
      {children}
    </Tag>
  );
};

export default Reveal;
