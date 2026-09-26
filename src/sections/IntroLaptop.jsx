import { useFrame } from "@react-three/fiber";
import { Suspense, useRef } from "react";

import CanvasLoader from "../components/CanvasLoader";
import HeroCamera from "../components/HeroCamera";
import InViewCanvas from "../components/InViewCanvas";
import LaptopNew from "../components/LaptopNew";

// Daylight by default; at night the room dims and a warm key light (the hero's
// bulb, up and to the right) picks out the laptop.
const Lights = ({ dark }) => {
  const ambient = useRef(null);
  const sun = useRef(null);
  const lamp = useRef(null);

  useFrame((_, delta) => {
    const k = 1 - Math.exp(-Math.min(delta, 1 / 20) * 4);
    ambient.current.intensity += ((dark ? 0.8 : 3) - ambient.current.intensity) * k;
    sun.current.intensity += ((dark ? 0.2 : 1) - sun.current.intensity) * k;
    lamp.current.intensity += ((dark ? 2.2 : 0) - lamp.current.intensity) * k;
  });

  return (
    <>
      <ambientLight ref={ambient} intensity={dark ? 0.8 : 3} />
      <directionalLight ref={sun} position={[5, 70, -10]} intensity={dark ? 0.2 : 1} />
      <directionalLight ref={lamp} position={[30, 40, 30]} color="#ffb45a" intensity={dark ? 2.2 : 0} />
    </>
  );
};

// The 3D laptop playing the showreel, loaded lazily beside the intro statement.
const IntroLaptop = ({ isMobile, dark }) => (
  <InViewCanvas className="h-full w-full" dpr={[1, 1.5]} camera={{ fov: 30, position: [0, 0, 40] }}>
    <Lights dark={dark} />
    <Suspense fallback={<CanvasLoader />}>
      <HeroCamera>
        {/* LaptopNew places itself at (2, -7, 12) and animates from there (a bob
            of +5 up, and forward to z = 4); bring that back to the centre */}
        <group position={[-2.2, -1, -4]}>
          <LaptopNew scale={isMobile ? 38 : 40} rotation={[0, Math.PI / 7, 0]} position={[-1, -3, 2]} />
        </group>
      </HeroCamera>
    </Suspense>
  </InViewCanvas>
);

export default IntroLaptop;
