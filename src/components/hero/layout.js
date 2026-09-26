// Where everything sits on the case board. x/w are percentages of the board's
// width, y/h of its height; font sizes are in cqw (percent of board width).
// `pin` is where the push pin goes, as a percentage of the item itself; the
// item swings around that point on hover. Strings run from the photo's pin to
// every other pin. Double-clicking the board zooms in by `zoom`.

export const desktop = {
  aspect: 1.5,
  // where the bulb hangs, in board % (keep in step with --lamp-x/--lamp-y in
  // index.css); every shadow on the board falls away from it
  lamp: [101.6, 24],
  zoom: 2.3,
  title: { x: 11, y: 4, w: 72, h: 19, rotate: -1.2, size: 13.5 },
  year: { x: 73, y: 12.5, rotate: -13, size: 4.4 },
  label: { x: 4.5, y: 23.5, w: 31, h: 9.5, rotate: -2.5, size: 1.5 },
  photo: { x: 35.5, y: 27, w: 27, rotate: 1.5, pin: [50, 3], captionSize: 1.85 },
  stamp: { x: 52.5, y: 88.5, rotate: -6, size: 1.5 },
  scraps: {
    short: { x: 3.5, y: 35, w: 25, h: 13, rotate: -8, pin: [86, 22], size: 3.7 },
    long: { x: 14, y: 52.5, w: 16.5, h: 19, rotate: 4, pin: [46, 12], size: 3.6 },
    motion: { x: 11, y: 75.5, w: 17, h: 18, rotate: -6, pin: [42, 14], size: 3.1 },
    journey: { x: 64.5, y: 37.5, w: 18, h: 11, rotate: 5, pin: [50, 16], size: 3.2 },
    design: { x: 66, y: 52, w: 24, h: 11, rotate: -4, pin: [10, 24], size: 4 },
    about: { x: 78, y: 66, w: 19, h: 29, rotate: 3, pin: [42, 8], size: 3.8 },
  },
  sticky: { x: 85.5, y: 35.5, w: 12, h: 18.5, rotate: -6, pin: [50, 7], size: 2.1 },
  thumbs: {
    long: { x: 2.5, y: 57, w: 14, rotate: -6, size: 1.35 },
    reel: { x: 64.5, y: 65.5, w: 11, rotate: 4, size: 1.35 },
  },
  notes: {
    seen: { x: 70, y: 24.5, w: 26, rotate: -7, size: 2.4 },
    said: { x: 29.5, y: 82.5, w: 18.5, rotate: -4, size: 1.8 },
  },
  tapes: [
    { x: -2.5, y: -1.5, w: 12, h: 5, rotate: -34 },
    { x: 90.5, y: -1, w: 12, h: 5, rotate: 32 },
    { x: -1.5, y: 94, w: 11, h: 5, rotate: 30 },
  ],
  loose: [50, 104], // the string from the photo's foot off the bottom of the board
};

export const mobile = {
  aspect: 0.62,
  lamp: [90, 11],
  zoom: 2.2,
  title: { x: 4, y: 3.5, w: 76, h: 10, rotate: -1.5, size: 19 },
  year: { x: 58, y: 11.2, rotate: -10, size: 6.5 },
  label: { x: 4, y: 16.5, w: 62, h: 6.5, rotate: -2.5, size: 3.4 },
  photo: { x: 30, y: 31, w: 44, rotate: 1.5, pin: [50, 3], captionSize: 3.4 },
  stamp: { x: 55, y: 90, rotate: -6, size: 2.8 },
  scraps: {
    short: { x: 2, y: 24.5, w: 31, h: 8, rotate: -7, pin: [80, 24], size: 5.6 },
    design: { x: 69, y: 24, w: 29, h: 7.5, rotate: 6, pin: [18, 24], size: 6.2 },
    long: { x: 2, y: 64, w: 31, h: 10, rotate: 4, pin: [52, 12], size: 6.6 },
    journey: { x: 71, y: 49, w: 27, h: 8.5, rotate: 5, pin: [88, 20], size: 5 },
    motion: { x: 5, y: 79, w: 33, h: 12.5, rotate: -5, pin: [44, 12], size: 6.2 },
    about: { x: 66, y: 62.5, w: 31, h: 20, rotate: 3, pin: [42, 7], size: 5.4 },
  },
  sticky: { x: 3, y: 37.5, w: 23, h: 18, rotate: -6, pin: [50, 6], size: 3.8 },
  thumbs: {
    long: { x: 38.5, y: 67, w: 25, rotate: -5, size: 2.4 },
  },
  notes: {
    seen: { x: 76, y: 38, w: 22, rotate: -8, size: 3.6 },
    said: { x: 43, y: 83, w: 31, rotate: -3, size: 3.2 },
  },
  tapes: [
    { x: -3, y: -1, w: 18, h: 3.5, rotate: -34 },
    { x: 86, y: -0.5, w: 18, h: 3.5, rotate: 32 },
  ],
  loose: null, // no loose string on phones: it would cross the scraps below
};
