import { lazy, Suspense, memo } from "react";
import Hero from "@/components/sections/Hero.jsx";
import Marquee from "@/components/sections/Marquee.jsx";
import Segments from "@/components/sections/Segments.jsx";
import Schedule from "@/components/sections/Schedule.jsx";
import Speaker from "@/components/sections/Speaker.jsx";
import PanelSection from "@/components/sections/Panel.jsx";
import Objectives from "@/components/sections/Objectives.jsx";
import TalentCta from "@/components/sections/TalentCta.jsx";
import CyberText from "@/components/common/CyberText.jsx";

const Game = lazy(() => import("@/components/game/Game.jsx"));

export default memo(function HomePage() {
  return (
    <>
      <Hero />
      <Marquee />
      <Segments />
      <Schedule />
      <Speaker />
      <PanelSection />

      <section id="play" className="sec">
        <h2>
          <CyberText text="Warm up: Patch Panic" />
        </h2>
        <p className="lead">
          Squash the bugs, spare the features, chain a combo. Beat your best before the real
          event.
        </p>
        <Suspense
          fallback={
            <div className="crt" style={{ padding: "3rem", textAlign: "center" }}>
              Compiling…
            </div>
          }
        >
          <Game />
        </Suspense>
      </section>

      <Objectives />
      <TalentCta />
    </>
  );
});
