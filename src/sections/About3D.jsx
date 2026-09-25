import { OrbitControls } from "@react-three/drei";
import { Suspense } from "react";
import { useMediaQuery } from "react-responsive";

import CanvasLoader from "../components/CanvasLoader";
import DtuNew from "../components/DtuNew";
import HeroCamera from "../components/HeroCamera";
import InViewCanvas from "../components/InViewCanvas";

// Loaded lazily alongside the hero's three.js chunk.
const About3D = () => {
  // Orbit dragging would swallow swipes on touch screens (the page couldn't
  // scroll past the model), and wheel-zoom would trap the mouse wheel.
  const finePointer = useMediaQuery({ query: "(hover: hover) and (pointer: fine)" });

  return (
    <InViewCanvas className="h-full w-full" dpr={[1, 1.5]}>
      <ambientLight intensity={1} />
      <directionalLight position={[0, 2, 10]} />
      {/* The position is hand-tuned to frame the front gate. (A <Center> used to
          wrap this, but it only ever measured the model before it loaded;
          once it did measure it, it re-centred the whole campus.) */}
      <Suspense fallback={<CanvasLoader />}>
        <HeroCamera>
          <DtuNew scale={10} rotation={[0, 0, 0]} position={[-61, -143, 165]} />
        </HeroCamera>
      </Suspense>
      {finePointer && (
        <OrbitControls
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
          enableZoom={false}
          enablePan={false}
        />
      )}
    </InViewCanvas>
  );
};

export default About3D;
