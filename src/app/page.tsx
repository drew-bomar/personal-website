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
        systems, data pipelines, and the occasional model. I graduate in May
        2027.
      </P>

      <P>
        This summer I was at <A href={links.sofi}>SoFi</A> on the Tech Solutions
        Console team, where I shipped a FastAPI endpoint that now backs ACH
        workflows moving 4.2M transactions across 42 banks — and closed a
        fail-open permissions hole on the way through. Alongside it I&rsquo;ve
        been writing backend at Nexus NIL, where I built a{" "}
        <A href={links.plaid}>Plaid</A> integration for bank linking and an
        S3/CloudFront pipeline separating public media from private athlete
        documents.
      </P>

      <P>
        Last summer I was at <A href={links.homeDepot}>Home Depot</A> on the
        Cloud AI team, rebuilding the document ingestion path behind Magic
        Apron. The RAG pipeline had never handled Word or PowerPoint; by the end
        complex files processed 9x faster with retrieval quality intact.
      </P>

      <P>
        On my own time I built a{" "}
        <A href={links.footballModel}>prediction model</A> for NCAA Division III
        football that calls game winners at roughly 80% accuracy — 70+
        engineered features and a custom Elo system, trained on the games I play
        in.
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
      </p>
    </Shell>
  );
}
