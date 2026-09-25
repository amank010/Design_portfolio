import { useRef, useState } from "react";

import Reveal from "../components/Reveal";
import SectionHeader from "../components/SectionHeader";
import { ToolLogo } from "../components/ToolLogo";
import { capabilities, toolById, tools } from "../data/toolkit";

const Toolkit = () => {
  const [activeId, setActiveId] = useState(tools[0].id);
  const plateRef = useRef(null);
  const active = toolById[activeId];

  // the keyboard leans toward the pointer
  const onPointerMove = (event) => {
    if (event.pointerType !== "mouse") return;
    const { left, top, width, height } = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - left) / width - 0.5;
    const y = (event.clientY - top) / height - 0.5;
    plateRef.current.style.setProperty("--ry", `${x * 10}deg`);
    plateRef.current.style.setProperty("--rx", `${22 - y * 10}deg`);
  };

  const onPointerLeave = () => {
    plateRef.current.style.removeProperty("--ry");
    plateRef.current.style.removeProperty("--rx");
  };

  return (
    <section id="toolkit" data-marker="Toolkit" className="relative overflow-hidden py-24 sm:py-32">
      <div className="dot-grid absolute inset-0 -z-10 opacity-70" />

      <div className="container-x">
        <SectionHeader
          track="FX"
          color="var(--color-track-amber)"
          label="Toolkit"
          title={
            <>
              The <em>toolkit</em>.
            </>
          }
          description="The software behind every cut, from the first assembly to the final export. Hover a key."
        />

        <div className="mt-16 grid items-center gap-14 lg:grid-cols-[1.1fr_1fr]">
          <Reveal className="keyboard" onPointerMove={onPointerMove} onPointerLeave={onPointerLeave}>
            <div
              ref={plateRef}
              className="keyboard-plate grid grid-cols-4 gap-x-3 gap-y-4 p-4 sm:gap-x-5 sm:gap-y-6 sm:p-7"
            >
              {tools.map((tool, index) => (
                <div key={tool.id} className="flex flex-col items-center gap-2.5">
                  <button
                    type="button"
                    className={`key ${activeId === tool.id ? "is-active" : ""}`}
                    style={{ "--face": tool.face, "--kd": `${index * 45}ms` }}
                    onPointerEnter={() => setActiveId(tool.id)}
                    onFocus={() => setActiveId(tool.id)}
                    onClick={() => setActiveId(tool.id)}
                    aria-pressed={activeId === tool.id}
                    aria-label={tool.name}
                  >
                    <span className="key-base" />
                    <span className="key-cap">
                      <ToolLogo id={tool.id} className="h-full w-full" />
                    </span>
                  </button>
                  <span className="text-center font-mono text-[9px] uppercase leading-tight tracking-[0.1em] text-ink/55 sm:text-[10px]">
                    {tool.name}
                  </span>
                </div>
              ))}
            </div>
          </Reveal>

          <div className="flex flex-col gap-10">
            <Reveal className="rounded-[28px] bg-night p-6 text-white ring-1 ring-white/5 shadow-[0_30px_60px_-30px_rgb(12_12_16/0.6)] sm:p-8">
              <div className="eyebrow flex items-center justify-between text-white/45">
                <span className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-track-amber" />
                  Selected tool
                </span>
                <span className="tabular-nums">
                  {String(tools.indexOf(active) + 1).padStart(2, "0")} / {tools.length}
                </span>
              </div>
              <div key={active.id} className="[animation:monitor-in_0.4s_ease]">
                <div className="mt-6 flex items-center gap-5">
                  <ToolLogo id={active.id} className="h-16 w-16 shrink-0 rounded-2xl" />
                  <div>
                    <p className="text-3xl font-semibold tracking-tight">{active.name}</p>
                    <p className="eyebrow mt-2 text-white/45">{active.group}</p>
                  </div>
                </div>
                <p className="mt-6 text-lg leading-relaxed text-white/70">{active.use}</p>
              </div>
            </Reveal>

            <Reveal delay={120} className="grid gap-6 sm:grid-cols-3 sm:gap-8">
              {capabilities.map((group) => (
                <div key={group.title}>
                  <p className="flex items-center gap-2 font-medium">
                    <span className="h-2 w-2 rounded-full" style={{ background: group.color }} />
                    {group.title}
                  </p>
                  {/* chips on phones (a wrapped row), a plain list from sm up */}
                  <ul className="mt-3 flex flex-wrap gap-2 text-[15px] text-ink/60 sm:block sm:space-y-1.5">
                    {group.items.map((item) => (
                      <li
                        key={item}
                        className="max-sm:rounded-full max-sm:border max-sm:border-ink/10 max-sm:bg-surface/60 max-sm:px-3 max-sm:py-1 max-sm:text-sm"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Toolkit;
