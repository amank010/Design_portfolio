import { useEffect, useRef, useState } from "react";

import { PlayIcon } from "../Icons";
import { usePreviewState, useTilt } from "./previewHooks";
import { useSound } from "./soundContext";
import TileControls, { TileBadges } from "./TileControls";

// A local video file: loads when it gets close, plays muted while on screen,
// opens the full video on click.
const VideoTile = ({ item, aspect, accent, badge, meta }) => {
  const { register, hoverStart, mute, toggleTile, audibleId, openLightbox, lightbox, reducedMotion } =
    useSound();
  const tileRef = useRef(null);
  const videoRef = useRef(null);
  const barRef = useRef(null);
  const [hovered, setHovered] = useState(false);
  const { near, visible } = usePreviewState(tileRef);
  const tilt = useTilt();
  const audible = audibleId === item.id;
  const shouldPlay = near && !lightbox && (reducedMotion ? hovered : visible);

  useEffect(
    () =>
      register(item.id, {
        setMuted(muted) {
          const video = videoRef.current;
          if (!video) return;
          video.muted = muted;
          if (!muted) {
            video.play().catch(() => {
              video.muted = true;
            });
          }
        },
      }),
    [item.id, register],
  );

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (shouldPlay) video.play().catch(() => {});
    else video.pause();
  }, [shouldPlay, near]);

  useEffect(() => {
    if (!visible) mute(item.id);
  }, [visible, item.id, mute]);

  // The progress bar runs as a compositor animation kept in step with the
  // video, rather than restyling it on every timeupdate (a main-thread style
  // recalc per update, times every card on screen).
  const barAnimation = useRef(null);
  const syncBar = (event) => {
    const video = event.currentTarget;
    const bar = barRef.current;
    if (!bar || !video.duration) return;
    if (!barAnimation.current) {
      barAnimation.current = bar.animate(
        [{ transform: "scaleX(0)" }, { transform: "scaleX(1)" }],
        { duration: video.duration * 1000, iterations: Infinity, easing: "linear" },
      );
    }
    barAnimation.current.currentTime = video.currentTime * 1000;
    if (video.paused) barAnimation.current.pause();
    else barAnimation.current.play();
  };

  return (
    <div
      ref={tileRef}
      className={`tile ${audible ? "is-audible" : ""}`}
      style={{ aspectRatio: aspect, "--bar": accent }}
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
      {/* shows until the video's first frame covers it */}
      <span className="absolute inset-0 flex items-center justify-center" aria-hidden="true">
        <span className="flex h-12 w-12 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white/60">
          <PlayIcon className="ml-0.5 h-4 w-4" />
        </span>
      </span>
      {item.poster && (
        <img src={item.poster} alt="" className="tile-media" loading="lazy" decoding="async" />
      )}
      {near && (
        <video
          ref={videoRef}
          className="tile-media"
          // the lighter preview copy if there is one; without a poster, #t=0.1
          // makes Safari show the first frame
          src={item.poster ? (item.preview ?? item.src) : `${item.preview ?? item.src}#t=0.1`}
          poster={item.poster}
          muted
          loop
          playsInline
          preload="metadata"
          onLoadedMetadata={syncBar}
          onPlaying={syncBar}
          onPause={syncBar}
          onSeeked={syncBar}
        />
      )}
      <button
        type="button"
        className="absolute inset-0 z-[3]"
        onClick={() => openLightbox(item)}
        aria-label={`Watch ${item.title}${item.client ? ` for ${item.client}` : ""}`}
      />
      <span className="tile-gloss" />
      <TileBadges left={badge} right={meta} color={accent} />
      <TileControls audible={audible} onSound={() => toggleTile(item.id)} />
      <span className="tile-progress">
        <span ref={barRef} />
      </span>
    </div>
  );
};

export default VideoTile;
