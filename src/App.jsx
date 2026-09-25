import { useEffect, useLayoutEffect } from "react";

import Filmstrip from "./components/Filmstrip";
import Lightbox from "./components/media/Lightbox";
import SoundProvider from "./components/media/SoundProvider";
import Transport from "./components/Transport";
import { ScrollTrigger } from "./lib/gsap";
import { observe } from "./lib/observe";
import About from "./sections/About";
import Design from "./sections/Design";
import Footer from "./sections/Footer";
import Hero from "./sections/Hero";
import Intro from "./sections/Intro";
import Journey from "./sections/Journey";
import LongForm from "./sections/LongForm";
import Navbar from "./sections/Navbar";
import ShortForm from "./sections/ShortForm";
import Toolkit from "./sections/Toolkit";

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
          behavior: "instant", // "auto" would follow the CSS smooth scrolling
        });
      });
    }
  }, []);

  // pause looping CSS animations (REC dot, filmstrip) while
  // their section is off screen
  useEffect(() => {
    const stops = [...document.querySelectorAll("[data-animates]")].map((element) =>
      observe(element, (entry) => {
        element.dataset.offscreen = entry.isIntersecting ? "false" : "true";
      }),
    );
    return () => stops.forEach((stop) => stop());
  }, []);

  // scroll positions shift once the web fonts arrive
  useEffect(() => {
    document.fonts?.ready.then(() => ScrollTrigger.refresh());
  }, []);

  return (
    <SoundProvider>
      <div className="relative overflow-x-clip">
        <Navbar />
        <main>
          <Hero />
          <Intro />
          <div id="work" className="relative">
            <Filmstrip />
            <ShortForm />
            <LongForm />
          </div>
          <Toolkit />
          <Journey />
          <Design />
          <About />
        </main>
        <Footer />
        <Transport />
        <Lightbox />
      </div>
    </SoundProvider>
  );
};

export default App;
