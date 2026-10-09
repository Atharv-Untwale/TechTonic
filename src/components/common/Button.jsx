import { memo } from "react";
import Magnetic from "./Magnetic.jsx";
import { REGISTER_URL } from "@/config/eventConfig.js";

const Button = memo(function Button({
  children = "Register now",
  href = REGISTER_URL,
  ghost = false,
  className = "",
  onClick,
  target = "_blank",
  rel = "noopener noreferrer",
  magnetic = true,
  strength = 0.22,
  ...props
}) {
  const btnElement = href ? (
    <a
      className={`btn ${ghost ? "ghost" : ""} ${className}`}
      href={href}
      target={target}
      rel={rel}
      onClick={onClick}
      {...props}
    >
      {children}
    </a>
  ) : (
    <button
      className={`btn ${ghost ? "ghost" : ""} ${className}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );

  if (!magnetic) return btnElement;

  return <Magnetic strength={strength}>{btnElement}</Magnetic>;
});

export default Button;
