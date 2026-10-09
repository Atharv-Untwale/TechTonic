import { useRef, useCallback } from "react";

export default function Magnetic({ children, strength = 0.22, className = "" }) {
  const ref = useRef(null);

  const onPointerMove = useCallback((e) => {
    if (e.pointerType === "touch" || !ref.current) return;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;

    const dx = (e.clientX - centerX) * strength;
    const dy = (e.clientY - centerY) * strength;

    ref.current.style.transform = `translate3d(${dx.toFixed(2)}px, ${dy.toFixed(2)}px, 0)`;
  }, [strength]);

  const onPointerLeave = useCallback(() => {
    if (!ref.current) return;
    ref.current.style.transform = "translate3d(0px, 0px, 0)";
    ref.current.style.transition = "transform 0.4s cubic-bezier(0.2, 0.8, 0.2, 1)";
  }, []);

  const onPointerEnter = useCallback(() => {
    if (!ref.current) return;
    ref.current.style.transition = "transform 0.1s ease-out";
  }, []);

  return (
    <span
      ref={ref}
      className={`magnetic-wrap ${className}`}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      onPointerEnter={onPointerEnter}
      style={{ display: "inline-block", willChange: "transform" }}
    >
      {children}
    </span>
  );
}
