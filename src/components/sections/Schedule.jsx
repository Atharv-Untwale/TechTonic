import { useState, memo } from "react";
import { SCHEDULE } from "@/config/eventConfig.js";
import { useLiveSchedule } from "@/hooks/useLiveSchedule.js";
import CyberText from "@/components/common/CyberText.jsx";

export default memo(function Schedule() {
  const live = useLiveSchedule();
  const [tab, setTab] = useState(() => {
    const activeGroup = SCHEDULE.findIndex((group) =>
      group.items.some((item) => item[0] + item[1] === live)
    );
    return activeGroup < 0 ? 1 : activeGroup;
  });

  return (
    <section id="schedule" className="sec alt">
      <h2>
        <CyberText text="The day, minute by minute" />
      </h2>
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
      <ul className="timeline">
        {SCHEDULE[tab].items.map(([time, what, duration]) => (
          <li
            key={time + what}
            className={`${what === "Break" ? "brk" : ""} ${
              live === time + what ? "live" : ""
            }`}
          >
            <time>{time}</time>
            <span>
              {what}
              {live === time + what && <span className="badge">LIVE NOW</span>}
            </span>
            {duration && <em>{duration}</em>}
          </li>
        ))}
      </ul>
      <p className="note">9:30 AM to 3:30 PM, 6 hours in total.</p>
    </section>
  );
});
