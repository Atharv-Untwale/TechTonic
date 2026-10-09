import { useState, useEffect, useRef, useCallback } from "react";
import { getTop, submitScore, isRemote } from "./leaderboard.js";

// PATCH PANIC: squash bugs, spare the features, chain combos.
const DUR = 30;
const MAX_ON_SCREEN = 7;
const KINDS = {
  bug: { emoji: "🐛", pts: 10, life: 1900, name: "Bug" },
  gold: { emoji: "🪲", pts: 30, life: 1100, name: "Critical bug" },
  feature: { emoji: "⭐", pts: -15, life: 1900, name: "Feature (do not squash!)" },
};
const RANKS = [[0, "Intern on day one"], [120, "Junior Dev"], [250, "Senior DevOps"], [380, "10x Engineer"]];
const rank = (s) => [...RANKS].reverse().find(([min]) => s >= min)[1];
const loadBest = () => { try { return +localStorage.getItem("tt-best") || 0; } catch { return 0; } };
const loadName = () => { try { return localStorage.getItem("tt-name") || ""; } catch { return ""; } };
const saveBest = (v) => { try { localStorage.setItem("tt-best", v); } catch {} };

export default function Game() {
  const [phase, setPhase] = useState("idle"); // idle | play | over
  const [targets, setTargets] = useState([]);
  const [pops, setPops] = useState([]);
  const [score, setScore] = useState(0);
  const [combo, setCombo] = useState(1);
  const [left, setLeft] = useState(DUR);
  const [flash, setFlash] = useState("");
  const [best, setBest] = useState(loadBest);
  const [board, setBoard] = useState([]);
  const [name, setName] = useState(loadName);
  const [saved, setSaved] = useState(null); // {name, score} after submit
  const [busy, setBusy] = useState(false);
  const ref = useRef({ targets: [], id: 0, combo: 1, score: 0 });

  const pop = useCallback((x, y, text, bad) => {
    const id = ++ref.current.id;
    setPops((p) => [...p, { id, x, y, text, bad }]);
    setTimeout(() => setPops((p) => p.filter((q) => q.id !== id)), 800);
  }, []);

  useEffect(() => { getTop().then(setBoard); }, []);

  const submit = async (e) => {
    e.preventDefault();
    setBusy(true);
    const clean = await submitScore(name, score);
    try { localStorage.setItem("tt-name", clean); } catch {}
    setSaved({ name: clean, score });
    if (isRemote) await new Promise((r) => setTimeout(r, 1200)); // let the sheet catch up
    setBoard(await getTop());
    setBusy(false);
  };

  const start = () => {
    setSaved(null);
    ref.current = { targets: [], id: 0, combo: 1, score: 0 };
    setTargets([]); setPops([]); setScore(0); setCombo(1); setLeft(DUR); setPhase("play");
  };

  useEffect(() => {
    if (phase !== "play") return;
    const t0 = performance.now();
    const r = ref.current;
    const timer = setInterval(() => {
      const now = performance.now();
      const el = (now - t0) / 1000;
      if (el >= DUR) {
        clearInterval(timer);
        r.targets = []; setTargets([]); setLeft(0);
        setBest((b) => { const nb = Math.max(b, r.score); saveBest(nb); return nb; });
        setPhase("over");
        return;
      }
      setLeft(DUR - el);
      let changed = false;
      const alive = r.targets.filter((x) => {
        const ok = now - x.born < KINDS[x.kind].life;
        if (!ok) { changed = true; if (x.kind !== "feature" && r.combo > 1) { r.combo = 1; setCombo(1); } }
        return ok;
      });
      r.targets = alive;
      const p = 0.14 + (el / DUR) * 0.14; // ramps up as the round goes on
      if (alive.length < MAX_ON_SCREEN && Math.random() < p) {
        const k = Math.random();
        r.targets.push({ id: ++r.id, kind: k < 0.2 ? "feature" : k < 0.32 ? "gold" : "bug", x: 6 + Math.random() * 82, y: 8 + Math.random() * 74, born: now });
        changed = true;
      }
      if (changed) setTargets([...r.targets]);
    }, 100);
    return () => clearInterval(timer);
  }, [phase]);

  const squash = (t) => {
    const r = ref.current;
    r.targets = r.targets.filter((x) => x.id !== t.id);
    setTargets([...r.targets]);
    const k = KINDS[t.kind];
    if (t.kind === "feature") {
      r.score = Math.max(0, r.score + k.pts); r.combo = 1; setCombo(1);
      pop(t.x, t.y, "That was a feature! -15", true); setFlash("bad");
    } else {
      const gain = k.pts * Math.min(5, r.combo);
      r.score += gain; r.combo += 1; setCombo(r.combo);
      pop(t.x, t.y, `+${gain}`, false); setFlash("good");
    }
    setScore(r.score);
    setTimeout(() => setFlash(""), 160);
  };

  return (
    <div className="play-wrap">
    <div className={`crt ${flash}`}>
      <div className="hud">
        <span>Score <b>{score}</b></span>
        <span className={`combo ${combo > 2 ? "hot" : ""}`}>Combo <b>x{Math.min(5, combo)}</b></span>
        <span>Best <b>{best}</b></span>
      </div>
      <div className="clock"><i style={{ width: `${(left / DUR) * 100}%` }} /></div>

      <div className="arena">
        {phase === "play" && targets.map((t) => (
          <button key={t.id} className={`tgt ${t.kind}`} style={{ left: `${t.x}%`, top: `${t.y}%`, animationDuration: `${KINDS[t.kind].life}ms` }}
            onClick={() => squash(t)} aria-label={KINDS[t.kind].name}>{KINDS[t.kind].emoji}</button>
        ))}
        {pops.map((p) => <span key={p.id} className={`pop ${p.bad ? "bad" : ""}`} style={{ left: `${p.x}%`, top: `${p.y}%` }}>{p.text}</span>)}

        {phase !== "play" && (
          <div className="overlay">
            {phase === "idle" ? (
              <>
                <h3>Patch Panic</h3>
                <p>Production is crawling with bugs and you have {DUR} seconds.</p>
                <ul>
                  <li>🐛 Squash bugs: <b>+10</b></li>
                  <li>🪲 Critical bugs vanish fast: <b>+30</b></li>
                  <li>⭐ Features are NOT bugs: <b>-15</b></li>
                  <li>Chain squashes for a combo of up to <b>x5</b>. A miss resets it.</li>
                </ul>
              </>
            ) : (
              <>
                <h3>Deploy complete</h3>
                <p className="big">{score}</p>
                <p>Rank: <b>{rank(score)}</b>{score >= best && score > 0 ? " · New best!" : ""}</p>
                {score > 0 && !saved && (
                  <form className="namebox" onSubmit={submit}>
                    <input value={name} onChange={(e) => setName(e.target.value)} maxLength={16} placeholder="Your name" aria-label="Your name" required />
                    <button className="btn" disabled={busy}>{busy ? "Saving…" : "Post score"}</button>
                  </form>
                )}
                {saved && <p className="ok">Posted as {saved.name}!</p>}
              </>
            )}
            <button className="btn" onClick={start}>{phase === "idle" ? "Start debugging" : "Debug again"}</button>
          </div>
        )}
      </div>
    </div>
    <Board rows={board} me={saved} />
    </div>
  );
}

function Board({ rows, me }) {
  return (
    <aside className="board" aria-label="Leaderboard">
      <h3>Leaderboard</h3>
      <p className="src">{isRemote ? "Live, everyone playing" : "Top scores on this device"}</p>
      {rows.length === 0 ? <p className="empty">No scores yet. Be the first!</p> : (
        <ol>
          {rows.map((r, n) => (
            <li key={n} className={me && me.name === r.name && me.score === r.score ? "me" : ""}>
              <span className="pos">{["🥇", "🥈", "🥉"][n] || n + 1}</span>
              <span className="nm">{r.name}</span>
              <b>{r.score}</b>
            </li>
          ))}
        </ol>
      )}
    </aside>
  );
}