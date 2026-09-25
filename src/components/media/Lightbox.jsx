import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

import { formatMonth } from "../../lib/timecode";
import { ArrowUpRightIcon, CloseIcon } from "../Icons";
import { useSound } from "./soundContext";

// Theatre view: the full video with sound and native controls.
const Lightbox = () => {
  const { lightbox: item, closeLightbox } = useSound();
  const closeRef = useRef(null);

  useEffect(() => {
    if (!item) return undefined;

    const previousFocus = document.activeElement;
    closeRef.current?.focus();

    const onKey = (event) => {
      if (event.key === "Escape") closeLightbox();
    };
    window.addEventListener("keydown", onKey);

    const root = document.documentElement;
    const overflow = root.style.overflow;
    root.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", onKey);
      root.style.overflow = overflow;
      previousFocus?.focus?.({ preventScroll: true });
    };
  }, [item, closeLightbox]);

  if (!item) return null;

  const wide = item.kind === "long";
  const external = item.youtube ? `https://www.youtube.com/watch?v=${item.youtube}` : item.href;
  const meta = [item.client, item.role, formatMonth(item.date)].filter(Boolean).join(" · ");

  return createPortal(
    <div
      className="lightbox"
      role="dialog"
      aria-modal="true"
      aria-label={item.title}
      onClick={closeLightbox}
    >
      <div
        className={`lightbox-frame ${wide ? "is-wide" : "is-vertical"}`}
        onClick={(event) => event.stopPropagation()}
      >
        {item.youtube ? (
          <iframe
            className="absolute inset-0 h-full w-full"
            src={`https://www.youtube-nocookie.com/embed/${item.youtube}?autoplay=1&rel=0&playsinline=1`}
            title={item.title}
            allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
            allowFullScreen
            style={{ border: 0 }}
          />
        ) : (
          <video
            className="absolute inset-0 h-full w-full object-contain"
            src={item.src}
            poster={item.poster}
            controls
            autoPlay
            playsInline
          />
        )}
      </div>

      <div
        className="flex max-w-[92vw] flex-wrap items-center justify-center gap-x-5 gap-y-3 text-center text-white"
        onClick={(event) => event.stopPropagation()}
      >
        <div>
          <p className="font-medium">{item.title}</p>
          {meta && <p className="eyebrow mt-1.5 text-white/50">{meta}</p>}
        </div>
        {external && (
          <a href={external} target="_blank" rel="noopener noreferrer" className="btn btn-dark btn-sm">
            Open on {item.youtube ? "YouTube" : "Instagram"}
            <ArrowUpRightIcon className="h-3.5 w-3.5" />
          </a>
        )}
      </div>

      <button
        ref={closeRef}
        type="button"
        onClick={closeLightbox}
        className="icon-btn absolute right-4 top-4 bg-white/10 text-white hover:bg-white/20"
        aria-label="Close"
      >
        <CloseIcon className="h-5 w-5" />
      </button>
    </div>,
    document.body,
  );
};

export default Lightbox;
