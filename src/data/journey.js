// The career timeline. Dates are "YYYY-MM"; `end` is inclusive. `label` is
// the short name shown on the clip itself.
// Growth Rocket, D.Tech and DTU dates come from the resume. The others are
// when the linked posts and videos went live, so treat them as approximate.

export const range = { start: "2023-01", end: "2025-12" };

export const tracks = [
  { id: "V3", label: "Design", color: "#f472b6" },
  { id: "V2", label: "Creators", color: "#8b7cf6" },
  { id: "V1", label: "Brands", color: "#4d7cff" },
  { id: "A1", label: "Education", color: "#22c3a6", audio: true },
];

export const journey = [
  {
    track: "A1",
    start: "2022-08",
    end: "2026-05",
    title: "Delhi Technological University",
    label: "DTU · B.Tech CSE",
    role: "B.Tech, Computer Engineering",
    when: "2022 – 2026",
    text: "Graduated in Computer Engineering, editing, animating and designing alongside the degree.",
    tools: [],
  },
  {
    track: "V2",
    start: "2023-03",
    end: "2023-04",
    title: "Yash Garg",
    label: "Yash Garg",
    role: "Video Editor · Short-form",
    when: "Mar – Apr 2023",
    text: "Short-form case studies and educational videos that collectively crossed 1M+ views.",
    tools: ["premiere", "aftereffects"],
  },
  {
    track: "V1",
    start: "2023-07",
    end: "2023-07",
    title: "Fisdom",
    label: "Fisdom",
    role: "Video Editor · Short & long-form",
    when: "Jul 2023",
    text: "Short and long-form video for the fintech brand, cut in Premiere Pro to match its brand goals.",
    tools: ["premiere", "canva"],
  },
  {
    track: "V2",
    start: "2023-08",
    end: "2023-08",
    title: "Kanav Bhagat × SportyBarbie",
    label: "Kanav",
    role: "Video Editor · Creator collab",
    when: "Aug 2023",
    text: "A collaborative sports video, with visuals matched to both creators' style and audience.",
    tools: ["premiere", "aftereffects"],
  },
  {
    track: "V1",
    start: "2023-09",
    end: "2023-12",
    title: "Growth Rocket",
    label: "Growth Rocket",
    role: "Video Editor & Content Strategist · Internship",
    when: "Sep – Dec 2023",
    text: "Content strategy and video ads for Paytm and PokerBaazi, lifting audience engagement 60% on average. Mentored 50+ students.",
    tools: ["premiere", "aftereffects", "blender"],
  },
  {
    track: "V1",
    start: "2024-01",
    end: "2025-04",
    title: "PokerBaazi · SportyBarbie",
    label: "PokerBaazi · SportyBarbie",
    role: "Content & Ads Creator",
    when: "2024 – 2025",
    text: "100+ IP videos. Grew the page from 0 to 200K followers in six months, with poker and sports videos reaching 1M+ views each.",
    tools: ["premiere", "aftereffects", "photoshop", "canva"],
  },
  {
    track: "V2",
    start: "2025-02",
    end: "2025-05",
    title: "Ayushman Pandita",
    label: "Ayushman",
    role: "Video Editor · YouTube long-form",
    when: "Feb – May 2025",
    text: "Intros, podcast trailers and long-form edits for a business creator's channel, on projects that crossed 500K+ views.",
    tools: ["premiere", "aftereffects", "photoshop"],
  },
  {
    track: "V3",
    start: "2025-07",
    end: "2025-07",
    title: "D.Tech",
    label: "D.Tech",
    role: "UI/UX Designer",
    when: "Jul 2025",
    text: "Designed the interface in Figma and built it with Next.js and Tailwind: mobile bounce rate down 20%, mobile conversions up 10%. Modelled a 3D element in Blender and brought it in with Three.js.",
    tools: ["figma", "nextjs", "tailwind", "blender", "threejs"],
  },
];
