// ✏️ EDIT THIS FILE: everything on the site reads from here.
export const REGISTER_URL = "https://forms.gle/REPLACE_WITH_YOUR_FORM"; // <- paste your registration form link
export const OPEN_MIC_URL = ""; // optional separate Engineers Got Talent form; falls back to REGISTER_URL

export const EVENT = {
  name: "TechTonic",
  start: "2026-10-31T09:30:00+05:30", // poster says 31 Oct 2026 (proposal says 24 Oct, confirm!)
  dateLabel: "Saturday, 31 October 2026",
  time: "9:30 AM onwards (6 hours)",
  venue: "Major Auditorium, Medicaps University, Indore",
};

export const SEGMENTS = [
  { icon: "🎤", title: "Speaker Session", text: "Industry insights on technology, career paths and real-world practice." },
  { icon: "🪑", title: "Panel Discussion", text: "Shaping today's students into the engineers of tomorrow, in an AI-driven era." },
  { icon: "🎮", title: "KBC: Technical Twist", text: "A fun, high-energy quiz with technical and current-affairs questions." },
  { icon: "🎸", title: "Engineers Got Talent", text: "An open-mic for Medicaps students to show talent beyond academics." },
];

export const SCHEDULE = [
  { group: "Inauguration", items: [
    ["09:30", "Welcome & Opening"], ["09:35", "Medicaps Anthem"], ["09:40", "Invitation of Dignitaries to the Stage"],
    ["09:45", "Ceremonial Lamp Lighting"], ["09:50", "Saraswati Vandana"], ["09:55", "Addresses by the Esteemed Dignitaries"],
    ["10:15", "Photo Session"], ["10:25", "National Anthem"] ] },
  { group: "Main Program", items: [
    ["10:30", "Speaker Session with Mr. Vikas Ratnawat", "1 hr"], ["11:30", "Panel Discussion", "1 hr"],
    ["12:30", "Break", "30 min"], ["13:00", "KBC: Knowledge with a Technical Twist", "1 hr"],
    ["14:00", "Engineers Got Talent: Open Mic", "1 hr"] ] },
];

export const SPEAKER = {
  name: "Vikas Ratnawat",
  photo: "photos/vikas-ratnawat.jpg", // put the file in public/photos/
  role: "Senior DevOps Associate Consultant, PwC",
  topic: "Cloud, DevOps & the Future of Tech in the Age of AI (to be confirmed)",
  facts: [
    ["15+", "years in the IT industry"],
    ["1000s", "of engineers trained via workshops, mock interviews & mentorship"],
  ],
  points: [
    "Founder of CloudDevOpsHub, a large Cloud & DevOps learning community",
    "Core expertise: AWS, Azure, GCP, multi-cloud architecture, Linux",
    "DevOps & automation: Kubernetes, Terraform, CI/CD, AI integrations",
  ],
};

export const OBJECTIVES = [
  "Direct exposure to a working Cloud & DevOps professional",
  "Practical awareness of how AI is reshaping tech careers",
  "A gamified, low-pressure way to test technical knowledge",
  "A candid conversation on becoming future-ready engineers",
  "A stage for talents beyond academics",
  "Stronger cross-branch interaction through shared activities",
];

export const PANEL = {
  time: "11:30 AM – 12:30 PM",
  topic: "Shaping today's students into the engineers of tomorrow, in an AI-driven era",
  covers: [
    "How students can prepare to be future-ready engineers",
    "Where technology itself is headed in the age of AI",
  ],
  // ✏️ Replace "TBA" with real details. Photo = file inside public/photos/ (e.g. "photos/moderator.jpg"), or "" for a placeholder.
  moderator: { name: "TBA", role: "Designation, Organization: TBA", photo: "" },
  panelists: [
    { name: "TBA", role: "Designation, Organization: TBA", photo: "" },
    { name: "TBA", role: "Designation, Organization: TBA", photo: "" },
    { name: "TBA", role: "Designation, Organization: TBA", photo: "" },
  ],
};

// Shared leaderboard: paste your Google Apps Script web-app URL here (see apps-script.gs).
// Leave "" and the leaderboard works per-device only.
export const LEADERBOARD_URL = "https://script.google.com/macros/s/AKfycbyKw44IMGlfUiaI7YrRVfKRoBoP6tn4ZiOoSRVdwjAiLloEw6n8kz2PVJx80K9o6scU/exec";