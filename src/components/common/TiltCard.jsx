import { useRef, useState, useCallback } from "react";

export default function TiltCard({
  children,
  className = "",
  maxTilt = 7,
  perspective = 1000,
  as: Component = "article",
  ...props
}) {
  const cardRef = useRef(null);
  const [style, setStyle] = useState({});
  const [glareStyle, setGlareStyle] = useState({ opacity: 0 });

  const onPointerMove = useCallback((e) => {
    if (e.pointerType === "touch" || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const normX = (x / rect.width - 0.5) * 2;
    const normY = (y / rect.height - 0.5) * 2;

    const rotX = -normY * maxTilt;
    const rotY = normX * maxTilt;

    setStyle({
      transform: `perspective(${perspective}px) rotateX(${rotX.toFixed(2)}deg) rotateY(${rotY.toFixed(2)}deg) translateZ(6px)`,
      transition: "transform 0.08s ease-out",
    });

    setGlareStyle({
      opacity: 0.22,
      background: `radial-gradient(circle at ${x}px ${y}px, rgba(240, 185, 43, 0.45) 0%, transparent 65%)`,
    });
  }, [maxTilt, perspective]);

  const onPointerLeave = useCallback(() => {
    setStyle({
      transform: `perspective(${perspective}px) rotateX(0deg) rotateY(0deg) translateZ(0px)`,
      transition: "transform 0.45s cubic-bezier(0.2, 0.8, 0.2, 1)",
    });
    setGlareStyle({
      opacity: 0,
      transition: "opacity 0.45s ease-out",
    });
  }, [perspective]);

  return (
    <Component
      ref={cardRef}
      className={`tilt-card ${className}`}
      style={style}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      {...props}
    >
      <div className="tilt-glare" style={glareStyle} aria-hidden="true" />
      {children}
    </Component>
  );
}
