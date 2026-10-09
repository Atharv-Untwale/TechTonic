import { memo } from "react";
import { REGISTER_URL, OPEN_MIC_URL } from "@/config/eventConfig.js";
import CyberText from "@/components/common/CyberText.jsx";
import Button from "@/components/common/Button.jsx";

export default memo(function TalentCta() {
  return (
    <section className="sec cta-sec">
      <h2>
        <CyberText text="Got a talent? Take the mic." />
      </h2>
      <p className="lead">
        Engineers Got Talent is open to Medicaps University students. Singing, stand-up,
        poetry, instruments: register in advance.
      </p>
      <div className="row">
        <Button>Register for TechTonic</Button>
        <Button ghost href={OPEN_MIC_URL || REGISTER_URL}>
          Sign up for open mic
        </Button>
      </div>
    </section>
  );
});
