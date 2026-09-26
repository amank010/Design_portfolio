<div align="center">

# Aman Kumar: Video Editor & Motion Designer

A portfolio styled as a detective's case board: a torn-paper sheet pinned to a concrete wall, red string between pinned scraps, and a hanging 3D bulb that lights the page when you switch to dark mode. Below it: autoplaying short-form reels, long-form YouTube edits, a software toolkit and a career timeline you scrub by scrolling. Every section is rough paper, tape and cast shadows.

**[Live site](https://portfolio-aman-xi.vercel.app/)**

<img width="720" src="ss/hero.jpg" alt="Hero: a case board on a concrete wall, light theme">
<img width="720" src="ss/hero-dark.jpg" alt="Hero in dark theme, lit by the hanging bulb">

</div>

> **Note**: The 3D model of Delhi Technological University (DTU) used here is an original creation by me (Aman Kumar) and is **not open for reuse or redistribution**. The reels and videos belong to the brands and creators they were made for.
>
> The hanging bulb model and the wall texture come from [Poly Haven](https://polyhaven.com), and the paper and rope textures from [ambientCG](https://ambientcg.com). All are CC0 (free to use).

---

## Features

- **The case board (hero)**: a torn sheet on a rough wall with tape, pushpins, polaroids, a stamp, red-pen notes and red strings from the photo to every pinned scrap. Each scrap links to its section, swings on its pin when you hover, and flutters as you scroll away. Foreground rope drifts past at a different speed from the wall. Every shadow falls away from the bulb, so they're short by day and long and sharp at night.
- **Double-click zoom**: double-click (or double-tap) anywhere on the board to zoom into that spot; do it again, press Esc or scroll to zoom back out.
- **The bulb and the theme**: a realistic hanging bulb with a brass pull chain. Click it, or the navbar button, to switch between light and dark. It flickers on, lights the wall and laptop, swings when you brush it or scroll, and hangs switched off in light mode. The choice is saved, and follows the device setting until you pick.
- **Short-form**: 9:16 reels that autoplay muted while on screen. Hovering shows a Sound button; once sound is on, hovering any reel plays its audio (one at a time). Click to open the full video. Filter by client.
- **Long-form**: YouTube edits as muted looping previews, opened in a full-size player.
- **Toolkit**: a 3D keyboard of 12 software keycaps (Premiere Pro, After Effects, Photoshop, Illustrator, Blender, Figma, Canva, Three.js, React, Next.js, Tailwind, GSAP).
- **Journey**: a Premiere-style timeline with tracks and clips. The playhead moves as you scroll and the details change clip by clip.
- **Paper style throughout**: cards have rough torn edges, tape and left-falling shadows; the navbar and bottom bar are taped paper strips; a bottom transport bar shows timecode, section markers and a sound toggle (press `M`); the URL `#hash` follows the section you're in.
- **Responsive and accessible**: works down to 320px wide (the board has a separate portrait layout), respects reduced-motion settings, keyboard-friendly.

<div align="center">
<img width="480" src="ss/work.jpg" alt="Short-form reels, autoplaying">
<img width="480" src="ss/work-dark.jpg" alt="Reels in dark theme">
<img width="480" src="ss/toolkit.jpg" alt="Toolkit keyboard">
<img width="480" src="ss/journey.jpg" alt="Career timeline">
</div>

---

## Tech stack

- **React 19** with **Vite**
- **Tailwind CSS 4**
- **Three.js** via `@react-three/fiber` and `@react-three/drei` for the bulb, the laptop and the DTU scene
- **GSAP** (`ScrollTrigger`) for scroll-driven motion
- **Deployment**: [Vercel](https://vercel.com)

---

## Run it locally

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # production build in dist/
npm run preview    # serve the production build
```

---

## Editing the content

Almost everything you'd change lives in `src/data/`:

| File | What it controls |
|---|---|
| `src/data/work.js` | Short-form reels, long-form YouTube videos, client list, stats, contact details and social links |
| `src/data/toolkit.js` | The keyboard tools and the skill groups beside it |
| `src/data/journey.js` | The career timeline clips |

### Adding a short-form reel

1. Export the reel as H.264 MP4, about 720×1280 at 3–5 Mbps.
2. Drop it in `src/assets/videos/short/`, for example `nike-launch.mp4`. It appears in the grid automatically.
3. Optionally add an entry to `shortForm` in `src/data/work.js` with the same `id` to set its client, title, date and Instagram link.
4. Optional extras: a poster image (`nike-launch.jpg`) and a lighter grid copy (`nike-launch.preview.mp4`, about 480×854 at 800 kbps).

See [`src/assets/videos/README.md`](src/assets/videos/README.md) for naming rules and export settings. Keep each file under 100 MB, since GitHub rejects larger ones. For full-length videos, use YouTube instead.

### Adding a long-form video

Add its YouTube id to `longForm` in `src/data/work.js`.

### Changing the look

- Colors, the dark theme and shared styles are in `src/index.css` (the `@theme` block and the `[data-theme="dark"]` block). Shadow strength and length are the `--shadow-*` variables there.
- **The board's text and layout**: the copy is in `src/components/hero/CaseBoard.jsx`; every position, size and rotation is in `src/components/hero/layout.js`, separately for desktop and phone. `lamp` is where the bulb hangs, which sets the shadow direction.
- **The bulb**: `src/components/Bulb.jsx` (size, flicker, glow); its model is in `public/models/lightbulb_01/`.
- The Premiere timeline behind the short-form heading is drawn by `src/components/TimelineBackdrop.jsx`. Its strength is the `opacity-75` class in `src/sections/ShortForm.jsx`.

---

## Project structure

```
src/
  sections/     Hero, Intro, ShortForm, LongForm, Toolkit, Journey, Design, About, Navbar, Footer
  components/   hero/ (case board, strings, torn-paper shapes), Bulb, video tiles and player (media/),
                keycap logos, transport bar, icons
  data/         Editable content (work, toolkit, journey)
  hooks/        useInView, useTheme
  lib/          Scroll and observer helpers, timecode formatting, video file lookup
  assets/videos/  Reels dropped in here are picked up automatically
public/
  models/       3D models (laptop, DTU campus, light bulb)
  hero/         Wall, paper and rope textures and the pushpin, used by the hero
  assets/       Images and the laptop's screen video
```

---

## Previous versions

The earlier design is preserved on the [`v1`](../../tree/v1) branch. The current site is on `main` and `v2`.
