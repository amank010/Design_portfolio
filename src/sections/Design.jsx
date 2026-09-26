import { ArrowUpRightIcon } from "../components/Icons";
import Reveal from "../components/Reveal";
import SectionHeader from "../components/SectionHeader";
import { ToolLogo } from "../components/ToolLogo";

const results = ["Mobile bounce rate −20%", "Mobile conversions +10%"];
const stack = ["figma", "nextjs", "tailwind", "blender", "threejs"];

const Design = () => (
  <section id="design" data-marker="UI/UX" className="container-x py-24 sm:py-32">
    <SectionHeader
      track="V3"
      color="var(--color-track-pink)"
      label="Beyond video · UI/UX"
      title={
        <>
          Interfaces & <em>3D</em>.
        </>
      }
      description="When I'm not in a timeline, I design interfaces in Figma and model in Blender."
    />

    <Reveal className="paper-card mt-14 grid gap-2 p-3 lg:grid-cols-[1.35fr_1fr]">
      <a
        href="https://d-tech-red.vercel.app"
        target="_blank"
        rel="noopener noreferrer"
        className="group overflow-hidden rounded-[3px] border border-ink/10 bg-surface"
        aria-label="Open the live D.Tech site"
      >
        <div className="flex h-9 items-center gap-1.5 border-b border-ink/10 px-4">
          <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
          <span className="ml-3 truncate font-mono text-[11px] text-ink/45">d-tech-red.vercel.app</span>
        </div>
        <img
          src="/assets/dtech1.png"
          alt="D.Tech website home page"
          className="aspect-[16/9] w-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.02]"
          loading="lazy"
          decoding="async"
        />
      </a>

      <div className="flex flex-col gap-6 p-5 sm:p-8">
        <p className="eyebrow text-ink/50">UI/UX Designer · Jul 2025</p>
        <h3 className="text-4xl font-semibold tracking-tight">D.Tech</h3>
        <p className="text-lg leading-relaxed text-ink/70">
          Designed an end-to-end responsive interface in Figma, built it with Next.js and Tailwind,
          and modelled a 3D element in Blender that runs in the page with Three.js and GSAP.
        </p>
        <ul className="flex flex-wrap gap-2">
          {results.map((result) => (
            <li
              key={result}
              className="rounded-full border border-ink/10 bg-surface/70 px-3.5 py-1.5 text-sm font-medium"
            >
              {result}
            </li>
          ))}
        </ul>
        <div className="flex gap-2">
          {stack.map((id) => (
            <ToolLogo key={id} id={id} className="h-9 w-9 rounded-xl" />
          ))}
        </div>
        <div className="mt-auto flex flex-wrap gap-3">
          <a
            href="https://www.figma.com/design/pIWjUKHhgclGdKyPqmQHEC/D.Tech-Redesign?node-id=0-1&t=oec8HKxzPupUy6Ls-1"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-light btn-sm"
          >
            Figma file
            <ArrowUpRightIcon className="h-3.5 w-3.5" />
          </a>
          <a
            href="https://d-tech-red.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-ink btn-sm"
          >
            Live site
            <ArrowUpRightIcon className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>
    </Reveal>
  </section>
);

export default Design;
