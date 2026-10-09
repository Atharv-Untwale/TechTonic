import { memo } from "react";
import { SEGMENTS } from "@/config/eventConfig.js";
import TiltCard from "@/components/common/TiltCard.jsx";
import CyberText from "@/components/common/CyberText.jsx";

export default memo(function Segments() {
  return (
    <section id="segments" className="sec">
      <h2>
        <CyberText text="Four segments, one day" />
      </h2>
      <p className="lead">
        Learn, compete, discuss, express. A one-day tech + talent experience where ideas,
        skills and creativity come together.
      </p>
      <div className="grid4">
        {SEGMENTS.map((segment) => (
          <TiltCard key={segment.title} as="article" className="seg" maxTilt={8}>
            <span aria-hidden="true">{segment.icon}</span>
            <h3>
              <CyberText text={segment.title} />
            </h3>
            <p>{segment.text}</p>
          </TiltCard>
        ))}
      </div>
    </section>
  );
});
