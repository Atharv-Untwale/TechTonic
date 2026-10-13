import { memo, useState, useEffect, useCallback } from "react";
import CyberText from "@/components/common/CyberText.jsx";
import Button from "@/components/common/Button.jsx";

export default memo(function Navbar() {
  const [open, setOpen] = useState(false);
  const close = useCallback(() => setOpen(false), []);

  // Close with the Escape key while the mobile menu is open
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && close();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, close]);

  // Reset if the window is resized up to desktop width
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 861px)");
    const onChange = () => mq.matches && close();
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, [close]);

  return (
    <header className="nav">
      <a href="#top" className="logo" onClick={close}>
        <CyberText text="TechTonic" />
      </a>

      <button
        type="button"
        className="nav-toggle"
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        aria-controls="site-nav"
        onClick={() => setOpen((o) => !o)}
      >
        <span />
        <span />
        <span />
      </button>

      {/* Any link tapped inside the menu closes it */}
      <nav id="site-nav" className={open ? "open" : ""} onClick={(e) => e.target.closest("a") && close()}>
        <a href="#segments">Segments</a>
        <a href="#schedule">Schedule</a>
        <a href="#speaker">Speaker</a>
        <a href="#/panel">Panel</a>
        <a href="#/organisers">Organisers</a>
        <a href="#play">Play</a>
        <Button>Register</Button>
      </nav>
    </header>
  );
});