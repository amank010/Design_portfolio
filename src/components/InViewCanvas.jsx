import { Canvas, useThree } from "@react-three/fiber";
import { useEffect } from "react";

import useInView from "../hooks/useInView";

// Restarts R3F's render loop when the canvas comes back into view.
const ResumeOnActive = ({ active }) => {
  const invalidate = useThree((state) => state.invalidate);

  useEffect(() => {
    if (active) invalidate();
  }, [active, invalidate]);

  return null;
};

// Drop-in <Canvas> that only renders every frame while it is on screen.
// Off screen it falls back to "demand", so the scene is still drawn once
// (models/shaders get uploaded up front) but costs nothing per frame.
const InViewCanvas = ({ rootMargin = "150px", children, ...props }) => {
  const [ref, inView] = useInView(rootMargin);

  return (
    <Canvas ref={ref} frameloop={inView ? "always" : "demand"} {...props}>
      {children}
      <ResumeOnActive active={inView} />
    </Canvas>
  );
};

export default InViewCanvas;
