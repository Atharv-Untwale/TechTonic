# ⚡ TechTonic 2026

> **Tech × Talent × Together** — A flagship one-day tech and talent experience hosted by Techno Clubs, Medi-Caps University, Indore.

TechTonic is a modern, high-performance web experience built with **React 18**, **Vite 5**, and custom modular CSS. It features award-winning editorial typography, zero-dependency micro-interactions (3D card perspective tilt, bespoke cursor follower, ambient constellation particle canvas, cyber glyph decryption), and an embedded CRT arcade mini-game (*Patch Panic*) with real-time leaderboard capabilities.

---

## 📁 Architecture

The codebase follows a modular, scalable architecture organized by responsibility:

```
TechTonic/
├── public/                     # Static assets (favicons, images, photos)
│   └── photos/                 # Speaker and panelist headshots
├── src/
│   ├── components/             # Reusable UI & interaction units
│   │   ├── common/             # Atomic components (Buttons, TiltCard, CyberText, Photo)
│   │   │   ├── Button.jsx      # Magnetic tactile button with light sweep sheen
│   │   │   ├── CyberText.jsx   # Micro-cipher character decoding on hover
│   │   │   ├── Magnetic.jsx    # Physics-based cursor attraction wrapper
│   │   │   ├── Photo.jsx       # Lazy-loaded image frame with initials fallback
│   │   │   └── TiltCard.jsx    # 3D perspective tilt with dynamic specular glare
│   │   ├── effects/            # High-performance visual canvases & followers
│   │   │   ├── AmbientCanvas.jsx # Interactive 60fps constellation particle sky
│   │   │   └── CursorFollower.jsx # Dual-layer spring-interpolated cursor ring
│   │   ├── game/               # "Patch Panic" arcade CRT mini-game
│   │   │   ├── Game.jsx        # Core game loop, combo counters, rank tiers
│   │   │   └── Leaderboard.jsx # Dynamic leaderboard rankings component
│   │   ├── layout/             # Global structural layout components
│   │   │   ├── Navbar.jsx      # Frosted glassmorphism header with active link indicators
│   │   │   ├── Footer.jsx      # Event credits & university attribution
│   │   │   └── ProgressBar.jsx # Scroll progress gradient indicator
│   │   └── sections/           # Modular landing page sections
│   │       ├── Hero.jsx        # Celestial sun parallax, live countdown, rotator
│   │       ├── Marquee.jsx     # Continuous ticker-tape banner
│   │       ├── Segments.jsx    # 4 interactive 3D segment cards
│   │       ├── Schedule.jsx    # Tabbed timeline with real-time event tracker
│   │       ├── Speaker.jsx     # Keynote speaker profile & stats
│   │       ├── Panel.jsx       # Panel discussion overview & panelist cards
│   │       ├── Objectives.jsx  # Event goals & value proposition
│   │       └── TalentCta.jsx   # Open-mic call to action
│   ├── config/
│   │   └── eventConfig.js      # Central source of truth for all content & dates
│   ├── hooks/                  # Custom reusable React hooks
│   │   ├── useCountdown.js     # Tick-by-tick event countdown calculation
│   │   ├── useHash.js          # Lightweight hash-based client routing
│   │   └── useLiveSchedule.js  # Live schedule slot detector (active during event)
│   ├── pages/                  # Top-level view controllers
│   │   ├── HomePage.jsx        # Full landing page view
│   │   └── PanelPage.jsx       # Dedicated panel discussion page (`#/panel`)
│   ├── services/
│   │   └── leaderboardService.js # LocalStorage + remote Google Apps Script API
│   ├── styles/                 # Modular CSS architecture
│   │   ├── index.css           # Global stylesheet entry point
│   │   ├── variables.css       # Tokens, colors, typography reset
│   │   ├── components.css      # Buttons, cards, timeline, photo frames
│   │   ├── effects.css         # Canvas, custom cursor, tilt glare, animations
│   │   └── sections.css        # Hero, marquee, speaker, panel, game layouts
│   ├── App.jsx                 # App shell, routing coordinator, scroll resets
│   └── main.jsx                # React DOM mounting entry point
├── vercel.json                 # Vercel deployment & SPA rewrite configuration
├── vite.config.js              # Vite configuration with `@` alias resolution
├── package.json
└── README.md
```

---

## 🚀 Quick Start & Local Development

### 1. Prerequisites
- **Node.js** v18.0.0 or higher
- **npm** v9.0.0 or higher

### 2. Installation
Clone the repository and install dependencies:
```bash
git clone https://github.com/Atharv-Untwale/TechTonic.git
cd TechTonic
npm install
```

### 3. Start Local Dev Server
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser. Vite includes Hot Module Replacement (HMR) for instant live reloading.

### 4. Build for Production
To generate an optimized production bundle:
```bash
npm run build
```
Build artifacts will be emitted to `dist/`.

### 5. Preview Production Build
To test the production build locally before deploying:
```bash
npm run preview
```

---

## ✏️ Event Configuration Guide

All site content, dates, speakers, links, and forms are managed in **[`src/config/eventConfig.js`](file:///d:/ACM2k26/techtonic/TechTonic/src/config/eventConfig.js)**:

### 1. Registration Forms & Links
```javascript
export const REGISTER_URL = "https://forms.gle/YOUR_FORM_LINK";
export const OPEN_MIC_URL = "https://forms.gle/YOUR_TALENT_FORM"; // Optional
```

### 2. Event Date & Venue
```javascript
export const EVENT = {
  name: "TechTonic",
  start: "2026-10-31T09:30:00+05:30", // ISO timestamp drives countdown & live schedule
  dateLabel: "Saturday, 31 October 2026",
  time: "9:30 AM onwards (6 hours)",
  venue: "Major Auditorium, Medicaps University, Indore",
};
```

### 3. Speaker Profile & Photos
Place speaker photos in `public/photos/` (e.g. `public/photos/vikas-ratnawat.jpg`) and configure:
```javascript
export const SPEAKER = {
  name: "Vikas Ratnawat",
  photo: "photos/vikas-ratnawat.jpg",
  role: "Senior DevOps Associate Consultant, PwC",
  topic: "Cloud, DevOps & the Future of Tech in the Age of AI",
  facts: [
    ["15+", "years in the IT industry"],
    ["1000s", "of engineers trained"],
  ],
  points: [
    "Founder of CloudDevOpsHub",
    "Core expertise: AWS, Azure, GCP, multi-cloud architecture",
  ],
};
```

### 4. Remote Leaderboard Setup (Google Apps Script)
By default, the *Patch Panic* arcade game persists top scores to the player's browser via `localStorage`. To enable a live global leaderboard:
1. Create a Google Sheet.
2. Open **Extensions &rarr; Apps Script** and deploy a web app that handles `GET` (returns JSON array of `{name, score}`) and `POST` (appends rows).
3. Paste the web app URL into `LEADERBOARD_URL` in `src/config/eventConfig.js`:
```javascript
export const LEADERBOARD_URL = "https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec";
```

---

## 🌐 Deploying to Vercel

The project is pre-configured for zero-config Vercel deployment with [`vercel.json`](file:///d:/ACM2k26/techtonic/TechTonic/vercel.json).

### Method A: Connect with GitHub (Recommended)
1. Push your repository to GitHub.
2. Go to [vercel.com](https://vercel.com) and click **Add New Project**.
3. Import your **TechTonic** repository.
4. Vercel will automatically detect **Vite**:
   - **Framework Preset:** Vite
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
   - **Install Command:** `npm install`
5. Click **Deploy**. Any future `git push` to `main` will automatically trigger a production deployment.

### Method B: Deploy via Vercel CLI
```bash
# 1. Install Vercel CLI globally if not already installed
npm install -g vercel

