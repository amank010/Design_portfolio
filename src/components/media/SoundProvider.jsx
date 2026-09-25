import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { SoundContext, audioAllowed, prefersReducedMotion } from "./soundContext";

// Coordinates every video preview on the page. They all play muted and at most
// one is audible at a time. Clicking a speaker (or the transport toggle, or
// pressing M) turns sound on; after that, hovering a video plays its audio.
const SoundProvider = ({ children }) => {
  const players = useRef(new Map());
  const audibleRef = useRef(null);
  const soundOnRef = useRef(false);
  const [soundOn, setSoundOnState] = useState(false);
  const [audibleId, setAudibleId] = useState(null);
  const [lightbox, setLightbox] = useState(null);
  const [reducedMotion] = useState(prefersReducedMotion);

  const register = useCallback((id, player) => {
    players.current.set(id, player);
    return () => {
      players.current.delete(id);
      if (audibleRef.current === id) {
        audibleRef.current = null;
        setAudibleId(null);
      }
    };
  }, []);

  const makeAudible = useCallback((id) => {
    players.current.forEach((player, key) => player.setMuted(key !== id));
    audibleRef.current = id;
    setAudibleId(id);
  }, []);

  const muteAll = useCallback(() => {
    players.current.forEach((player) => player.setMuted(true));
    audibleRef.current = null;
    setAudibleId(null);
  }, []);

  // Mutes a tile if it's the audible one (hover out, scrolled away).
  const mute = useCallback((id) => {
    if (audibleRef.current !== id) return;
    players.current.get(id)?.setMuted(true);
    audibleRef.current = null;
    setAudibleId(null);
  }, []);

  const setSoundOn = useCallback(
    (on) => {
      soundOnRef.current = on;
      setSoundOnState(on);
      if (!on) muteAll();
    },
    [muteAll],
  );

  const hoverStart = useCallback(
    (id) => {
      if (soundOnRef.current && audioAllowed()) makeAudible(id);
    },
    [makeAudible],
  );

  // A tile's speaker button. It's a click, so audio is always allowed here.
  const toggleTile = useCallback(
    (id) => {
      if (audibleRef.current === id) {
        setSoundOn(false);
        return;
      }
      soundOnRef.current = true;
      setSoundOnState(true);
      makeAudible(id);
    },
    [makeAudible, setSoundOn],
  );

  const openLightbox = useCallback(
    (item) => {
      muteAll();
      setLightbox(item);
    },
    [muteAll],
  );
  const closeLightbox = useCallback(() => setLightbox(null), []);

  useEffect(() => {
    const onKey = (event) => {
      if (event.key.toLowerCase() !== "m" || event.metaKey || event.ctrlKey || event.altKey) {
        return;
      }
      if (event.target.closest?.("input, textarea, [contenteditable]")) return;
      setSoundOn(!soundOnRef.current);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [setSoundOn]);

  const value = useMemo(
    () => ({
      soundOn,
      setSoundOn,
      audibleId,
      register,
      hoverStart,
      mute,
      toggleTile,
      lightbox,
      openLightbox,
      closeLightbox,
      reducedMotion,
    }),
    [
      soundOn,
      setSoundOn,
      audibleId,
      register,
      hoverStart,
      mute,
      toggleTile,
      lightbox,
      openLightbox,
      closeLightbox,
      reducedMotion,
    ],
  );

  return <SoundContext.Provider value={value}>{children}</SoundContext.Provider>;
};

export default SoundProvider;
