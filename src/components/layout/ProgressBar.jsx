import { useEffect, useRef, memo } from "react";

export default memo(function ProgressBar() {
  const barRef = useRef(null);

  useEffect(() => {
    let rafId = 0;
    const handleScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        const doc = document.documentElement;
        if (barRef.current) {
          const progress = doc.scrollTop / Math.max(1, doc.scrollHeight - doc.clientHeight);
          barRef.current.style.transform = `scaleX(${progress})`;
        }
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return <div className="progress" ref={barRef} aria-hidden="true" />;
});
