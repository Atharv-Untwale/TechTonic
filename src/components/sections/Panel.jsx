import { memo } from "react";
import { PANEL } from "@/config/eventConfig.js";
import TiltCard from "@/components/common/TiltCard.jsx";
import CyberText from "@/components/common/CyberText.jsx";
import Photo from "@/components/common/Photo.jsx";
import Button from "@/components/common/Button.jsx";

export const PanelPeople = memo(function PanelPeople() {
  return (
    <>
      <div className="mod-row">
        <PersonCard person={PANEL.moderator} tag="Moderator" isMod />
      </div>
      <div className="people">
        {PANEL.panelists.map((panelist, index) => (
          <PersonCard key={index} person={panelist} tag={`Panelist ${index + 1}`} />
        ))}
      </div>
    </>
  );
});

export const PersonCard = memo(function PersonCard({ person, tag, isMod }) {
  return (
    <TiltCard
      as="article"
      className={`person ${isMod ? "mod" : ""} ${person.name === "TBA" ? "tba" : ""}`}
      maxTilt={8}
    >
      <Photo src={person.photo} name={person.name} />
      <span className="tag">{tag}</span>
      <h3>
        <CyberText text={person.name} />
      </h3>
      <p>{person.role}</p>
    </TiltCard>
  );
});

export default memo(function PanelSection() {
  return (
    <section id="panel" className="sec alt">
      <h2>
        <CyberText text="The panel" />
      </h2>
      <p className="lead">
        {PANEL.topic}. {PANEL.time}.
      </p>
      <PanelPeople />
      <div className="link-row">
        <Button ghost href="#/panel" magnetic>
          Open the panel page
        </Button>
      </div>
    </section>
  );
});
