import { useState, useEffect } from "react";
import { EVENT, SCHEDULE } from "@/config/eventConfig.js";

const FLAT_ITEMS = SCHEDULE.flatMap((group) => group.items);
const getTimestamp = (hhmm) => new Date(`${EVENT.start.slice(0, 10)}T${hhmm}:00+05:30`).getTime();

export function useLiveSchedule() {
  const getActiveItem = () => {
    const now = Date.now();
    const activeIndex = FLAT_ITEMS.findIndex((item, index) => {
      const start = getTimestamp(item[0]);
      const nextStart = index < FLAT_ITEMS.length - 1 ? getTimestamp(FLAT_ITEMS[index + 1][0]) : start + 3600e3;
      return now >= start && now < nextStart;
    });

    return activeIndex < 0 ? null : FLAT_ITEMS[activeIndex][0] + FLAT_ITEMS[activeIndex][1];
  };

  const [live, setLive] = useState(getActiveItem);

  useEffect(() => {
    const interval = setInterval(() => setLive(getActiveItem()), 30000);
    return () => clearInterval(interval);
  }, []);

  return live;
}
