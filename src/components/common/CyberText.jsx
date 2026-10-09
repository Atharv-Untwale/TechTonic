import { useState, useRef, useEffect, memo } from "react";

const GLYPHS = "01#X*+~/<>✦§%=?";

export default memo(function CyberText({ text, as: Component = "span", className = "", ...props }) {
  const [display, setDisplay] = useState(text);
  const frameRef = useRef(0);
  const isScrambling = useRef(false);

  useEffect(() => {
    setDisplay(text);
  }, [text]);

  const scramble = () => {
    if (isScrambling.current) return;
    isScrambling.current = true;
    let iteration = 0;
    const maxIterations = text.length * 2.5;

    const tick = () => {
      setDisplay(
        text
          .split("")
          .map((char, index) => {
            if (char === " " || char === "\n") return char;
            if (index < iteration / 2.5) {
              return text[index];
            }
            return GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
          })
          .join("")
      );

      iteration += 1;
      if (iteration < maxIterations) {
        frameRef.current = requestAnimationFrame(tick);
      } else {
        setDisplay(text);
        isScrambling.current = false;
      }
    };

    frameRef.current = requestAnimationFrame(tick);
  };

  useEffect(() => {
    return () => cancelAnimationFrame(frameRef.current);
  }, []);

  return (
    <Component
      className={`cyber-text ${className}`}
      onMouseEnter={scramble}
      aria-label={text}
      {...props}
    >
      {display}
    </Component>
  );
});
