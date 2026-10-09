import { LEADERBOARD_URL } from "@/config/eventConfig.js";

const STORAGE_KEY = "tt-board";
export const isRemoteLeaderboard = !!LEADERBOARD_URL;

const readLocalScores = () => {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  } catch {
    return [];
  }
};

export async function fetchTopScores() {
  if (!isRemoteLeaderboard) return readLocalScores();
  try {
    const response = await fetch(LEADERBOARD_URL);
    const data = await response.json();
    return Array.isArray(data) ? data.slice(0, 10) : readLocalScores();
  } catch {
    return readLocalScores();
  }
}

export async function submitPlayerScore(name, score) {
  const cleanName = name.trim().slice(0, 16) || "Anonymous";
  const updatedScores = [...readLocalScores(), { name: cleanName, score }]
    .sort((a, b) => b.score - a.score)
    .slice(0, 10);

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedScores));
  } catch {}

  if (isRemoteLeaderboard) {
    try {
      await fetch(LEADERBOARD_URL, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "text/plain" },
        body: JSON.stringify({ name: cleanName, score }),
      });
    } catch {}
  }

  return cleanName;
}
