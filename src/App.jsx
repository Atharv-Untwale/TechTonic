import { useState, useEffect, useRef, lazy, Suspense, memo } from "react";
import { REGISTER_URL, OPEN_MIC_URL, EVENT, SEGMENTS, SCHEDULE, SPEAKER, PANEL, OBJECTIVES } from "./config.js";

const Game = lazy(() => import("./Game.jsx"));

/* ---------- hooks ---------- */
const useHash = () => {
  const [h, setH] = useState(window.location.hash);
  useEffect(() => {
    const f = () => setH(window.location.hash);
    window.addEventListener("hashchange", f);
    return () => window.removeEventListener("hashchange", f);
  }, []);
  return h;
};

function useCountdown(target) {
  const calc = () => Math.max(0, new Date(target) - Date.now());
  const [ms, setMs] = useState(calc);
  useEffect(() => { const t = setInterval(() => setMs(calc()), 1000); return () => clearInterval(t); }, [target]);
  const s = Math.floor(ms / 1000);
  return [["days", Math.floor(s / 86400)], ["hrs", Math.floor(s / 3600) % 24], ["min", Math.floor(s / 60) % 60], ["sec", s % 60]];
}

/* Which schedule item is happening right now (only true on event day) */
const FLAT = SCHEDULE.flatMap((g) => g.items);
const at = (hhmm) => new Date(`${EVENT.start.slice(0, 10)}T${hhmm}:00+05:30`).getTime();
function useLive() {
  const calc = () => {
    const now = Date.now();
    const i = FLAT.findIndex((it, n) => now >= at(it[0]) && now < (n < FLAT.length - 1 ? at(FLAT[n + 1][0]) : at(it[0]) + 3600e3));
    return i < 0 ? null : FLAT[i][0] + FLAT[i][1];
  };
  const [live, setLive] = useState(calc);
  useEffect(() => { const t = setInterval(() => setLive(calc()), 30000); return () => clearInterval(t); }, []);
  return live;
}

/* ---------- small components ---------- */
const Countdown = memo(function Countdown() {
  const parts = useCountdown(EVENT.start);
  return (
    <div className="countdown" role="timer" aria-label="Time until TechTonic">
      {parts.map(([l, v]) => <div key={l}><b>{String(v).padStart(2, "0")}</b><span>{l}</span></div>)}
    </div>
  );
});

const Cta = ({ children = "Register now", href = REGISTER_URL, ghost }) => (
  <a className={`btn ${ghost ? "ghost" : ""}`} href={href} target="_blank" rel="noopener noreferrer">{children}</a>
);

const WORDS = ["Learn", "Compete", "Discuss", "Express"];
const Rotator = memo(function Rotator() {
  const [i, setI] = useState(0);
  useEffect(() => { const t = setInterval(() => setI((n) => (n + 1) % WORDS.length), 2000); return () => clearInterval(t); }, []);
  return <p className="rotator" aria-hidden="true">Come to <span key={i} className="word">{WORDS[i]}</span></p>;
});

const Marquee = memo(function Marquee() {
  const line = ["Speaker Session", "Panel Discussion", "KBC", "Engineers Got Talent", "Patch Panic", "Tech × Talent × Together"].map((t) => <span key={t}>{t} ✦</span>);
  return <div className="marquee" aria-hidden="true"><div>{line}{line}</div></div>;
});

const Photo = ({ src, name }) => {
  const [bad, setBad] = useState(!src);
  const initials = !name || name === "TBA" ? "?" : name.split(" ").map((w) => w[0]).slice(0, 2).join("");
  return (
    <div className="photo">
      {bad ? <span className="ph" role="img" aria-label="Photo coming soon">{initials}</span>
        : <img src={`${import.meta.env.BASE_URL}${src}`} alt={name} loading="lazy" onError={() => setBad(true)} />}
    </div>
  );
};

