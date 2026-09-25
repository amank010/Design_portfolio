import { PerspectiveCamera } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { Suspense, useRef } from "react";

import CanvasLoader from "../components/CanvasLoader";
import HeroCamera from "../components/HeroCamera";
import InViewCanvas from "../components/InViewCanvas";
import LaptopNew from "../components/LaptopNew";

// Sinks and tips the laptop as the hero scrolls away.
const ScrollRig = ({ children }) => {
  const ref = useRef(null);

  useFrame(() => {
    const t = Math.min(window.scrollY / window.innerHeight, 1);
    ref.current.position.y = -t * 6;
    ref.current.rotation.x = -t * 0.35;
  });

  return <group ref={ref}>{children}</group>;
};

// Loaded lazily so three.js doesn't hold up the first paint. The canvas covers
// the whole hero, so it renders at no more than 1.5x pixel density and stops
// animating once most of the hero has scrolled away.
const Hero3D = ({ isMobile }) => (
  <InViewCanvas className="h-full w-full" dpr={[1, 1.5]} rootMargin="0px" minRatio={0.3}>
    <Suspense fallback={<CanvasLoader />}>
      <PerspectiveCamera makeDefault position={[0, 1, 30]} />
      <ScrollRig>
        <HeroCamera>
          <LaptopNew
            scale={isMobile ? 30 : 40}
            rotation={[0, Math.PI / 7, 0]}
            position={[-1, -3, 2]}
          />
        </HeroCamera>
      </ScrollRig>
      <ambientLight intensity={3} />
      <directionalLight position={[5, 70, -10]} />
    </Suspense>
  </InViewCanvas>
);

export default Hero3D;
