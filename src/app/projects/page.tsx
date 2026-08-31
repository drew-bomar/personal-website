import type { Metadata } from "next";
import Link from "next/link";
import { A, P, Shell, Title } from "@/components/ui";
import { projects } from "@/content/site";

export const metadata: Metadata = {
  title: "Projects",
  description: "Things Drew Bomar has built.",
};

export default function Projects() {
  return (
    <Shell>
      <Title>Projects</Title>

      {projects.map((project) => (
        <section key={project.name} className="mb-10">
          <p className="mb-1">
            <A href={project.href}>{project.name}</A>
            <span className="ml-2 opacity-60">{project.period}</span>
          </p>
          <P>{project.description}</P>
          <p className="opacity-60">{project.stack.join(" · ")}</p>
        </section>
      ))}

      <p className="mt-10">
        <Link href="/">← Back</Link>
      </p>
    </Shell>
  );
}
