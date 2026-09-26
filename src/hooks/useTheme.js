import { useEffect, useSyncExternalStore } from "react";

const root = () => document.documentElement;

const apply = (theme) => {
  root().dataset.theme = theme;
  document.querySelector('meta[name="theme-color"]')?.setAttribute(
    "content",
    theme === "dark" ? "#0f0d0b" : "#f2eee7",
  );
};

// Every component reading the theme watches <html data-theme>, so the navbar
// button and the hero's light bulb stay in step whichever one flips it.
const subscribe = (onChange) => {
  const observer = new MutationObserver(onChange);
  observer.observe(root(), { attributes: true, attributeFilter: ["data-theme"] });
  return () => observer.disconnect();
};

const getTheme = () => root().dataset.theme || "light";

export const toggleTheme = () => {
  const next = getTheme() === "dark" ? "light" : "dark";
  apply(next);
  try {
    localStorage.setItem("theme", next);
  } catch {
    // storage blocked: the choice lasts for this visit
  }
};

// The theme lives on <html data-theme>; index.html sets it before the first
// paint. Until the visitor picks one it follows the OS setting.
const useTheme = () => {
  const theme = useSyncExternalStore(subscribe, getTheme);

  useEffect(() => {
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = (event) => {
      let saved = null;
      try {
        saved = localStorage.getItem("theme");
      } catch {
        // storage blocked: just follow the OS
      }
      if (!saved) apply(event.matches ? "dark" : "light");
    };
    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, []);

  return [theme, toggleTheme];
};

export default useTheme;
