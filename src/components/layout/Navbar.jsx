import { memo } from "react";
import Button from "@/components/common/Button.jsx";

export default memo(function Navbar() {
  return (
    <header className="nav">
      <a href="#top" className="logo">
        <span className="dot" aria-hidden="true" />
        <span>TechTonic</span>
      </a>
      <nav>
        <a href="#segments">Segments</a>
        <a href="#schedule">Schedule</a>
        <a href="#speaker">Speaker</a>
        <a href="#/panel">Panel</a>
        <a href="#play">Patch Panic</a>
        <Button>Register</Button>
      </nav>
    </header>
  );
});
