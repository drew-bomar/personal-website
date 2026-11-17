import Link from "next/link";
import { A, P, Shell, Title } from "@/components/ui";
import { links, profile } from "@/content/site";

export default function Home() {
  return (
    <Shell>
      <Title>{profile.name}</Title>

      <P>
        I study CS at <A href={links.washu}>WashU</A>, where I also play{" "}
        <A href={links.washuFootball}>varsity football</A>. I work on backend
        systems, infrastructure, and ML. I graduate in May
        2027.
      </P>

      <P>
        This past summer I was a software engineering intern at{" "}
        <A href={links.sofi}>SoFi</A>, where I built the first production
        endpoint in a configuration-platform rebuild. It became the config
        source for ACH workflows that processed 4.2M transactions across 42
        banks in its first month. I also found and closed an unreported
        fail-open bug in the service-wide permissions check. At the same time
        I worked part-time as a backend engineer for{" "}
        <A href={links.nexusNil}>Nexus NIL</A>, integrating{" "}
        <A href={links.plaid}>Plaid</A> for bank linking, S3 and CloudFront for
        confidential athlete information storage and media display, and an
        LLC formation provider for automated filings.
      </P>

      <P>
        The summer before, I was at <A href={links.homeDepot}>Home Depot</A> on
        the Cloud AI team as an AI infrastructure engineering intern, working on
        the document ingestion path behind their consumer-facing LLM. I expanded
        the RAG pipeline to handle Word and PowerPoint document types, achieving
        a 9x faster average processing time compared to PDF conversion methods.
      </P>

      <P>
        In my own time I built a{" "}
        <Link href="/projects">prediction system</Link> for NCAA Division III
        football. It publishes picks before kickoff every week, and this season
        it called 82.7% of game winners across 457 games. It also predicts
        spreads and final scores, and the whole weekly cycle runs itself on
        GitHub Actions. Some of the games it learned from are ones I actually
        played in. To predict games yourself or learn more, visit{" "}
        <A href={links.footballSite}>here</A>.
      </P>

      <P>
        I also built <A href={links.dodo}>DoDo</A>, an iPhone to-do app that
        keeps your next three tasks on the Lock Screen, which is now in App
        Store review, and <A href={links.jword}>jword</A>, the job tracker I
        ran my own search on. More on the{" "}
        <Link href="/projects">projects</Link> page.
      </P>

      <P>
        You can find me on <A href={links.github}>Github</A> and{" "}
        <A href={links.linkedin}>LinkedIn</A>.
      </P>

      <P>
        Reach me at my <A href={`mailto:${profile.email}`}>email</A>.
      </P>

      <P>
        Here&rsquo;s my <A href={profile.resumePath}>resume</A>.
      </P>

      <p className="mt-10">
        <Link href="/projects">Projects</Link>
        {" · "}
        <Link href="/education">Education</Link>
      </p>
    </Shell>
  );
}
