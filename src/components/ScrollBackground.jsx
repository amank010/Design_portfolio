import { useEffect, useState } from "react";

const getSection = () => {
  const projectOffset = document.getElementById("projects")?.offsetTop || 0;
  const aboutOffset = document.getElementById("about")?.offsetTop || 0;
  const viewportBottom = window.scrollY + window.innerHeight;

  if (viewportBottom > aboutOffset + 500) return "about";
  if (viewportBottom > projectOffset + 100) return "projects";
  return "home";
};

// Owns the scroll-spy state so a section change only re-renders these three
// gradients, not the whole page (and the two 3D scenes with it).
const ScrollBackground = () => {
  const [section, setSection] = useState("home");

  useEffect(() => {
    let frame = 0;

    const update = () => {
      frame = 0;
      setSection(getSection());
    };
    const handleScroll = () => {
      if (!frame) frame = requestAnimationFrame(update); // at most once per frame
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    update();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <>
      {/* blue gradient */}
      <div
        className={`absolute inset-0 z-0 transition-opacity duration-1000 pointer-events-none ${section === "home" ? "opacity-100" : "opacity-0"} bg-[radial-gradient(ellipse_at_top,_rgba(0,102,255,0.4)_20%,_transparent_90%)] `}
      />

      {/* violet */}
      <div
        className={`absolute inset-0 z-0 transition-opacity duration-1000 pointer-events-none ${section === "projects" ? "opacity-100" : "opacity-0"} bg-[radial-gradient(ellipse_at_top,_rgba(138,43,226,0.7)_20%,_white_90%)] `}
      />

      {/* green */}
      <div
        className={`absolute inset-0 z-0 transition-opacity duration-1000 pointer-events-none ${section === "about" ? "opacity-100" : "opacity-0"} bg-[radial-gradient(ellipse_at_top,_rgba(0,128,64,1)_30%,_white_90%)] `}
      />
    </>
  );
};

export default ScrollBackground;
