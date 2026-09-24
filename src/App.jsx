import React, { useEffect, useLayoutEffect } from "react";
import Navbar from "./sections/Navbar";
import Hero from "./sections/Hero";
import Projects from "./sections/Projects";
import About from "./sections/About";
import Skills from "./sections/Skills";
import ScrollBackground from "./components/ScrollBackground";
import LogoFilters from "./components/LogoFilters";

const App = () => {
  //save scroll position (debounced, not on every scroll event)
  useEffect(() => {
    let timeout;
    const save = () => localStorage.setItem("scrollY", window.scrollY.toString());
    const handleScroll = () => {
      clearTimeout(timeout);
      timeout = setTimeout(save, 150);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("pagehide", save);

    return () => {
      clearTimeout(timeout);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("pagehide", save);
    };
  }, []);

  //restore scroll position
  useLayoutEffect(() => {
    const savedScrollY = localStorage.getItem("scrollY");
    if (savedScrollY !== null) {
      window.requestAnimationFrame(() => {
        window.scrollTo({
          top: parseInt(savedScrollY),
          behavior: "auto", // Use 'auto' here for immediate jump
        });
      });
    }
  }, []);

  return (
    <div className="relative min-h-screen w-full">
      <LogoFilters />
      <ScrollBackground />

      <div className="relative z-10 max-w-8xl mx-auto ">
        <Navbar />
        <Hero />
        <Skills />
        <Projects />
        <About />
      </div>
    </div>
  );
};

export default App;
