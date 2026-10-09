import { memo } from "react";
import CyberText from "@/components/common/CyberText.jsx";
import Button from "@/components/common/Button.jsx";

export default memo(function Navbar() {
  return (
    <header className="nav">
      <a href="#top" className="logo">
        <CyberText text="TechTonic" />
      </a>
      <nav>
        <a href="#segments">Segments</a>
        <a href="#schedule">Schedule</a>
        <a href="#speaker">Speaker</a>
        <a href="#/panel">Panel</a>
        <a href="#play">Play</a>
        <Button>Register</Button>
      </nav>
    </header>
  );
});