# 2. Deploy preview
vercel

# 3. Deploy to production
vercel --prod
```

### Single Page App (SPA) Routing on Vercel
[`vercel.json`](file:///d:/ACM2k26/techtonic/TechTonic/vercel.json) includes route rewriting to prevent 404 errors on direct navigation or page reloads:
```json
{
  "framework": "vite",
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

---

## 🎨 Design System & Aesthetics

* **Color Palette:**
  * obsidian ink (`#14151a`, `#1d1f27`)
  * Amber Gold (`#f0b92b`)
  * Terracotta Crimson (`#e2542c`)
  * Retro Teal (`#4e8f94`)
  * Antique Cream (`#efe3c2`)
* **Typography:**
  * Display Header: *Alfa Slab One*
  * Accent Script: *Caveat Brush*
  * Body & Code: *DM Sans*
* **Micro-Interactions:**
  * **Cursor Halo:** Tracks cursor with smooth velocity damping and expands dynamically over interactive nodes.
  * **3D Tilt Cards:** Reacts to pointer angles in real-time with simulated specular surface reflections.
  * **Cyber Text:** Glyph scrambled decoding on hover (`01#X*+~/<>✦§%=?`).
  * **Magnetic Pull:** Buttons attract towards pointer proximity within a 30px bounding radius.
