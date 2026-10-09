import { memo } from "react";
import { PANEL, EVENT } from "@/config/eventConfig.js";
import { PanelPeople } from "@/components/sections/Panel.jsx";
import Button from "@/components/common/Button.jsx";

export default memo(function PanelPage() {
  return (
    <>
      <div className="page-head">
        <Button ghost href="#top" className="back">
          ← Back to home
        </Button>
        <br />
        <span className="sec-tag">✦ Deep-Dive Panel Session</span>
        <h1>Panel Discussion</h1>
        <p className="meta">
          {PANEL.time} · {EVENT.dateLabel} · {EVENT.venue}
        </p>
        <p className="topic-box">{PANEL.topic}</p>
        <ul className="covers">
          {PANEL.covers.map((point) => (
            <li key={point}>{point}</li>
          ))}
        </ul>
      </div>
      <section className="sec" style={{ paddingTop: "1rem" }}>
        <PanelPeople />
        <div className="link-row">
          <Button>Register to attend</Button>
        </div>
      </section>
    </>
  );
});
