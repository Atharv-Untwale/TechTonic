import { useRef, useEffect, memo } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SEGMENTS } from "@/config/eventConfig.js";
import TiltCard from "@/components/common/TiltCard.jsx";
import CyberText from "@/components/common/CyberText.jsx";

gsap.registerPlugin(ScrollTrigger);

export default memo(function Segments() {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".seg", {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
        },
        y: 45,
        opacity: 0,
        stagger: 0.12,
        duration: 0.8,
        ease: "power3.out",
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="segments" className="sec" ref={containerRef}>
      <div className="sec-head">
        <span className="sec-tag">✦ Four Segments, One Day</span>
        <h2>
          Experience <span className="accent">Tech & Talent</span>
        </h2>
        <p className="lead">
          Learn, compete, discuss, express. A one-day experience where ideas, skills and
          creativity come together on a grand stage.
        </p>
      </div>
      <div className="grid4">
        {SEGMENTS.map((segment) => (
          <TiltCard key={segment.title} as="article" className="seg" maxTilt={8}>
            <div className="seg-icon-wrap" aria-hidden="true">
              {segment.icon}
            </div>
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
