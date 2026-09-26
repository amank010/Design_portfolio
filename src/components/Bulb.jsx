import { useGLTF } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";

// A real incandescent bulb (Poly Haven "Lightbulb 01", CC0) in a black socket
// on a cord, with a brass pull chain. Lit, it flickers on, the filament burns
// and the glass glows; unlit it's clear glass. It swings on its own, when the
// pointer brushes it and when the page scrolls. Clicking it (or its chain)
// calls onToggle.
//
// Units are metres: the bulb is 10 cm tall.

const MODEL = "/models/lightbulb_01/lightbulb_01.gltf";
const FLICKER = [0.15, 0.9, 0.05, 0.7, 0.25, 1, 0.55, 1]; // one step per 70ms
const WARM = new THREE.Color("#ffb45a");
const FILAMENT = new THREE.Color("#ffb35c");
const GLASS_OFF = new THREE.Color("#ffffff");
const GLASS_ON = new THREE.Color("#ffd9a0");

// bulb model after it's turned base-up: tip at -0.083, screw top at +0.017
const GLASS_CENTRE = -0.048;
const SOCKET_BOTTOM = 0.002;
const SOCKET_TOP = 0.056;
const CHAIN_BEADS = 34;
const CHAIN_STEP = 0.0034;

const glowTexture = () => {
  const size = 256;
  const canvas = document.createElement("canvas");
  canvas.width = canvas.height = size;
  const ctx = canvas.getContext("2d");
  const gradient = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
  gradient.addColorStop(0, "rgba(255,226,170,1)");
  gradient.addColorStop(0.16, "rgba(255,190,110,0.6)");
  gradient.addColorStop(0.45, "rgba(255,150,70,0.16)");
  gradient.addColorStop(1, "rgba(255,140,60,0)");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, size, size);
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
};

const reducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// Reflections for the glass and metal, from three's built-in studio room
// (nothing to download).
const useStudioReflections = () => {
  const gl = useThree((state) => state.gl);
  const scene = useThree((state) => state.scene);
  useEffect(() => {
    const pmrem = new THREE.PMREMGenerator(gl);
    const environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
    scene.environment = environment;
    return () => {
      scene.environment = null;
      environment.dispose();
      pmrem.dispose();
    };
  }, [gl, scene]);
};

