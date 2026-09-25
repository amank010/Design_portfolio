# Videos

Drop exported videos here and they show up on the site: no code changes needed.

```
src/assets/videos/
  short/   9:16 reels  → the "Short-form" section
  long/    16:9 edits  → the "Long-form" section
```

## Naming

- A file named after an item's `id` in `src/data/work.js` replaces that item's
  placeholder slate. For example `short/sportybarbie-01.mp4` becomes the first
  SportyBarbie reel, keeping its title, client and date.
- Any other file is added as a new card, titled from its file name
  (`short/new-brand-launch.mp4` → "New brand launch"). To give it a proper
  title and client, add an entry with that `id` to `src/data/work.js`.
- Optional poster: an image with the same name (`sportybarbie-01.jpg`) is shown
  until the video starts. Without one, the first frame is used.
- Optional preview: a lighter copy named `sportybarbie-01.preview.mp4` (about
  480 × 854, ~800 kbps) is what the card autoplays; the full file plays when
  the video is opened. Several cards play at once, so previews keep the page
  smooth. Without one, the card plays the full file.

Current reel ids: `ayushman-01`, `ayushman-02`, `sportybarbie-01`, `sportybarbie-03`, `fisdom-01`,
`fisdom-02`, `kanav-01`, `kanav-02`, `yash-01`, `yash-02`
(downloaded from the Instagram posts and re-encoded). `sportybarbie-02` is
age-restricted on Instagram, so it needs your own export.

## Export settings

Every card autoplays muted while it's on screen, so keep files light:

| | Short-form | Long-form |
|---|---|---|
| Format | H.264 MP4, AAC audio | H.264 MP4, AAC audio |
| Size | 720 × 1280 (1080 × 1920 max) | 1280 × 720 (1920 × 1080 max) |
| Bitrate | 3–5 Mbps VBR | 4–6 Mbps VBR |
| Audio | 128 kbps | 128 kbps |

In Premiere or Media Encoder: **H.264 → Match Source – Adaptive Medium
Bitrate**, then set the frame size and a target bitrate in that range.

Aim for under ~20 MB per reel. GitHub rejects files over 100 MB, so full
YouTube-length edits are better linked from YouTube: add them to `longForm`
in `src/data/work.js` with a `youtube` id instead of a file.