const Person = ({ p, tag, mod }) => (
  <article className={`person ${mod ? "mod" : ""} ${p.name === "TBA" ? "tba" : ""}`}>
    <Photo src={p.photo} name={p.name} />
    <span className="tag">{tag}</span>
    <h3>{p.name}</h3>
    <p>{p.role}</p>
  </article>
);

const PanelPeople = () => (
  <>
    <div className="mod-row"><Person p={PANEL.moderator} tag="Moderator" mod /></div>
    <div className="people">{PANEL.panelists.map((p, n) => <Person key={n} p={p} tag={`Panelist ${n + 1}`} />)}</div>
  </>
);

function Schedule() {
  const live = useLive();
  const [tab, setTab] = useState(() => { const i = SCHEDULE.findIndex((g) => g.items.some((it) => it[0] + it[1] === live)); return i < 0 ? 1 : i; });
  return (
    <>
      <div className="tabs" role="tablist">
        {SCHEDULE.map((s, n) => (
          <button key={s.group} role="tab" aria-selected={tab === n} className={tab === n ? "on" : ""} onClick={() => setTab(n)}>{s.group}</button>
        ))}
      </div>
      <ul className="timeline">
        {SCHEDULE[tab].items.map(([t, what, dur]) => (
          <li key={t + what} className={`${what === "Break" ? "brk" : ""} ${live === t + what ? "live" : ""}`}>
            <time>{t}</time>
            <span>{what}{live === t + what && <span className="badge">LIVE NOW</span>}</span>
            {dur && <em>{dur}</em>}
          </li>
        ))}
      </ul>
    </>
  );
}

const CAL = "https://calendar.google.com/calendar/render?action=TEMPLATE&text=TechTonic&dates=20261031T040000Z/20261031T100000Z&location=" + encodeURIComponent(EVENT.venue);

/* ---------- pages ---------- */
function PanelPage() {
  return (
    <>
      <div className="page-head">
        <a className="back" href="#top">← Back to home</a>
        <h1>Panel Discussion</h1>
        <p className="meta">{PANEL.time} · {EVENT.dateLabel} · {EVENT.venue}</p>
        <p className="topic-box">{PANEL.topic}</p>
        <ul className="covers">{PANEL.covers.map((c) => <li key={c}>{c}</li>)}</ul>
      </div>
      <section className="sec"><PanelPeople />
        <div className="link-row"><Cta>Register to attend</Cta></div>
      </section>
    </>
  );
}

