import { useState, useEffect, useRef, useCallback } from "react";
import { fetchTopScores, submitPlayerScore, isRemoteLeaderboard } from "@/services/leaderboardService.js";
import Leaderboard from "./Leaderboard.jsx";
import Button from "@/components/common/Button.jsx";

const ROUND_DURATION = 30;
const MAX_TARGETS_ON_SCREEN = 7;

const TARGET_KINDS = {
  bug: { emoji: "🐛", pts: 10, life: 1900, name: "Bug" },
  gold: { emoji: "🪲", pts: 30, life: 1100, name: "Critical bug" },
  feature: { emoji: "⭐", pts: -15, life: 1900, name: "Feature (do not squash!)" },
};

const DEV_RANKS = [
  [0, "Intern on day one"],
  [120, "Junior Dev"],
  [250, "Senior DevOps"],
  [380, "10x Engineer"],
];

const getPlayerRank = (score) => [...DEV_RANKS].reverse().find(([min]) => score >= min)[1];

const getStoredBestScore = () => {
  try {
    return +localStorage.getItem("tt-best") || 0;
  } catch {
    return 0;
  }
};

const getStoredPlayerName = () => {
  try {
    return localStorage.getItem("tt-name") || "";
  } catch {
    return "";
  }
};

const setStoredBestScore = (score) => {
  try {
    localStorage.setItem("tt-best", score);
  } catch {}
};

