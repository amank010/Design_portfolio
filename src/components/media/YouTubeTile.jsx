import { useCallback, useEffect, useRef, useState } from "react";

import { youtubePoster } from "../../lib/media";
import { usePreviewState, useTilt } from "./previewHooks";
import { useSound } from "./soundContext";
import TileControls, { TileBadges } from "./TileControls";

const ORIGIN = "https://www.youtube-nocookie.com";

// A muted, looping YouTube preview driven through the player's postMessage API.
// The iframe ignores the pointer so YouTube's own overlay never shows; our
// controls sit on top instead.
const YouTubeTile = ({ item, accent, badge, meta }) => {
  const { register, hoverStart, mute, toggleTile, audibleId, openLightbox, lightbox, reducedMotion } =
    useSound();
  const tileRef = useRef(null);
  const frameRef = useRef(null);
  const shouldPlayRef = useRef(false);
  const [hovered, setHovered] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [poster, setPoster] = useState(() => youtubePoster(item.youtube));
  const { visible } = usePreviewState(tileRef);
  // YouTube's player is heavy, so it only loads once the tile is on screen
  // (the thumbnail shows until then); after that it stays mounted.
  const [near, setNear] = useState(false);
  if (visible && !near) setNear(true);
  const tilt = useTilt(4);
  const audible = audibleId === item.id;
  const shouldPlay = near && !lightbox && (reducedMotion ? hovered : visible);

  const send = useCallback((func, args = []) => {
    frameRef.current?.contentWindow?.postMessage(
      JSON.stringify({ event: "command", func, args }),
      ORIGIN,
    );
  }, []);

  useEffect(() => {
    shouldPlayRef.current = shouldPlay;
    if (near) send(shouldPlay ? "playVideo" : "pauseVideo");
  }, [near, shouldPlay, send]);

  // The player only reports its state after we say we're listening.
  useEffect(() => {
    if (!near) return undefined;

    let tries = 0;
    const hello = setInterval(() => {
      frameRef.current?.contentWindow?.postMessage(
        JSON.stringify({ event: "listening", id: item.id, channel: "widget" }),
        ORIGIN,
      );
      tries += 1;
      if (tries > 40) clearInterval(hello);
    }, 250);

    const onMessage = (event) => {
      if (event.origin !== ORIGIN || event.source !== frameRef.current?.contentWindow) return;
      let data;
      try {
        data = JSON.parse(event.data);
      } catch {
        return;
      }
      if (data.event === "initialDelivery" || data.event === "onReady") {
        clearInterval(hello);
        send(shouldPlayRef.current ? "playVideo" : "pauseVideo");
      }
      const state = data.event === "onStateChange" ? data.info : data.info?.playerState;
      if (state === 1) setPlaying(true);
    };

    window.addEventListener("message", onMessage);
    return () => {
      clearInterval(hello);
      window.removeEventListener("message", onMessage);
    };
  }, [near, item.id, send]);

  useEffect(
    () =>
      register(item.id, {
        setMuted(muted) {
          if (muted) {
            send("mute");
          } else {
            send("unMute");
            send("setVolume", [100]);
            send("playVideo");
          }
        },
      }),
    [item.id, register, send],
  );

  useEffect(() => {
    if (!visible) mute(item.id);
  }, [visible, item.id, mute]);

  const src = `${ORIGIN}/embed/${item.youtube}?${new URLSearchParams({
    autoplay: "1",
    mute: "1",
    controls: "0",
    loop: "1",
    playlist: item.youtube,
    playsinline: "1",
    rel: "0",
    iv_load_policy: "3",
    disablekb: "1",
    fs: "0",
    enablejsapi: "1",
    origin: window.location.origin,
    start: String(item.start ?? 0),
  })}`;

  return (
    <div
      ref={tileRef}
      className={`tile ${audible ? "is-audible" : ""}`}
      style={{ aspectRatio: "16 / 9", "--bar": accent }}
      onPointerMove={tilt.onPointerMove}
      onPointerEnter={(event) => {
        if (event.pointerType !== "mouse") return;
        setHovered(true);
        hoverStart(item.id);
      }}
      onPointerLeave={(event) => {
        tilt.onPointerLeave(event);
        if (event.pointerType !== "mouse") return;
        setHovered(false);
        mute(item.id);
      }}
    >
      {near && (
        <iframe
          ref={frameRef}
          src={src}
          title={item.title}
          allow="autoplay; encrypted-media; picture-in-picture"
          tabIndex={-1}
          className="tile-media pointer-events-none"
          style={{ border: 0 }}
        />
      )}
      <img
        src={poster}
        alt=""
        onError={() => setPoster(youtubePoster(item.youtube, "hqdefault"))}
        className={`tile-media transition-opacity duration-700 ${playing ? "opacity-0" : ""}`}
        loading="lazy"
        decoding="async"
      />
      <button
        type="button"
        className="absolute inset-0 z-[3]"
        onClick={() => openLightbox(item)}
        aria-label={`Watch ${item.title}`}
      />
      <span className="tile-gloss" />
      <TileBadges left={badge} right={meta} color={accent} />
      <TileControls audible={audible} onSound={() => toggleTile(item.id)} />
    </div>
  );
};

export default YouTubeTile;
