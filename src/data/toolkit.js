// Tools listed on the resume. `id` picks the logo in components/ToolLogo.jsx;
// `face` is the keycap colour (matches the logo's own background).
export const tools = [
  {
    id: "premiere",
    face: "#00005B",
    name: "Premiere Pro",
    group: "Edit",
    use: "Editing, pacing, captions, colour grading and audio sync",
  },
  {
    id: "aftereffects",
    face: "#00005B",
    name: "After Effects",
    group: "Motion",
    use: "Motion graphics, kinetic type, VFX and transitions",
  },
  {
    id: "photoshop",
    face: "#001E36",
    name: "Photoshop",
    group: "Design",
    use: "Thumbnails, compositing and retouching",
  },
  {
    id: "illustrator",
    face: "#330000",
    name: "Illustrator",
    group: "Design",
    use: "Vector assets, icons and brand elements for motion",
  },
  {
    id: "blender",
    face: "#F7F7F9",
    name: "Blender",
    group: "3D",
    use: "3D models, product shots and motion for ads",
  },
  {
    id: "figma",
    face: "#1E1E1E",
    name: "Figma",
    group: "Design",
    use: "UI/UX, prototypes and storyboards",
  },
  {
    id: "canva",
    face: "#FFFFFF",
    name: "Canva",
    group: "Design",
    use: "Fast social creatives and templates",
  },
  {
    id: "threejs",
    face: "#F7F7F9",
    name: "Three.js",
    group: "Web",
    use: "Interactive 3D on the web",
  },
  {
    id: "react",
    face: "#20232A",
    name: "React",
    group: "Web",
    use: "Interfaces, including this site",
  },
  {
    id: "nextjs",
    face: "#0A0A0A",
    name: "Next.js",
    group: "Web",
    use: "Production web apps",
  },
  {
    id: "tailwind",
    face: "#0B1120",
    name: "Tailwind CSS",
    group: "Web",
    use: "Fast, consistent styling",
  },
  {
    id: "gsap",
    face: "#0E100F",
    name: "GSAP",
    group: "Web",
    use: "Scroll and motion on the web",
  },
];

export const capabilities = [
  {
    title: "Video editing",
    color: "#8b7cf6",
    items: [
      "Short-form for social",
      "Long-form & podcasts",
      "Colour grading",
      "Audio sync",
      "Transitions & VFX",
    ],
  },
  {
    title: "Motion design",
    color: "#4d7cff",
    items: [
      "Animation principles",
      "Storyboarding",
      "Timing & spacing",
      "Keyframe animation",
    ],
  },
  {
    title: "Design & 3D",
    color: "#f472b6",
    items: ["UI/UX in Figma", "3D in Blender", "Three.js & GSAP"],
  },
];

export const toolById = Object.fromEntries(tools.map((tool) => [tool.id, tool]));
