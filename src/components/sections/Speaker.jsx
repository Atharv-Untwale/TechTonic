import { memo } from "react";
import { SPEAKER } from "@/config/eventConfig.js";
import TiltCard from "@/components/common/TiltCard.jsx";
import CyberText from "@/components/common/CyberText.jsx";
import Photo from "@/components/common/Photo.jsx";

export default memo(function Speaker() {
  return (
    <section id="speaker" className="sec">
      <h2>
        <CyberText text="Meet the speaker" />
      </h2>
      <TiltCard as="div" className="speaker has-photo" maxTilt={6}>
        <Photo src={SPEAKER.photo} name={SPEAKER.name} />
        <div>
          <h3>
            <CyberText text={SPEAKER.name} />
          </h3>
          <p className="role">{SPEAKER.role}</p>
          <p className="topic">
            <b>Topic:</b> {SPEAKER.topic}
          </p>
          <ul>
            {SPEAKER.points.map((point) => (
              <li key={point}>{point}</li>
            ))}
          </ul>
        </div>
        <div className="facts">
          {SPEAKER.facts.map(([num, label]) => (
            <div key={num}>
              <b>{num}</b>
              <span>{label}</span>
            </div>
          ))}
        </div>
      </TiltCard>
    </section>
  );
});
