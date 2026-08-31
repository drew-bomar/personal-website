// Single source of truth for site content.
// Edit this file to update the site — the layout reads everything from here.

export const profile = {
  name: "Drew Bomar",
  tagline: "Software engineer",
  blurb:
    "CS student at WashU building backend systems and data pipelines. Most recently at SoFi, where I shipped API work behind ACH processing at scale. I like problems where the data is messy and the correctness bar is high.",
  location: "St. Louis, MO",
  email: "drewbomar15@gmail.com",
  phone: "(404) 433-0040",
  resumePath: "/drew-bomar-resume.pdf",
  links: {
    github: "https://github.com/drew-bomar",
    linkedin: "https://linkedin.com/in/drew-bomar",
  },
} as const;

export type Role = {
  company: string;
  title: string;
  location: string;
  start: string;
  end: string;
  bullets: string[];
  stack: string[];
};

export const experience: Role[] = [
  {
    company: "SoFi",
    title: "Software Engineering Intern — Tech Solutions Console",
    location: "San Francisco, CA",
    start: "June 2026",
    end: "August 2026",
    bullets: [
      "Designed and shipped a FastAPI endpoint combining database and runtime configuration data, supporting workflows that processed 4,218 ACH files and 4.2M transactions across 42 banks in its first month in production.",
      "Collaborated with the ACH team to modernize legacy processing workflows through backend data retrieval, transformation, and response modeling.",
      "Strengthened authentication and authorization by standardizing service-to-service access, removing deprecated auth flows, and fixing a fail-open permissions vulnerability.",
    ],
    stack: [
      "Python",
      "FastAPI",
      "Pydantic",
      "SQLAlchemy",
      "Oracle",
      "AWS AppConfig",
      "Auth0 / JWT",
      "Pytest",
      "Docker",
    ],
  },
  {
    company: "Nexus NIL AI",
    title: "Backend Engineer (Part-Time)",
    location: "Remote",
    start: "July 2026",
    end: "August 2026",
    bullets: [
      "Built an end-to-end Plaid integration for bank linking, transaction syncing, investment holdings, encrypted access tokens, and secure webhook processing across 9 REST endpoints.",
      "Integrated a white-label LLC formation provider with idempotent user provisioning, signed webhooks, and a forward-only filing state machine.",
      "Architected an AWS S3 and CloudFront asset pipeline, separating public media from private athlete documents and correcting a broken Django storage configuration.",
    ],
    stack: [
      "Python",
      "Django / DRF",
      "PostgreSQL",
      "AWS S3",
      "CloudFront",
      "Plaid",
      "Docker",
      "GitHub Actions",
    ],
  },
  {
    company: "Home Depot",
    title: "AI Infrastructure Engineering Intern — Cloud AI",
    location: "Atlanta, GA",
    start: "May 2025",
    end: "July 2025",
    bullets: [
      "Launched format expansion for the RAG pipeline behind Magic Apron, adding first-ever ingestion support for Word and PowerPoint formats.",
      "Designed a standardized PDF conversion pipeline and an intelligent PowerPoint extractor that routes components (text, images, tables, charts) to optimized processing paths.",
      "Achieved 9x faster average processing time for complex files with preserved semantic fidelity and retrieval quality.",
      "Integrated with GCP infrastructure: async pipelines via Pub/Sub, storage in BigTable, embeddings via Vertex AI, and indexing in Vector Search for real-time semantic retrieval.",
    ],
    stack: [
      "Python",
      "GCP",
      "Pub/Sub",
      "BigTable",
      "Vertex AI",
      "Kubernetes",
      "python-pptx",
      "Gemini 2.0",
    ],
  },
];

export type Project = {
  name: string;
  period: string;
  summary: string;
  bullets: string[];
  stack: string[];
  href?: string;
};

export const projects: Project[] = [
  {
    name: "NCAA DIII Football Prediction Model",
    period: "July 2025 — Present",
    summary:
      "An end-to-end ML system predicting NCAA Division III football outcomes, averaging 79.95% weekly accuracy on game winners for the 2025 season.",
    bullets: [
      "Engineered 70+ predictive features, including rolling team metrics and a custom Elo system that improved model accuracy by 15%+.",
      "Developed a GraphQL ETL pipeline and trained calibrated logistic regression models using scikit-learn, isotonic regression, and time-based cross-validation.",
    ],
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
  division: "McKelvey School of Engineering",
  degree: "B.S. Computer Science — Minors in Finance and Jazz Studies",
  location: "St. Louis, MO",
  graduation: "May 2027",
  gpa: "3.5",
  notes: [
    "Student-Athlete: Varsity Football, slot receiver",
    "All-Conference (2023 – 2025)",
  ],
};

export const skills = {
  Languages: ["Python", "Java", "SQL", "C++", "JavaScript", "TypeScript"],
  "Frameworks & Tools": [
    "FastAPI",
    "Django",
    "React",
    "PostgreSQL",
    "Docker",
    "Git",
  ],
  Cloud: ["AWS", "GCP", "Vertex AI", "Kubernetes"],
};

export const interests = ["Jazz guitar", "Chess", "Yoga", "Football"];
