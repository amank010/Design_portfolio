// SVG filters used by the paper look across the page:
// - #dry-brush: ragged edges and dry streaks for painted lettering
// - #rough-edge: roughens the outline of a card's paper, like a torn sheet
const PaperFilters = () => (
  <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden="true" focusable="false">
    <filter id="dry-brush" x="-5%" y="-5%" width="110%" height="110%">
      <feTurbulence type="fractalNoise" baseFrequency="0.05" numOctaves="2" seed="4" result="warp" />
      <feDisplacementMap in="SourceGraphic" in2="warp" scale="3.5" xChannelSelector="R" yChannelSelector="G" result="edge" />
      <feTurbulence type="fractalNoise" baseFrequency="0.05 0.5" numOctaves="3" seed="9" result="grain" />
      <feColorMatrix in="grain" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 -9 7.1" result="gaps" />
      <feComposite in="edge" in2="gaps" operator="in" />
    </filter>
    <filter id="rough-edge" x="-3%" y="-3%" width="106%" height="106%">
      <feTurbulence type="fractalNoise" baseFrequency="0.035" numOctaves="4" seed="11" result="noise" />
      <feDisplacementMap in="SourceGraphic" in2="noise" scale="9" xChannelSelector="R" yChannelSelector="G" />
    </filter>
  </svg>
);

export default PaperFilters;
