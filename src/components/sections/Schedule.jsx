import { useState, useRef, useEffect, memo } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SCHEDULE } from "@/config/eventConfig.js";
import { useLiveSchedule } from "@/hooks/useLiveSchedule.js";

gsap.registerPlugin(ScrollTrigger);

export default memo(function Schedule() {
  const live = useLiveSchedule();
  const scheduleRef = useRef(null);
  const timelineRef = useRef(null);

  const [tab, setTab] = useState(() => {
    const activeGroup = SCHEDULE.findIndex((group) =>
      group.items.some((item) => item[0] + item[1] === live)
    );
    return activeGroup < 0 ? 1 : activeGroup;
  });

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".timeline li", {
        scrollTrigger: {
          trigger: scheduleRef.current,
          start: "top 75%",
        },
        x: -25,
        opacity: 0,
        stagger: 0.05,
        duration: 0.6,
        ease: "power2.out",
      });
    }, scheduleRef);

    return () => ctx.revert();
  }, []);

  // Animate items on tab switch
  useEffect(() => {
    if (timelineRef.current) {
      gsap.fromTo(
        timelineRef.current.children,
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, stagger: 0.04, duration: 0.4, ease: "power2.out" }
      );
    }
  }, [tab]);

  return (
    <section id="schedule" className="sec alt" ref={scheduleRef}>
      <div className="sec-head">
        <span className="sec-tag">✦ Comprehensive Schedule</span>
        <h2>
          The Day, <span className="accent">Minute by Minute</span>
        </h2>
        <p className="lead">
          From the ceremonial inauguration to high-octane stage showdowns: 9:30 AM to 3:30 PM,
          6 hours in total.
        </p>
      </div>

      <div className="tabs" role="tablist">
        {SCHEDULE.map((group, index) => (
          <button
            key={group.group}
            role="tab"
            aria-selected={tab === index}
            className={tab === index ? "on" : ""}
            onClick={() => setTab(index)}
          >
            {group.group}
          </button>
        ))}
      </div>

      <ul className="timeline" ref={timelineRef}>
        {SCHEDULE[tab].items.map(([time, what, duration]) => (
          <li
            key={time + what}
            className={`${what === "Break" ? "brk" : ""} ${
              live === time + what ? "live" : ""
            }`}
          >
            <time>{time}</time>
            <span className="what-text">
              {what}
              {live === time + what && <span className="badge">LIVE NOW</span>}
            </span>
            {duration ? <em>{duration}</em> : <span />}
          </li>
        ))}
      </ul>
      <p className="note" style={{ marginTop: "2rem" }}>
        Note: Timings are subject to minor adjustments based on live session flow.
      </p>
    </section>
  );
});
