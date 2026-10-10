import { memo } from "react";
import Magnetic from "./Magnetic.jsx";
import { REGISTER_URL } from "@/config/eventConfig.js";

const Button = memo(function Button({
  children = "Register now",
  href,
  ghost = false,
  className = "",
  onClick,
  type,
  target,
  rel,
  magnetic = true,
  strength = 0.22,
  ...props
}) {
  const cls = `btn ${ghost ? "ghost" : ""} ${className}`.trim();

  // A button with no href that does something (onClick / submit) stays a <button>.
  // A bare <Button>Register</Button> still falls back to the registration form.
  const isAction = Boolean(onClick) || Boolean(type);
  const link = href ?? (isAction ? undefined : REGISTER_URL);

  let btnElement;
  if (link) {
    const internal = link.startsWith("#"); // in-page anchors: same tab, no rel
    btnElement = (
      <a
        className={cls}
        href={link}
        target={internal ? undefined : target ?? "_blank"}
        rel={internal ? undefined : rel ?? "noopener noreferrer"}
        onClick={onClick}
        {...props}
      >
        {children}
      </a>
    );
  } else {
    btnElement = (
      <button className={cls} type={type ?? "button"} onClick={onClick} {...props}>
        {children}
      </button>
    );
  }

  if (!magnetic) return btnElement;
  return <Magnetic strength={strength}>{btnElement}</Magnetic>;
});

export default Button;