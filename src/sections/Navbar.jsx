import { useEffect, useState } from "react";

import { ArrowUpRightIcon, CloseIcon, MenuIcon, MoonIcon, SunIcon } from "../components/Icons";
import { RESUME_URL } from "../data/work";
import useTheme from "../hooks/useTheme";
import { observe } from "../lib/observe";

const links = [
  { id: "work", label: "Work" },
  { id: "toolkit", label: "Toolkit" },
  { id: "journey", label: "Journey" },
  { id: "about", label: "About" },
];

// which navbar link a section belongs to
const navFor = {
  "short-form": "work",
  "long-form": "work",
  toolkit: "toolkit",
  journey: "journey",
  about: "about",
};

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(null);
  const [theme, toggleTheme] = useTheme();

  // Highlight the link for the section in the middle of the screen, and keep
  // the URL's #hash in step with it (replaceState, so scrolling doesn't fill
  // the back button's history).
  useEffect(() => {
    const stops = [...document.querySelectorAll("main section[id]")].map((section) =>
      observe(
        section,
        (entry) => {
          if (!entry.isIntersecting) return;
          const id = section.id;
          setActive(navFor[id] ?? null);
          const hash = id === "top" ? "" : `#${id}`;
          if (window.location.hash !== hash) {
            window.history.replaceState(null, "", `${window.location.pathname}${window.location.search}${hash}`);
          }
        },
        { rootMargin: "-45% 0px -50% 0px" },
      ),
    );
    return () => stops.forEach((stop) => stop());
  }, []);

  const close = () => setOpen(false);

  return (
    <header className="fixed inset-x-0 top-3 z-50 px-3 sm:top-4 sm:px-4">
      <nav className="glass-dark mx-auto flex h-14 max-w-5xl items-center gap-2 rounded-full pl-2 pr-2 text-white">
        <a href="#top" onClick={close} className="flex items-center gap-2.5 rounded-full py-1 pl-1 pr-3">
          <img src="/assets/face.jpeg" alt="" className="h-9 w-9 rounded-full object-cover" />
          <span className="whitespace-nowrap font-medium tracking-tight max-[359px]:hidden">Aman Kumar</span>
        </a>

        <ul className="mx-auto hidden items-center gap-1 md:flex">
          {links.map((link) => (
            <li key={link.id}>
              <a
                href={`#${link.id}`}
                aria-current={active === link.id ? "true" : undefined}
                className={`rounded-full px-4 py-2 text-sm transition-colors ${
                  active === link.id
                    ? "bg-white/12 text-white"
                    : "text-white/60 hover:text-white"
                }`}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="ml-auto flex items-center gap-1.5 md:ml-0">
          <a
            href={RESUME_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden items-center gap-1 rounded-full px-3 py-2 text-sm text-white/70 transition-colors hover:text-white sm:flex"
          >
            Resume
            <ArrowUpRightIcon className="h-3.5 w-3.5" />
          </a>
          <button
            type="button"
            onClick={toggleTheme}
            className="icon-btn h-10 w-10 text-white/75 hover:bg-white/10 hover:text-white"
            aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
            title={theme === "dark" ? "Light mode" : "Dark mode"}
          >
            {theme === "dark" ? <SunIcon className="h-[18px] w-[18px]" /> : <MoonIcon className="h-[18px] w-[18px]" />}
          </button>
          <a href="#contact" onClick={close} className="btn btn-accent btn-sm h-10">
            Let's talk
          </a>
          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            className="icon-btn h-10 w-10 text-white hover:bg-white/10 md:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
          >
            {open ? <CloseIcon className="h-5 w-5" /> : <MenuIcon className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      <div
        id="mobile-menu"
        className={`glass-dark mx-auto mt-2 max-w-5xl overflow-hidden rounded-3xl text-white transition-[max-height,opacity] duration-500 md:hidden ${
          open ? "max-h-96 opacity-100" : "pointer-events-none max-h-0 opacity-0"
        }`}
      >
        <ul className="flex flex-col p-3">
          {links.map((link) => (
            <li key={link.id}>
              <a
                href={`#${link.id}`}
                onClick={close}
                className="block rounded-2xl px-4 py-3 text-lg text-white/85 hover:bg-white/10"
              >
                {link.label}
              </a>
            </li>
          ))}
          <li>
            <a
              href={RESUME_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={close}
              className="flex items-center gap-1.5 rounded-2xl px-4 py-3 text-lg text-white/85 hover:bg-white/10"
            >
              Resume
              <ArrowUpRightIcon className="h-4 w-4" />
            </a>
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Navbar;