export default function Game() {
  const [phase, setPhase] = useState("idle"); // idle | play | over
  const [targets, setTargets] = useState([]);
  const [pops, setPops] = useState([]);
  const [score, setScore] = useState(0);
  const [combo, setCombo] = useState(1);
  const [timeLeft, setTimeLeft] = useState(ROUND_DURATION);
  const [flashClass, setFlashClass] = useState("");
  const [bestScore, setBestScore] = useState(getStoredBestScore);
  const [leaderboardRows, setLeaderboardRows] = useState([]);
  const [playerName, setPlayerName] = useState(getStoredPlayerName);
  const [savedScore, setSavedScore] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const gameRef = useRef({ targets: [], id: 0, combo: 1, score: 0 });

  const triggerPopText = useCallback((x, y, text, isBad) => {
    const id = ++gameRef.current.id;
    setPops((prev) => [...prev, { id, x, y, text, bad: isBad }]);
    setTimeout(() => setPops((prev) => prev.filter((item) => item.id !== id)), 800);
  }, []);

  useEffect(() => {
    fetchTopScores().then(setLeaderboardRows);
  }, []);

  const handleScoreSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const cleaned = await submitPlayerScore(playerName, score);
    try {
      localStorage.setItem("tt-name", cleaned);
    } catch {}
    setSavedScore({ name: cleaned, score });
    if (isRemoteLeaderboard) {
      await new Promise((resolve) => setTimeout(resolve, 1200));
    }
    setLeaderboardRows(await fetchTopScores());
    setIsSubmitting(false);
  };

  const startRound = () => {
    setSavedScore(null);
    gameRef.current = { targets: [], id: 0, combo: 1, score: 0 };
    setTargets([]);
    setPops([]);
    setScore(0);
    setCombo(1);
    setTimeLeft(ROUND_DURATION);
    setPhase("play");
  };

  useEffect(() => {
    if (phase !== "play") return;
    const startTime = performance.now();
    const game = gameRef.current;

    const gameInterval = setInterval(() => {
      const now = performance.now();
      const elapsed = (now - startTime) / 1000;

      if (elapsed >= ROUND_DURATION) {
        clearInterval(gameInterval);
        game.targets = [];
        setTargets([]);
        setTimeLeft(0);
        setBestScore((currentBest) => {
          const newBest = Math.max(currentBest, game.score);
          setStoredBestScore(newBest);
          return newBest;
        });
        setPhase("over");
        return;
      }

      setTimeLeft(ROUND_DURATION - elapsed);
      let changed = false;

      const activeTargets = game.targets.filter((target) => {
        const isAlive = now - target.born < TARGET_KINDS[target.kind].life;
        if (!isAlive) {
          changed = true;
          if (target.kind !== "feature" && game.combo > 1) {
            game.combo = 1;
            setCombo(1);
          }
        }
        return isAlive;
      });

      game.targets = activeTargets;
      const spawnProbability = 0.14 + (elapsed / ROUND_DURATION) * 0.14;

      if (activeTargets.length < MAX_TARGETS_ON_SCREEN && Math.random() < spawnProbability) {
        const rand = Math.random();
        game.targets.push({
          id: ++game.id,
          kind: rand < 0.2 ? "feature" : rand < 0.32 ? "gold" : "bug",
          x: 6 + Math.random() * 82,
          y: 8 + Math.random() * 74,
          born: now,
        });
        changed = true;
      }

      if (changed) setTargets([...game.targets]);
    }, 100);

    return () => clearInterval(gameInterval);
  }, [phase]);

  const squashTarget = (target) => {
    const game = gameRef.current;
    game.targets = game.targets.filter((t) => t.id !== target.id);
    setTargets([...game.targets]);

    const info = TARGET_KINDS[target.kind];
    if (target.kind === "feature") {
      game.score = Math.max(0, game.score + info.pts);
      game.combo = 1;
      setCombo(1);
      triggerPopText(target.x, target.y, "That was a feature! -15", true);
      setFlashClass("bad");
    } else {
      const pointsGained = info.pts * Math.min(5, game.combo);
      game.score += pointsGained;
      game.combo += 1;
      setCombo(game.combo);
      triggerPopText(target.x, target.y, `+${pointsGained}`, false);
      setFlashClass("good");
    }

    setScore(game.score);
    setTimeout(() => setFlashClass(""), 160);
  };

  return (
    <div className="play-wrap">
      <div className={`crt ${flashClass}`}>
        <div className="hud">
          <span>
            Score <b>{score}</b>
          </span>
          <span className={`combo ${combo > 2 ? "hot" : ""}`}>
            Combo <b>x{Math.min(5, combo)}</b>
          </span>
          <span>
            Best <b>{bestScore}</b>
          </span>
        </div>
        <div className="clock">
          <i style={{ width: `${(timeLeft / ROUND_DURATION) * 100}%` }} />
        </div>

        <div className="arena">
          {phase === "play" &&
            targets.map((target) => (
              <button
                key={target.id}
                className={`tgt ${target.kind}`}
                style={{
                  left: `${target.x}%`,
                  top: `${target.y}%`,
                  animationDuration: `${TARGET_KINDS[target.kind].life}ms`,
                }}
                onClick={() => squashTarget(target)}
                aria-label={TARGET_KINDS[target.kind].name}
              >
                {TARGET_KINDS[target.kind].emoji}
              </button>
            ))}

          {pops.map((pop) => (
            <span
              key={pop.id}
              className={`pop ${pop.bad ? "bad" : ""}`}
              style={{ left: `${pop.x}%`, top: `${pop.y}%` }}
            >
              {pop.text}
            </span>
          ))}

          {phase !== "play" && (
            <div className="overlay">
              {phase === "idle" ? (
                <>
                  <h3>Patch Panic</h3>
                  <p>Production is crawling with bugs and you have {ROUND_DURATION} seconds.</p>
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
                  <p>
                    Rank: <b>{getPlayerRank(score)}</b>
                    {score >= bestScore && score > 0 ? " · New best!" : ""}
                  </p>
                  {score > 0 && !savedScore && (
                    <form className="namebox" onSubmit={handleScoreSubmit}>
                      <input
                        value={playerName}
                        onChange={(e) => setPlayerName(e.target.value)}
                        maxLength={16}
                        placeholder="Your name"
                        aria-label="Your name"
                        required
                        disabled={isSubmitting}
                      />
                      <Button onClick={undefined} type="submit" disabled={isSubmitting}>
                        {isSubmitting ? "Saving..." : "Submit score"}
                      </Button>
                    </form>
                  )}
                  {savedScore && <p className="ok">Posted as {savedScore.name}!</p>}
                </>
              )}
              <Button onClick={startRound}>
                {phase === "idle" ? "Start debugging" : "Debug again"}
              </Button>
            </div>
          )}
        </div>
      </div>
      <Leaderboard rows={leaderboardRows} currentUser={savedScore} />
    </div>
  );
}