const Bulb = ({ lit, onToggle, onLevel, glassCentre = 0.72 }) => {
  const { scene: model } = useGLTF(MODEL);
  const camera = useThree((state) => state.camera);
  const size = useThree((state) => state.size);
  const scene = useThree((state) => state.scene);
  useStudioReflections();

  const swing = useRef(null);
  const chain = useRef(null);
  const light = useRef(null);
  const glow = useRef(null);
  // a page that loads dark starts with the light already on; it only flickers
  // when it's switched on
  const state = useRef({
    level: lit ? 1 : 0,
    heat: lit ? 1 : 0,
    angle: 0.1, // starts mid-swing, so it's clearly hanging
    velocity: 0,
    chainAngle: 0,
    chainVelocity: 0,
    pull: 0,
    pullVelocity: 0,
    // Our own clock: R3F resets its clock whenever the canvas pauses off screen
    // and resumes, which would send the flicker timing negative.
    time: 0,
    switchedAt: -10,
    lastScroll: window.scrollY,
    lastLevel: -1,
    still: reducedMotion(),
  });

  // The model's glass is made to refract a 3D scene behind it; here the page
  // is behind it, so give it reflective see-through glass instead.
  const parts = useMemo(() => {
    const bulb = model.clone(true);
    bulb.rotation.z = Math.PI; // screw base up
    let filament = null;
    let glass = null;
    bulb.traverse((object) => {
      if (!object.isMesh) return;
      if (object.material.name.includes("glass")) {
        glass = new THREE.MeshPhysicalMaterial({
          color: GLASS_OFF.clone(),
          transparent: true,
          opacity: 0.14,
          roughness: 0.03,
          metalness: 0,
          clearcoat: 1,
          clearcoatRoughness: 0.02,
          envMapIntensity: 2.2,
          side: THREE.DoubleSide,
          depthWrite: false,
          emissive: new THREE.Color("#ff9a3c"),
          emissiveIntensity: 0,
        });
        object.material = glass;
        object.renderOrder = 2;
      } else {
        filament = object.material.clone();
        filament.emissive = FILAMENT.clone();
        filament.emissiveIntensity = 0;
        object.material = filament;
      }
    });
    return { bulb, glass, filament };
  }, [model]);

  const glowMap = useMemo(glowTexture, []);
  useEffect(() => () => glowMap.dispose(), [glowMap]);

  const firstLit = useRef(true);
  useEffect(() => {
    if (firstLit.current) {
      firstLit.current = false;
      return;
    }
    if (lit) state.current.switchedAt = state.current.time;
  }, [lit]);

  // Frame the view so the bulb is ~38% of the canvas height and its glass sits
  // `glassCentre` of the way down; the cord runs up out of the top edge.
  const viewHeight = 0.1 / 0.38;
  const distance = viewHeight / 2 / Math.tan(THREE.MathUtils.degToRad(camera.fov ?? 30) / 2);
  const top = viewHeight / 2;
  const glassY = top - glassCentre * viewHeight;
  const pivot = top + 0.02;
  const bulbY = glassY - GLASS_CENTRE; // where the bulb's origin goes
  const cordLength = pivot - (bulbY + SOCKET_TOP);

  useEffect(() => {
    camera.position.set(0, 0, distance);
    camera.lookAt(0, 0, 0);
    camera.updateProjectionMatrix();
  }, [camera, distance, size]);

  useFrame((_, delta) => {
    const s = state.current;
    const dt = Math.min(delta, 1 / 20);
    s.time += dt;

    // brightness: flicker, then settle; the filament cools slower than it heats
    let target = lit ? 1 : 0;
    const sinceSwitch = s.time - s.switchedAt;
    if (lit && !s.still && sinceSwitch >= 0 && sinceSwitch < FLICKER.length * 0.07) {
      target = FLICKER[Math.floor(sinceSwitch / 0.07)];
    }
    s.level += (target - s.level) * (1 - Math.exp(-dt * (lit ? 28 : 10)));
    s.heat += (target - s.heat) * (1 - Math.exp(-dt * (lit ? 16 : 2.5)));

    parts.filament.emissiveIntensity = s.heat * 16;
    parts.glass.opacity = 0.14 + s.level * 0.2;
    parts.glass.color.lerpColors(GLASS_OFF, GLASS_ON, s.level);
    parts.glass.emissiveIntensity = s.level * 0.45;
    light.current.intensity = s.level * 0.35;
    glow.current.material.opacity = s.level;
    scene.environmentIntensity = 1 - s.level * 0.6;
    if (onLevel && Math.abs(s.level - s.lastLevel) > 0.004) {
      s.lastLevel = s.level;
      onLevel(s.level);
    }

    if (!s.still) {
      // pendulum: spring back to rest, damped, with a gentle idle breeze; the
      // page scrolling gives it a (capped) push
      const scroll = window.scrollY;
      s.velocity += THREE.MathUtils.clamp((scroll - s.lastScroll) * 0.0006, -0.25, 0.25);
      s.lastScroll = scroll;
      const breeze = Math.sin(s.time * 0.7) * 0.03;
      s.velocity += (-6 * s.angle - 0.8 * s.velocity + breeze) * dt;
      s.angle = THREE.MathUtils.clamp(s.angle + s.velocity * dt, -0.22, 0.22);

      // the chain trails the bulb's swing, and springs back after a pull
      s.chainVelocity += (-14 * (s.chainAngle + s.angle * 0.6) - 1.4 * s.chainVelocity) * dt;
      s.chainAngle += s.chainVelocity * dt;
      s.pullVelocity += (-60 * s.pull - 6 * s.pullVelocity) * dt;
      s.pull += s.pullVelocity * dt;
    }
    swing.current.rotation.z = s.angle;
    swing.current.rotation.x = s.angle * 0.3;
    chain.current.rotation.z = s.chainAngle;
    chain.current.position.y = SOCKET_BOTTOM + 0.03 + s.pull;
  });

  const nudge = (event, amount) => {
    const direction = event.nativeEvent?.movementX ? Math.sign(event.nativeEvent.movementX) : 1;
    state.current.velocity += amount * direction;
  };

  const handlers = {
    onClick: (event) => {
      event.stopPropagation();
      state.current.pull = -0.012;
      state.current.velocity += 0.5;
      onToggle?.();
    },
    onPointerOver: (event) => {
      event.stopPropagation();
      document.body.style.cursor = "pointer";
      nudge(event, 0.25);
    },
    onPointerOut: () => {
      document.body.style.cursor = "";
    },
  };

  const socketMaterial = (
    <meshPhysicalMaterial color="#0d0d0d" roughness={0.32} metalness={0.1} clearcoat={0.8} clearcoatRoughness={0.25} />
  );

  return (
    <group position={[0, pivot, 0]}>
      <group ref={swing} {...handlers}>
        {/* cord */}
        <mesh position={[0, -cordLength / 2, 0]}>
          <cylinderGeometry args={[0.0022, 0.0022, cordLength, 16]} />
          <meshStandardMaterial color="#111" roughness={0.55} />
        </mesh>

        <group position={[0, -pivot + bulbY, 0]}>
          {/* black socket over the top of the screw base */}
          <mesh position={[0, SOCKET_BOTTOM + 0.021, 0]}>
            <cylinderGeometry args={[0.0185, 0.02, 0.042, 64]} />
            {socketMaterial}
          </mesh>
          {[0.012, 0.018].map((y) => (
            <mesh key={y} position={[0, SOCKET_BOTTOM + y, 0]} rotation={[Math.PI / 2, 0, 0]}>
              <torusGeometry args={[0.0203, 0.0012, 16, 64]} />
              {socketMaterial}
            </mesh>
          ))}
          <mesh position={[0, SOCKET_TOP - 0.006, 0]}>
            <cylinderGeometry args={[0.007, 0.0165, 0.012, 48]} />
            {socketMaterial}
          </mesh>

          <primitive object={parts.bulb} />

          {/* brass bead pull chain, hanging from the side of the socket */}
          <group ref={chain} position={[0.0215, SOCKET_BOTTOM + 0.03, 0]}>
            {Array.from({ length: CHAIN_BEADS }, (_, index) => (
              <mesh key={index} position={[0, -index * CHAIN_STEP, 0]}>
                <sphereGeometry args={[0.0011, 10, 8]} />
                <meshStandardMaterial color="#c9a45c" metalness={1} roughness={0.28} />
              </mesh>
            ))}
            <mesh position={[0, -CHAIN_BEADS * CHAIN_STEP - 0.004, 0]}>
              <cylinderGeometry args={[0.0018, 0.0028, 0.008, 16]} />
              <meshStandardMaterial color="#c9a45c" metalness={1} roughness={0.25} />
            </mesh>
            {/* a generous invisible grip, so the thin chain is easy to click */}
            <mesh position={[0, -CHAIN_BEADS * CHAIN_STEP * 0.5, 0]}>
              <cylinderGeometry args={[0.007, 0.007, CHAIN_BEADS * CHAIN_STEP + 0.01, 8]} />
              <meshBasicMaterial transparent opacity={0} depthWrite={false} />
            </mesh>
          </group>

          {/* kept inside the canvas (the wide halo is CSS, in Hero.jsx) */}
          <sprite ref={glow} position={[0, GLASS_CENTRE, 0.02]} scale={[0.1, 0.1, 1]} renderOrder={3}>
            <spriteMaterial map={glowMap} transparent depthWrite={false} toneMapped={false} opacity={0} />
          </sprite>
          <pointLight ref={light} position={[0, GLASS_CENTRE, 0]} color={WARM} intensity={0} decay={2} />
        </group>
      </group>
    </group>
  );
};

useGLTF.preload(MODEL);

export default Bulb;
