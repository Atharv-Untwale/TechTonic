import { useState, useEffect } from "react";

export function useCountdown(targetDate) {
  const calculateRemaining = () => Math.max(0, new Date(targetDate) - Date.now());
  const [ms, setMs] = useState(calculateRemaining);

  useEffect(() => {
    const timer = setInterval(() => setMs(calculateRemaining()), 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

  const totalSeconds = Math.floor(ms / 1000);
  return [
    ["days", Math.floor(totalSeconds / 86400)],
    ["hrs", Math.floor(totalSeconds / 3600) % 24],
    ["min", Math.floor(totalSeconds / 60) % 60],
    ["sec", totalSeconds % 60],
  ];
}
