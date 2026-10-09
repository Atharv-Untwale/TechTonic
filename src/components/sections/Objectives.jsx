import { useRef, useEffect, memo } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { OBJECTIVES } from "@/config/eventConfig.js";

gsap.registerPlugin(ScrollTrigger);

export default memo(function Objectives() {
  const objectivesRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".goals li", {
        scrollTrigger: {
          trigger: objectivesRef.current,
          start: "top 80%",
        },
        x: -30,
        opacity: 0,
        stagger: 0.08,
        duration: 0.65,
        ease: "power2.out",
      });
    }, objectivesRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="sec alt" ref={objectivesRef}>
      <div className="sec-head">
        <span className="sec-tag">✦ Core Objectives</span>
        <h2>
          Why Attend <span className="accent">TechTonic?</span>
        </h2>
        <p className="lead">
          Designed specifically to bridge academic foundations with industrial engineering
          leadership and creative expression.
        </p>
      </div>

      <ul className="goals">
        {OBJECTIVES.map((objective) => (
          <li key={objective}>{objective}</li>
        ))}
      </ul>
    </section>
  );
});
