// Finds exported videos (and optional poster images) dropped into
// src/assets/videos/short and src/assets/videos/long, keyed by file name.
const videoFiles = import.meta.glob(
  "../assets/videos/*/*.{mp4,MP4,webm,WEBM,mov,MOV,m4v,M4V}",
  { eager: true, query: "?url", import: "default" },
);
const posterFiles = import.meta.glob(
  "../assets/videos/*/*.{jpg,JPG,jpeg,JPEG,png,PNG,webp,WEBP}",
  { eager: true, query: "?url", import: "default" },
);

const byName = (files) => {
  const index = {};
  for (const [path, url] of Object.entries(files)) {
    const match = path.match(/videos\/(short|long)\/(.+)\.[^.]+$/);
    if (match) index[`${match[1]}/${match[2]}`] = url;
  }
  return index;
};

const allVideos = byName(videoFiles);
const posters = byName(posterFiles);

// "name.preview.mp4" is a lighter copy of "name.mp4" for the autoplaying
// card; the full file still plays when the video is opened.
const PREVIEW = ".preview";
const previews = {};
const videos = {};
for (const [key, url] of Object.entries(allVideos)) {
  if (key.endsWith(PREVIEW)) previews[key.slice(0, -PREVIEW.length)] = url;
  else videos[key] = url;
}

// "my-new-reel_v2" -> "My new reel v2"
const titleFromName = (name) => {
  const words = name.replace(/[-_]+/g, " ").trim();
  return words.charAt(0).toUpperCase() + words.slice(1);
};

// Attaches `src`/`poster` to every item whose id has a matching file, then
// appends any files that aren't listed yet.
export const withMedia = (kind, items) => {
  const listed = items.map((item) => ({
    ...item,
    kind,
    src: videos[`${kind}/${item.id}`],
    preview: previews[`${kind}/${item.id}`],
    poster: posters[`${kind}/${item.id}`],
  }));

  const known = new Set(items.map((item) => item.id));
  const extra = Object.keys(videos)
    .filter((key) => key.startsWith(`${kind}/`))
    .map((key) => key.slice(kind.length + 1))
    .filter((id) => !known.has(id))
    .sort()
    .map((id) => ({
      id,
      kind,
      title: titleFromName(id),
      client: "",
      src: videos[`${kind}/${id}`],
      preview: previews[`${kind}/${id}`],
      poster: posters[`${kind}/${id}`],
    }));

  return [...listed, ...extra];
};

export const youtubePoster = (id, size = "maxresdefault") =>
  `https://i.ytimg.com/vi/${id}/${size}.jpg`;
