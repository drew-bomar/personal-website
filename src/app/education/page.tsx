import type { Metadata } from "next";
import Link from "next/link";
import { A, P, Shell, Title } from "@/components/ui";
import { coursework, education, links } from "@/content/site";

export const metadata: Metadata = {
  title: "Education",
  description: `${education.degree} at ${education.school}, with minors in ${education.minors.join(" and ")}.`,
};

export default function Education() {
  return (
    <Shell>
      <Title>Education</Title>

      <P>
        I&rsquo;m a {education.degree} student at{" "}
        <A href={links.washu}>{education.school}</A>, graduating{" "}
        {education.graduation}, with minors in{" "}
        {education.minors.join(" and ")}. I carry a {education.gpa} GPA, scored
        a {education.act} on the ACT, and made the Dean&rsquo;s List in{" "}
        {education.deansList}.
      </P>

      <P>Relevant coursework:</P>

      {coursework.map((section) => (
        <section key={section.group} className="mb-6">
          <p className="mb-1 opacity-60">{section.group}</p>
          <ul>
            {section.courses.map((course) => (
              <li key={course}>{course}</li>
            ))}
          </ul>
        </section>
      ))}

      <p className="mt-10">
        <Link href="/">← Back</Link>
      </p>
    </Shell>
  );
}
