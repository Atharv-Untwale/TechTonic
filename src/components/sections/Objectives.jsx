import { memo } from "react";
import { OBJECTIVES } from "@/config/eventConfig.js";
import CyberText from "@/components/common/CyberText.jsx";

export default memo(function Objectives() {
  return (
    <section className="sec alt">
      <h2>
        <CyberText text="Why come?" />
      </h2>
      <ul className="goals">
        {OBJECTIVES.map((objective) => (
          <li key={objective}>{objective}</li>
        ))}
      </ul>
    </section>
  );
});
