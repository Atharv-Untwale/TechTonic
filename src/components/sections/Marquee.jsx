import { memo } from "react";

const MARQUEE_ITEMS = [
  "Speaker Session",
  "Panel Discussion",
  "KBC",
  "Engineers Got Talent",
  "Patch Panic",
  "Tech × Talent × Together",
];

export default memo(function Marquee() {
  const line = MARQUEE_ITEMS.map((text) => (
    <span key={text}>{text} ✦</span>
  ));

  return (
    <div className="marquee" aria-hidden="true">
      <div>
        {line}
        {line}
      </div>
    </div>
  );
});
