import { Suspense } from "react";

import Bulb from "../components/Bulb";
import InViewCanvas from "../components/InViewCanvas";

// The hanging bulb's own small canvas (just the corner it hangs in), loaded
// lazily so three.js doesn't hold up the first paint.
const HeroBulb = ({ lit, onToggle, onLevel }) => (
  <InViewCanvas
    className="h-full w-full"
    dpr={[1, 2]}
    camera={{ fov: 30, position: [0, 0, 0.6], near: 0.01, far: 10 }}
    rootMargin="0px"
  >
    <ambientLight intensity={0.5} />
    <directionalLight position={[-0.6, 1, 1]} intensity={1.1} />
    <Suspense fallback={null}>
      <Bulb lit={lit} onToggle={onToggle} onLevel={onLevel} />
    </Suspense>
  </InViewCanvas>
);

export default HeroBulb;
