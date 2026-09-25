// Everything the Work sections show.
//
// Short-form reels live on Instagram, which doesn't let other sites autoplay
// them. To show a reel as a playing video, export it and drop the file into
// src/assets/videos/short/ named after its id (e.g. sportybarbie-01.mp4). Until
// then the card shows a slate that links to the reel. Any extra files you drop
// in that folder (or in videos/long/) are added automatically.
// See src/assets/videos/README.md.

export const RESUME_URL =
  "https://drive.google.com/file/d/1kwY6XG_OYAdJSoGr9qY8UPSupUJ1hGKZ/view";
export const EMAIL = "amanksingh010@gmail.com";
export const WHATSAPP_URL = "https://wa.me/918130703182";

export const socials = [
  { label: "GitHub", href: "https://github.com/amank010" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/aman-kumar-4165071b8/" },
  { label: "X", href: "https://x.com/AMAN1266331" },
  { label: "Instagram", href: "https://www.instagram.com/amankr010/" },
];

// Accent per client, used on slates and filter chips.
export const clientColors = {
  "Ayushman Pandita": "#22c3a6",
  SportyBarbie: "#f472b6",
  Fisdom: "#8b7cf6",
  "Kanav Bhagat": "#fbbf24",
  "Yash Garg": "#4d7cff",
};

// Dates are when each reel went live on Instagram. The files in
// src/assets/videos/short were downloaded from these posts and re-encoded for
// the web. (A third SportyBarbie reel, instagram.com/reel/C9xIqXLvsqp, is
// age-restricted and can't be fetched without a login; export it as
// sportybarbie-02.mp4 and add an entry here to include it.)
export const shortForm = [
  {
    id: "ayushman-01",
    group: "Ayushman Pandita",
    client: "Ayushman Pandita",
    title: "Creator reel",
    date: "2025-04",
    href: "https://www.instagram.com/ayushman.pandita/reel/DIO2UPkyb5u/",
  },
  {
    id: "ayushman-02",
    group: "Ayushman Pandita",
    client: "Ayushman Pandita",
    title: "Creator reel",
    date: "2024-08",
    href: "https://www.instagram.com/ayushman.pandita/reel/C-aYf5ASXDt/",
  },
  {
    id: "sportybarbie-01",
    group: "SportyBarbie",
    client: "SportyBarbie × PokerBaazi",
    title: "Sports storytelling",
    date: "2025-04",
    href: "https://www.instagram.com/reel/DIOlGfXz0As/",
  },
  {
    id: "fisdom-01",
    group: "Fisdom",
    client: "Fisdom",
    title: "Fintech explainer",
    date: "2023-07",
    href: "https://www.instagram.com/reel/CvUmOANM3d-/",
  },
  {
    id: "yash-01",
    group: "Yash Garg",
    client: "Yash Garg",
    title: "Business case study",
    date: "2023-04",
    href: "https://www.instagram.com/reel/CqfmLfFsC5n/",
  },
  {
    id: "kanav-01",
    group: "Kanav Bhagat",
    client: "Kanav Bhagat × SportyBarbie",
    title: "Creator collab",
    date: "2023-08",
    href: "https://www.instagram.com/reel/CvkCa_kpuOT/",
  },
  {
    id: "fisdom-02",
    group: "Fisdom",
    client: "Fisdom",
    title: "Fintech explainer",
    date: "2023-07",
    href: "https://www.instagram.com/reel/Cu1oMnYOfHj/",
  },
  {
    id: "sportybarbie-03",
    group: "SportyBarbie",
    client: "SportyBarbie × PokerBaazi",
    title: "Sports storytelling",
    date: "2024-07",
    href: "https://www.instagram.com/reel/C9h2eo3vOqZ/",
  },
  {
    id: "yash-02",
    group: "Yash Garg",
    client: "Yash Garg",
    title: "Business case study",
    date: "2023-03",
    href: "https://www.instagram.com/reel/CqQGF8bOLDV/",
  },
  {
    id: "kanav-02",
    group: "Kanav Bhagat",
    client: "Kanav Bhagat × SportyBarbie",
    title: "Creator collab",
    date: "2023-08",
    href: "https://www.instagram.com/reel/CvcTifkJjaF/",
  },
];

// Long-form plays straight from YouTube. The third Ayushman link that used to
// be on the site (youtube.com/watch?v=9Y5AVEG7ysY) is private or removed, so
// it's left out.
export const longForm = [
  {
    id: "ayushman-side-hustles",
    client: "Ayushman Pandita",
    title: "5 Side Hustles That Can Become Million Dollar Businesses",
    role: "Intro edit",
    date: "2025-05",
    duration: "29:30",
    youtube: "j8SlxLqa4g8",
  },
  {
    id: "ayushman-flying-beast",
    client: "Ayushman Pandita",
    title: "How Flying Beast Is Making Crores By Selling Protein",
    role: "Podcast trailer",
    date: "2025-02",
    duration: "1:14:04",
    youtube: "GPieFWs5yNo",
  },
];

export const moreLongForm = {
  label: "More on Ayushman's channel",
  href: "https://www.youtube.com/@AyushmanPandita/videos",
};

export const clients = [
  "PokerBaazi",
  "SportsBaazi",
  "Paytm",
  "Fisdom",
  "Growth Rocket",
  "Ayushman Pandita",
  "Yash Garg",
  "Kanav Bhagat",
  "D.Tech",
];

// From the resume.
export const stats = [
  { value: 200, suffix: "K+", label: "Followers grown in 6 months", note: "PokerBaazi IP" },
  { value: 1, suffix: "M+", label: "Views per video on poker & sports edits", note: "PokerBaazi IP" },
  { value: 100, suffix: "+", label: "Short-form videos created & edited", note: "Brands & creators" },
  { value: 60, suffix: "%", label: "Average lift in audience engagement", note: "Growth Rocket" },
];
