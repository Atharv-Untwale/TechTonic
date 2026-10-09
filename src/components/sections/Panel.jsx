import { useRef, useEffect, memo } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PANEL } from "@/config/eventConfig.js";
import TiltCard from "@/components/common/TiltCard.jsx";
import CyberText from "@/components/common/CyberText.jsx";
import Photo from "@/components/common/Photo.jsx";
import Button from "@/components/common/Button.jsx";

gsap.registerPlugin(ScrollTrigger);

export const PersonCard = memo(function PersonCard({ person, tag, isMod }) {
  return (
    <TiltCard
      as="article"
      className={`person ${isMod ? "mod" : ""} ${person.name === "TBA" ? "tba" : ""}`}
      maxTilt={7}
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

export default memo(function PanelSection() {
  const panelRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".person", {
        scrollTrigger: {
          trigger: panelRef.current,
          start: "top 75%",
        },
        y: 40,
        opacity: 0,
        stagger: 0.12,
        duration: 0.75,
        ease: "power3.out",
      });
    }, panelRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="panel" className="sec alt" ref={panelRef}>
      <div className="sec-head">
        <span className="sec-tag">✦ Interactive Panel</span>
        <h2>
          The <span className="accent">Panel Discussion</span>
        </h2>
        <p className="lead">
          {PANEL.topic} · {PANEL.time}
        </p>
      </div>

      <PanelPeople />

      <div className="link-row">
        <Button ghost href="#/panel" magnetic>
          Explore the Full Panel Agenda →
        </Button>
      </div>
    </section>
  );
});
