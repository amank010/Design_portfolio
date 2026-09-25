import { createContext, useContext } from "react";

export const SoundContext = createContext(null);

export const useSound = () => useContext(SoundContext);

// Browsers only allow audio once the visitor has clicked, tapped or typed on
// the page; hovering doesn't count. Unmuting before that pauses the video.
export const audioAllowed = () => navigator.userActivation?.hasBeenActive ?? true;

export const prefersReducedMotion = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;
