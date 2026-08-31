import { Bullets, Section, TagList } from "@/components/ui";
import {
  education,
  experience,
  interests,
  profile,
  projects,
  skills,
} from "@/content/site";

const nav = [
  { href: "#experience", label: "Experience" },
  { href: "#projects", label: "Projects" },
  { href: "#about", label: "About" },
];

export default function Home() {
  return (
    <div className="mx-auto max-w-2xl px-6 pb-24">
      <header className="flex items-center justify-between gap-4 py-8">
        <a href="#top" className="font-mono text-sm font-medium">
          {profile.name}
        </a>
        <nav className="flex gap-5">
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm text-muted transition-colors hover:text-foreground"
            >
              {item.label}
            </a>
          ))}
        </nav>
      </header>

      <main id="top">
        <section className="py-10">
          <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
            {profile.name}
          </h1>
          <p className="mt-3 text-lg text-muted">
            {profile.tagline} · {profile.location}
          </p>
          <p className="mt-6 text-[17px] leading-relaxed text-balance">
            {profile.blurb}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href={profile.resumePath}
              className="rounded-md bg-foreground px-4 py-2 text-sm font-medium text-background transition-opacity hover:opacity-85"
            >
              Resume (PDF)
            </a>
            <a
              href={profile.links.github}
              target="_blank"
              rel="noreferrer"
              className="rounded-md border border-line px-4 py-2 text-sm transition-colors hover:border-foreground"
            >
              GitHub
            </a>
            <a
              href={profile.links.linkedin}
              target="_blank"
              rel="noreferrer"
              className="rounded-md border border-line px-4 py-2 text-sm transition-colors hover:border-foreground"
            >
              LinkedIn
            </a>
            <a
              href={`mailto:${profile.email}`}
              className="rounded-md border border-line px-4 py-2 text-sm transition-colors hover:border-foreground"
            >
              Email
            </a>
          </div>
        </section>

        <Section id="experience" title="Experience">
          <div className="space-y-12">
            {experience.map((role) => (
              <article key={role.company}>
                <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                  <h3 className="text-lg font-medium">{role.company}</h3>
                  <p className="font-mono text-xs text-muted">
                    {role.start} — {role.end}
                  </p>
                </div>
                <p className="mt-1 text-sm text-muted">
                  {role.title} · {role.location}
                </p>
                <Bullets items={role.bullets} />
                <TagList items={role.stack} />
              </article>
            ))}
          </div>
        </Section>

        <Section id="projects" title="Projects">
          <div className="space-y-12">
            {projects.map((project) => (
              <article key={project.name}>
                <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                  <h3 className="text-lg font-medium">
                    {project.href ? (
                      <a
                        href={project.href}
                        target="_blank"
                        rel="noreferrer"
                        className="underline decoration-line underline-offset-4 hover:decoration-foreground"
                      >
                        {project.name}
                      </a>
                    ) : (
                      project.name
                    )}
                  </h3>
                  <p className="font-mono text-xs text-muted">
                    {project.period}
                  </p>
                </div>
                <p className="mt-2 text-[15px] leading-relaxed text-muted">
                  {project.summary}
                </p>
                <Bullets items={project.bullets} />
                <TagList items={project.stack} />
              </article>
            ))}
          </div>
        </Section>

        <Section id="about" title="Education & Skills">
          <article>
            <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
              <h3 className="text-lg font-medium">{education.school}</h3>
              <p className="font-mono text-xs text-muted">
                {education.graduation}
              </p>
            </div>
            <p className="mt-1 text-sm text-muted">
              {education.degree} · GPA {education.gpa}
            </p>
            <Bullets items={education.notes} />
          </article>

          <dl className="mt-10 space-y-5">
            {Object.entries(skills).map(([group, items]) => (
              <div key={group}>
                <dt className="font-mono text-xs uppercase tracking-wider text-muted">
                  {group}
                </dt>
                <dd>
                  <TagList items={items} />
                </dd>
              </div>
            ))}
          </dl>

          <p className="mt-10 text-[15px] text-muted">
            Outside of work: {interests.join(", ").toLowerCase()}.
          </p>
        </Section>

        <Section id="contact" title="Contact">
          <p className="text-[17px] leading-relaxed">
            The fastest way to reach me is email —{" "}
            <a
              href={`mailto:${profile.email}`}
              className="underline decoration-line underline-offset-4 transition-colors hover:decoration-foreground"
            >
              {profile.email}
            </a>
            . I&rsquo;m open to full-time software engineering roles starting
            after graduation in {education.graduation}.
          </p>
        </Section>
      </main>

      <footer className="border-t border-line pt-8 font-mono text-xs text-muted">
        © {new Date().getFullYear()} {profile.name}
      </footer>
    </div>
  );
}
