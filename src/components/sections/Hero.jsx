import { useRef, memo, useState, useEffect } from "react";
import gsap from "gsap";
import { EVENT } from "@/config/eventConfig.js";
import { useCountdown } from "@/hooks/useCountdown.js";
import Button from "@/components/common/Button.jsx";

const WORDS = ["Learn", "Compete", "Discuss", "Express"];

const Rotator = memo(function Rotator() {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const timer = setInterval(() => setIndex((n) => (n + 1) % WORDS.length), 2200);
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
        <div key={label} className="cd-block">
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
  const heroRef = useRef(null);
  const sunRef = useRef(null);
  const rafRef = useRef(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.from(".hero-pill", { y: -20, opacity: 0, duration: 0.7 })
        .from(".presents", { y: -15, opacity: 0, duration: 0.5 }, "-=0.4")
        .from(".hero-title", { y: 40, opacity: 0, duration: 0.9, ease: "power4.out" }, "-=0.3")
        .from(".band", { scale: 0.9, opacity: 0, duration: 0.5 }, "-=0.4")
        .from(".rotator", { opacity: 0, y: 15, duration: 0.5 }, "-=0.3")
        .from(".script", { opacity: 0, y: 15, duration: 0.5 }, "-=0.3")
        .from(".cd-block", { y: 25, opacity: 0, stagger: 0.08, duration: 0.6 }, "-=0.3")
        .from(".meta", { opacity: 0, duration: 0.5 }, "-=0.2")
        .from(".hero-row .btn", { y: 20, opacity: 0, stagger: 0.1, duration: 0.5 }, "-=0.3");
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const handlePointerMove = (e) => {
    if (e.pointerType !== "mouse") return;
    cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      const x = (e.clientX / window.innerWidth - 0.5) * 45;
      const y = (e.clientY / window.innerHeight - 0.5) * 25;
      sunRef.current?.style.setProperty("--mx", `${x}px`);
      sunRef.current?.style.setProperty("--my", `${y}px`);
    });
  };

  return (
    <section className="hero" ref={heroRef} onPointerMove={handlePointerMove}>
      <div className="sun" ref={sunRef} aria-hidden="true" />
      <div className="hero-pill">
        <span className="pulse-dot" />
        <span>Live in Indore · October 31, 2026</span>
      </div>
      <p className="presents">Techno Clubs, Medi-Caps University presents</p>
      <h1 className="hero-title">TECHTONIC</h1>
      <div className="band">
        <span>Tech × Talent × Together</span>
      </div>
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
