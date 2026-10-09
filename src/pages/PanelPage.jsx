import { memo } from "react";
import { PANEL, EVENT } from "@/config/eventConfig.js";
import { PanelPeople } from "@/components/sections/Panel.jsx";
import CyberText from "@/components/common/CyberText.jsx";
import Button from "@/components/common/Button.jsx";

export default memo(function PanelPage() {
  return (
    <>
      <div className="page-head">
        <Button ghost href="#top" className="back">
          ← Back to home
        </Button>
        <h1>
          <CyberText text="Panel Discussion" />
        </h1>
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
      <section className="sec">
        <PanelPeople />
        <div className="link-row">
          <Button>Register to attend</Button>
        </div>
      </section>
    </>
  );
});
