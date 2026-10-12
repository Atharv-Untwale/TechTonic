import { memo } from "react";
import { FACULTY_MEMBERS, CORE_TEAM_MEMBERS } from "@/config/teamConfig.js";
import { REGISTER_URL } from "@/config/eventConfig.js";
import CyberText from "@/components/common/CyberText.jsx";
import TiltCard from "@/components/common/TiltCard.jsx";
import Photo from "@/components/common/Photo.jsx";
import Button from "@/components/common/Button.jsx";

export default memo(function TeamPage() {
  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="team-page">
      {/* Page Header */}
      <header className="team-head">
        <Button ghost href="#top" className="back">
          ← Back to home
        </Button>
        <div className="team-title-row">
          <h1>
            <CyberText text="Meet The Organisers" />
          </h1>
          <p className="team-lead">
            The visionary faculty advisory and the energetic core team working behind the scenes to power TechTonic 2026.
          </p>
        </div>

        {/* Quick jump anchor bar */}
        <nav className="team-nav-bar" aria-label="Team sections">
          <span className="label">Sections:</span>
          <button type="button" onClick={() => scrollTo("faculty")} className="team-nav-btn">
            Faculty Mentors <span className="count">{FACULTY_MEMBERS.length}</span>
          </button>
          <button type="button" onClick={() => scrollTo("executives")} className="team-nav-btn">
            Core &amp; Members <span className="count">{CORE_TEAM_MEMBERS.length}</span>
          </button>
        </nav>
      </header>

      {/* SECTION 1: FACULTY MEMBERS (3 Larger Boxes) */}
      <section id="faculty" className="team-section faculty-section">
        <div className="team-section-header">
          <div>
            <span className="team-section-badge gold">Section 01 · Advisory</span>
            <h2>
              <CyberText text="Faculty Mentors" />
            </h2>
            <p className="team-section-sub">
              Esteemed professors and department leadership guiding TechTonic 2026.
            </p>
          </div>
        </div>

        <div className="faculty-grid">
          {FACULTY_MEMBERS.map((faculty) => (
            <TiltCard
              as="article"
              key={faculty.id}
              className="faculty-card"
              maxTilt={7}
            >
              <Photo src={faculty.photo} name={faculty.name} />
              <span className="tag">{faculty.tag}</span>
              <h3>
                <CyberText text={faculty.name} />
              </h3>
              <p className="role">{faculty.role}</p>
              {faculty.dept && <p className="dept">{faculty.dept}</p>}
            </TiltCard>
          ))}
        </div>
      </section>

      {/* SECTION 2: HEADS, EXECUTIVES & CORE TEAM (tags and dept pills removed) */}
      <section id="executives" className="team-section exec-section">
        <div className="team-section-header">
          <div>
            <span className="team-section-badge">Section 02 · Organizing Committee</span>
            <h2>
              <CyberText text="Core &amp; Members" />
            </h2>
            <p className="team-section-sub">
              Student leaders, department heads, and executives driving operations, design, tech, and outreach.
            </p>
          </div>
        </div>

        <div className="exec-grid">
          {CORE_TEAM_MEMBERS.map((member) => (
            <TiltCard
              as="article"
              key={member.id}
              className="exec-card"
              maxTilt={8}
            >
              <Photo src={member.photo} name={member.name} />
              <h3>
                <CyberText text={member.name} />
              </h3>
            </TiltCard>
          ))}
        </div>
      </section>

      {/* Event Registration Call to Action */}
      <div className="team-section">
        <div className="team-cta">
          <h3>Ready for TechTonic 2026?</h3>
          <p>
            Join 600+ students and innovators for keynotes, panel discussions, KBC tech quizzes, and talent showcases.
          </p>
          <div className="team-cta-btns">
            <Button href={REGISTER_URL}>Register for the Event</Button>
            <Button ghost href="#top">
              Return to Top ↑
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
});