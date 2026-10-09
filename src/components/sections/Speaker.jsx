import { useRef, useEffect, memo } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SPEAKER } from "@/config/eventConfig.js";
import TiltCard from "@/components/common/TiltCard.jsx";
import CyberText from "@/components/common/CyberText.jsx";
import Photo from "@/components/common/Photo.jsx";

gsap.registerPlugin(ScrollTrigger);

export default memo(function Speaker() {
  const speakerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".speaker", {
        scrollTrigger: {
          trigger: speakerRef.current,
          start: "top 80%",
        },
        y: 40,
        opacity: 0,
        duration: 0.85,
        ease: "power3.out",
      });

      gsap.from(".facts div", {
        scrollTrigger: {
          trigger: speakerRef.current,
          start: "top 75%",
        },
        x: 25,
        opacity: 0,
        stagger: 0.15,
        duration: 0.7,
        ease: "power2.out",
      });
    }, speakerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="speaker" className="sec" ref={speakerRef}>
      <div className="sec-head">
        <span className="sec-tag">✦ Keynote Speaker</span>
        <h2>
          Meet the <span className="accent">Keynote Speaker</span>
        </h2>
        <p className="lead">
          Direct industry mentorship from a seasoned Cloud & DevOps leader shaping modern
          infrastructure in the age of AI.
        </p>
      </div>

      <TiltCard as="div" className="speaker has-photo" maxTilt={6}>
        <Photo src={SPEAKER.photo} name={SPEAKER.name} />
        <div>
          <h3>
            <CyberText text={SPEAKER.name} />
          </h3>
          <p className="role">{SPEAKER.role}</p>
          <p className="topic">
            <strong style={{ color: "var(--cream)" }}>Keynote:</strong> {SPEAKER.topic}
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
