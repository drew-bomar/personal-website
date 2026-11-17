// URLs and structured data live here. The prose itself lives in the page
// components — inline links read better as JSX than as encoded markup.

export const profile = {
  name: "Drew Bomar",
  email: "drewbomar15@gmail.com",
  resumePath: "/drew-bomar-resume.pdf",
} as const;

export const links = {
  github: "https://github.com/drew-bomar",
  linkedin: "https://linkedin.com/in/drew-bomar",
  sofi: "https://www.sofi.com/",
  homeDepot: "https://www.homedepot.com/",
  washu: "https://wustl.edu/",
  washuFootball: "https://washubears.com/sports/football/roster/drew-bomar/8762",
  footballModel: "https://github.com/drew-bomar/d3_football_predictions",
  footballSite: "https://drew-bomar.github.io/d3_football_predictions/",
  plaid: "https://plaid.com/",
  nexusNil: "https://www.nexusnil.ai/",
  dodo: "https://drew-bomar.github.io/dodo/",
  jword: "https://jword.work/",
} as const;

export type Project = {
  name: string;
  period: string;
  href: string;
  description: string;
  stack: string[];
};

export const projects: Project[] = [
  {
    name: "NCAA DIII Football Prediction System",
    period: "July 2025 — present",
    href: links.footballSite,
    description:
      "A live machine learning system that predicts Division III football winners, spreads and final scores. Picks are published before kickoff every week and graded automatically, and the site's 2026 picks went 378 of 457 (82.7%). I built an evaluation harness with paired significance tests (McNemar, bootstrapped confidence intervals) and used it to measure Elo's contribution at about 8 points of accuracy and to ship a 13-feature logistic regression that matched the old 92-feature model with 22% lower log loss. A GitHub Actions job runs the whole weekly cycle unattended: it ingests games from NCAA's GraphQL API, rebuilds Elo and features, grades last week and publishes the next, with database backups and safe reruns.",
    stack: [
      "Python",
      "pandas",
      "scikit-learn",
      "PostgreSQL",
      "FastAPI",
      "React",
      "GitHub Actions",
      "Render",
    ],
  },
  {
    name: "DoDo",
    period: "October 2026 — present",
    href: links.dodo,
    description:
      "A native iPhone to-do app, now in App Store review, that keeps your next three tasks on the Lock Screen as a Live Activity so you can tick them off without opening the app. Unfinished tasks carry forward with an overdue label, tasks can repeat on chosen weekdays, and a long-term list sits behind the daily one. Everything stays on the phone: no account, no servers, no tracking. A pure-Swift domain layer handles carryover and time-zone-safe day math, and every write goes through a single serialized path so Lock Screen taps can't race the app.",
    stack: ["Swift", "SwiftUI", "ActivityKit", "WidgetKit", "App Intents"],
  },
  {
    name: "jword",
    period: "September 2026 — present",
    href: links.jword,
    description:
      "The job-application tracker I built to run my own search, replacing a Google Sheet. It pairs a web app with a Chrome extension that captures postings from LinkedIn, Greenhouse, Lever, Ashby and Workday, and company watchlists that find new openings on their job boards. A local MCP server gives Claude Code or Codex 17 bounded tools to read and update the same data. Every write, from the web or an agent, runs as a single Postgres function that commits the change, its audit entry and a version check in one transaction.",
    stack: [
      "TypeScript",
      "Next.js",
      "React",
      "Supabase",
      "PostgreSQL",
      "MCP",
    ],
  },
];

export const education = {
  school: "Washington University in St. Louis",
  degree: "B.S. Computer Science",
  minors: ["Finance", "Jazz Studies"],
  graduation: "May 2027",
  gpa: "3.5",
  act: "35",
  deansList: "Spring 2026",
};

/** Curated from the full transcript. Grades and non-relevant courses omitted. */
export const coursework: { group: string; courses: string[] }[] = [
  {
    group: "Computer Science",
    courses: [
      "Data Structures and Algorithms",
      "Analysis of Algorithms",
      "Object-Oriented Software Development Laboratory",
      "Introduction to Machine Learning and Pattern Classification",
      "Web Development",
      "Logic and Discrete Mathematics",
      "Cloud Computing with Big Data Applications (in progress)",
      "Multi-Agent Systems (in progress)",
      "Software Engineering for External Clients (in progress)",
      "Rapid Prototype Development and Creative Programming (in progress)",
    ],
  },
  {
    group: "Math & Statistics",
    courses: [
      "Probability and Statistics for Engineering",
      "Matrix Algebra",
      "Calculus III",
    ],
  },
  {
    group: "Finance",
    courses: [
      "Capital Markets and Financial Management",
      "Investments",
      "Advanced Financial Management",
      "Principles of Financial Accounting",
    ],
  },
  {
    group: "Jazz Studies",
    courses: [
      "Jazz Theory I & II",
      "History of Jazz",
      "Jazz Improvisation I (in progress)",
      "Jazz Guitar (four semesters)",
    ],
  },
];
