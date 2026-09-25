import { Html, useProgress } from "@react-three/drei";

const CanvasLoader = () => {
  const { progress } = useProgress();

  return (
    <Html center>
      <div className="glass-light flex items-center gap-2 whitespace-nowrap rounded-full px-3.5 py-2 font-mono text-[11px] uppercase tracking-[0.14em] text-ink/60">
        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent" />
        Loading 3D · {Math.round(progress)}%
      </div>
    </Html>
  );
};

export default CanvasLoader;
