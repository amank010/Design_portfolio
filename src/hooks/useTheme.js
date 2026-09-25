import { useCallback, useEffect, useState } from "react";

const root = () => document.documentElement;

const apply = (theme) => {
  root().dataset.theme = theme;
  document.querySelector('meta[name="theme-color"]')?.setAttribute(
    "content",
    theme === "dark" ? "#0b0b10" : "#f3f3f6",
  );
};

// The theme lives on <html data-theme>; index.html sets it before the first
// paint. Until the visitor picks one it follows the OS setting.
const useTheme = () => {
  const [theme, setTheme] = useState(() => root().dataset.theme || "light");

  useEffect(() => {
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = (event) => {
      let saved = null;
      try {
        saved = localStorage.getItem("theme");
      } catch {
        // storage blocked: just follow the OS
      }
      if (saved) return;
      const next = event.matches ? "dark" : "light";
      apply(next);
      setTheme(next);
    };
    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, []);

  const toggle = useCallback(() => {
    const next = root().dataset.theme === "dark" ? "light" : "dark";
    apply(next);
    try {
      localStorage.setItem("theme", next);
    } catch {
      // storage blocked: the choice lasts for this visit
    }
    setTheme(next);
  }, []);

  return [theme, toggle];
};

export default useTheme;