function Home() {
  const sun = useRef(null);
  const raf = useRef(0);
  const move = (e) => {
    if (e.pointerType !== "mouse") return;
    cancelAnimationFrame(raf.current);
    raf.current = requestAnimationFrame(() => {
      const x = (e.clientX / window.innerWidth - 0.5) * 50, y = (e.clientY / window.innerHeight - 0.5) * 30;
      sun.current?.style.setProperty("--mx", `${x}px`); sun.current?.style.setProperty("--my", `${y}px`);
    });
  };
  return (
    <>
      <section className="hero" onPointerMove={move}>
        <div className="sun" ref={sun} aria-hidden="true" />
        <p className="presents">Techno Clubs, Medicaps University presents</p>
        <h1>TECHTONIC</h1>
        <p className="band">Tech × Talent × Together</p>
        <Rotator />
        <p className="script">The future of tech starts here.</p>
        <Countdown />
        <p className="meta">{EVENT.dateLabel} · {EVENT.time}<br />{EVENT.venue}</p>
        <div className="hero-row"><Cta /><a className="btn ghost" href="#play">Play Patch Panic</a><Cta ghost href={CAL}>Add to calendar</Cta></div>
      </section>
      <Marquee />

      <section id="segments" className="sec">
        <h2>Four segments, one day</h2>
        <p className="lead">Learn, compete, discuss, express. A one-day tech + talent experience where ideas, skills and creativity come together.</p>
        <div className="grid4">
          {SEGMENTS.map((s) => <article key={s.title} className="seg"><span aria-hidden="true">{s.icon}</span><h3>{s.title}</h3><p>{s.text}</p></article>)}
        </div>
      </section>

      <section id="schedule" className="sec alt">
        <h2>The day, minute by minute</h2>
        <Schedule />
        <p className="note">9:30 AM to 3:30 PM, 6 hours in total.</p>
      </section>

      <section id="speaker" className="sec">
        <h2>Meet the speaker</h2>
        <div className="speaker has-photo">
          <Photo src={SPEAKER.photo} name={SPEAKER.name} />
          <div>
            <h3>{SPEAKER.name}</h3>
            <p className="role">{SPEAKER.role}</p>
            <p className="topic"><b>Topic:</b> {SPEAKER.topic}</p>
            <ul>{SPEAKER.points.map((p) => <li key={p}>{p}</li>)}</ul>
          </div>
          <div className="facts">{SPEAKER.facts.map(([n, l]) => <div key={n}><b>{n}</b><span>{l}</span></div>)}</div>
        </div>
      </section>

      <section id="panel" className="sec alt">
        <h2>The panel</h2>
        <p className="lead">{PANEL.topic}. {PANEL.time}.</p>
        <PanelPeople />
        <div className="link-row"><a className="btn ghost" href="#/panel">Open the panel page</a></div>
      </section>

      <section id="play" className="sec">
        <h2>Warm up: Patch Panic</h2>
        <p className="lead">Squash the bugs, spare the features, chain a combo. Beat your best before the real event.</p>
        <Suspense fallback={<div className="crt" style={{ padding: "3rem", textAlign: "center" }}>Compiling…</div>}><Game /></Suspense>
      </section>

      <section className="sec alt">
        <h2>Why come?</h2>
        <ul className="goals">{OBJECTIVES.map((o) => <li key={o}>{o}</li>)}</ul>
      </section>

      <section className="sec cta-sec">
        <h2>Got a talent? Take the mic.</h2>
        <p className="lead">Engineers Got Talent is open to Medicaps University students. Singing, stand-up, poetry, instruments: register in advance.</p>
        <div className="row"><Cta>Register for TechTonic</Cta><Cta ghost href={OPEN_MIC_URL || REGISTER_URL}>Sign up for open mic</Cta></div>
      </section>
    </>
  );
}

/* ---------- app ---------- */
export default function App() {
  const hash = useHash();
  const onPanel = hash.startsWith("#/panel");
  const bar = useRef(null);

  useEffect(() => {
    if (onPanel) { window.scrollTo(0, 0); return; }
    const id = hash.slice(1);
    requestAnimationFrame(() => (id && id !== "top" ? document.getElementById(id)?.scrollIntoView() : id === "top" && window.scrollTo(0, 0)));
  }, [hash, onPanel]);

  useEffect(() => {
    let r = 0;
    const f = () => { cancelAnimationFrame(r); r = requestAnimationFrame(() => {
      const d = document.documentElement;
      if (bar.current) bar.current.style.transform = `scaleX(${d.scrollTop / Math.max(1, d.scrollHeight - d.clientHeight)})`;
    }); };
    window.addEventListener("scroll", f, { passive: true });
    return () => window.removeEventListener("scroll", f);
  }, []);

  return (
    <>
      <div className="progress" ref={bar} aria-hidden="true" />
      <header className="nav">
        <a href="#top" className="logo">TechTonic</a>
        <nav>
          <a href="#segments">Segments</a><a href="#schedule">Schedule</a><a href="#speaker">Speaker</a>
          <a href="#/panel">Panel</a><a href="#play">Play</a>
          <Cta>Register</Cta>
        </nav>
      </header>
      <main id="top">{onPanel ? <PanelPage /> : <Home />}</main>
      <footer>
        <p>Organized by Techno Clubs, Medicaps University, Indore · Tech Connects People</p>
        <p><a href="https://www.medicaps.ac.in" target="_blank" rel="noopener noreferrer">www.medicaps.ac.in</a></p>
      </footer>
    </>
  );
}