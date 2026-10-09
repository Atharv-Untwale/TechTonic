import { memo } from "react";
import TiltCard from "@/components/common/TiltCard.jsx";
import { isRemoteLeaderboard } from "@/services/leaderboardService.js";

const MEDALS = ["🥇", "🥈", "🥉"];

export default memo(function Leaderboard({ rows, currentUser }) {
  return (
    <TiltCard as="aside" className="board" maxTilt={6} aria-label="Leaderboard">
      <h3>Leaderboard</h3>
      <p className="src">
        {isRemoteLeaderboard ? "Live, everyone playing" : "Top scores on this device"}
      </p>
      {rows.length === 0 ? (
        <p className="empty">No scores yet. Be the first!</p>
      ) : (
        <ol>
          {rows.map((entry, index) => (
            <li
              key={index}
              className={
                currentUser &&
                currentUser.name === entry.name &&
                currentUser.score === entry.score
                  ? "me"
                  : ""
              }
            >
              <span className="pos">{MEDALS[index] || index + 1}</span>
              <span className="nm">{entry.name}</span>
              <b>{entry.score}</b>
            </li>
          ))}
        </ol>
      )}
    </TiltCard>
  );
});
