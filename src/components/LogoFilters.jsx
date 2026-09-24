// SVG filters that turn the full-colour, white-background logo images into
// single-colour marks (brightness -> opacity), so they can follow the section
// theme without editing the image files. The colours match --ink in index.css.
const COLORS = {
  blue: "#0a1a45",
  violet: "#22103f",
  green: "#06281a",
  white: "#ffffff",
};

const rgb = (hex) =>
  [1, 3, 5].map((i) => (parseInt(hex.slice(i, i + 2), 16) / 255).toFixed(3));

const LogoFilters = () => (
  <svg
    aria-hidden="true"
    width="0"
    height="0"
    style={{ position: "absolute" }}
    focusable="false"
  >
    {Object.entries(COLORS).map(([name, hex]) => {
      const [r, g, b] = rgb(hex);
      return (
        <filter
          key={name}
          id={`mono-${name}`}
          colorInterpolationFilters="sRGB"
        >
          {/* flatten onto white first so transparent pixels don't turn solid */}
          <feFlood floodColor="#fff" result="white" />
          <feBlend in="SourceGraphic" in2="white" mode="normal" />
          <feColorMatrix
            type="matrix"
            values={`0 0 0 0 ${r}  0 0 0 0 ${g}  0 0 0 0 ${b}  -0.2126 -0.7152 -0.0722 0 1`}
          />
          <feComponentTransfer>
            <feFuncA type="gamma" amplitude="1" exponent="0.5" />
          </feComponentTransfer>
        </filter>
      );
    })}
  </svg>
);

export default LogoFilters;
