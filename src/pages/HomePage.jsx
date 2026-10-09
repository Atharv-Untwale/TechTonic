import { lazy, Suspense, memo } from "react";
import Hero from "@/components/sections/Hero.jsx";
import Marquee from "@/components/sections/Marquee.jsx";
import Segments from "@/components/sections/Segments.jsx";
import Schedule from "@/components/sections/Schedule.jsx";
import Speaker from "@/components/sections/Speaker.jsx";
import PanelSection from "@/components/sections/Panel.jsx";
import Objectives from "@/components/sections/Objectives.jsx";
import TalentCta from "@/components/sections/TalentCta.jsx";

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
        <div className="sec-head">
          <span className="sec-tag">✦ Interactive Arcade</span>
          <h2>
            Warm Up: <span className="accent">Patch Panic</span>
          </h2>
          <p className="lead">
            Squash the bugs, spare the features, chain a combo multiplier. Compete on the live
            leaderboard before the real event begins!
          </p>
        </div>
        <Suspense
          fallback={
            <div className="crt" style={{ padding: "3rem", textAlign: "center" }}>
              Compiling system…
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
