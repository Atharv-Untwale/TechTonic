
import { memo } from "react";

export default memo(function Footer() {
  return (
    <footer>
      <p>
        Organized by Techno Clubs, Medicaps University, Indore
        · Tech Connects People
      </p>

      <div className="footer-links">
        <a
          href="mailto:technoclubs@medicaps.ac.in"
          target="_blank"
          rel="noopener noreferrer"
        >
          Email
        </a>

        <a
          href="https://www.instagram.com/medicaps_technoclubs/?hl=en"
          target="_blank"
          rel="noopener noreferrer"
        >
          Instagram
        </a>
      </div>
    </footer>
  );
});

