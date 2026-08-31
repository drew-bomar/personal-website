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
    name: "NCAA DIII Football Prediction Model",
    period: "July 2025 — present",
    href: links.footballModel,
    description:
      "An end-to-end system that predicts Division III football outcomes, averaging 79.95% accuracy on game winners through the 2025 season. It pulls game data through a GraphQL ETL pipeline, derives 70+ features including rolling team metrics and a custom Elo rating, and trains calibrated logistic regression models with isotonic regression and time-based cross-validation. The Elo system alone improved accuracy by more than 15%.",
    stack: [
      "Python",
      "pandas",
      "scikit-learn",
      "PostgreSQL",
      "GraphQL",
      "SQLAlchemy",
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
