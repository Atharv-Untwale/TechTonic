import { useRef, memo, useState, useEffect } from "react";
import { EVENT } from "@/config/eventConfig.js";
import { useCountdown } from "@/hooks/useCountdown.js";
import CyberText from "@/components/common/CyberText.jsx";
import Button from "@/components/common/Button.jsx";

const WORDS = ["Learn", "Compete", "Discuss", "Express"];

const Rotator = memo(function Rotator() {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const timer = setInterval(() => setIndex((n) => (n + 1) % WORDS.length), 2000);
    return () => clearInterval(timer);
  }, []);

  return (
    <p className="rotator" aria-hidden="true">
      Come to <span key={index} className="word">{WORDS[index]}</span>
    </p>
  );
});

const Countdown = memo(function Countdown() {
  const parts = useCountdown(EVENT.start);
  return (
    <div className="countdown" role="timer" aria-label="Time until TechTonic">
      {parts.map(([label, val]) => (
        <div key={label}>
          <b>{String(val).padStart(2, "0")}</b>
          <span>{label}</span>
        </div>
      ))}
    </div>
  );
});

const CALENDAR_LINK =
  "https://calendar.google.com/calendar/render?action=TEMPLATE&text=TechTonic&dates=20261031T040000Z/20261031T100000Z&location=" +
  encodeURIComponent(EVENT.venue);

export default memo(function Hero() {
  const sunRef = useRef(null);
  const rafRef = useRef(0);

  const handlePointerMove = (e) => {
    if (e.pointerType !== "mouse") return;
    cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      const x = (e.clientX / window.innerWidth - 0.5) * 50;
      const y = (e.clientY / window.innerHeight - 0.5) * 30;
      sunRef.current?.style.setProperty("--mx", `${x}px`);
      sunRef.current?.style.setProperty("--my", `${y}px`);
    });
  };

  return (
    <section className="hero" onPointerMove={handlePointerMove}>
      <div className="sun" ref={sunRef} aria-hidden="true" />
      <p className="presents">Techno Clubs, Medicaps University presents</p>
      <h1>
        <CyberText text="TECHTONIC" />
      </h1>
      <p className="band">
        <CyberText text="Tech × Talent × Together" />
      </p>
      <Rotator />
      <p className="script">The future of tech starts here.</p>
      <Countdown />
      <p className="meta">
        {EVENT.dateLabel} · {EVENT.time}
        <br />
        {EVENT.venue}
      </p>
      <div className="hero-row">
        <Button>Register now</Button>
        <Button ghost href="#play">
          Play Patch Panic
        </Button>
        <Button ghost href={CALENDAR_LINK}>
          Add to calendar
        </Button>
      </div>
    </section>
  );
});
