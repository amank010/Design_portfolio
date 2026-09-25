import Reveal from "./Reveal";

// Track chip + label, big title, optional description; `children` sits on the
// right on wide screens (filters, links).
const SectionHeader = ({ track, color, label, title, description, dark = false, children }) => (
  <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
    <div className="max-w-3xl">
      <Reveal className="flex items-center gap-3">
        <span className="track-chip" style={{ "--chip": color }}>
          {track}
        </span>
        <span className={`eyebrow ${dark ? "text-white/55" : "text-ink/55"}`}>{label}</span>
      </Reveal>
      <Reveal as="h2" delay={80} className="section-title mt-5">
        {title}
      </Reveal>
      {description && (
        <Reveal
          as="p"
          delay={160}
          className={`mt-5 max-w-xl text-lg leading-relaxed ${dark ? "text-white/60" : "text-ink/60"}`}
        >
          {description}
        </Reveal>
      )}
    </div>
    {children && <Reveal delay={200}>{children}</Reveal>}
  </div>
);

export default SectionHeader;
