import { LEADERBOARD_URL } from "./config.js";

const KEY = "tt-board";
export const isRemote = !!LEADERBOARD_URL;
const read = () => { try { return JSON.parse(localStorage.getItem(KEY)) || []; } catch { return []; } };

export async function getTop() {
  if (!isRemote) return read();
  try {
    const d = await (await fetch(LEADERBOARD_URL)).json();
    return Array.isArray(d) ? d.slice(0, 10) : read();
  } catch { return read(); }
}

export async function submitScore(name, score) {
  const clean = name.trim().slice(0, 16) || "Anonymous";
  const next = [...read(), { name: clean, score }].sort((a, b) => b.score - a.score).slice(0, 10);
  try { localStorage.setItem(KEY, JSON.stringify(next)); } catch {}
  if (isRemote) {
    try { await fetch(LEADERBOARD_URL, { method: "POST", mode: "no-cors", headers: { "Content-Type": "text/plain" }, body: JSON.stringify({ name: clean, score }) }); } catch {}
  }
  return clean;
}