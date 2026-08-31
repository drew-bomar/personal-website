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
        This summer I was at <A href={links.sofi}>SoFi</A> on the Tech Solutions
        Console team, where I shipped a FastAPI endpoint that now backs ACH
        workflows processing over 4.2M transactions across 42 banks per month,
        and closed a fail-open permissions vulnerability by standardizing
        service-to-service authorization. I also worked part-time as a Backend
        Engineer for <A href={links.nexusNil}>Nexus NIL</A>, where I expanded
        their capabilities by
        integrating{" "}
        <A href={links.plaid}>Plaid</A> for bank linking, S3 and CloudFront for
        confidential athlete information storage and media display, and
        FileForms API for individual automated LLC formation.
      </P>

      <P>
        Last summer I was at <A href={links.homeDepot}>Home Depot</A> on the
        Cloud AI team as an AI infrastructure engineer, working on the document
        ingestion path behind their consumer-facing LLM. I expanded the RAG
        pipeline to handle Word and PowerPoint document types, achieving a 9x
        faster average processing time compared to PDF conversion methods.
      </P>

      <P>
        In my own time I built a{" "}
        <A href={links.footballModel}>prediction model</A> for NCAA Division III
        football that calls game winners at roughly 80% accuracy.
        I engineered 70+ features and a custom Elo system, and trained a logistic regression model on real NCAA games, some of which I actually played in. 
        To predict games yourself or learn more, visit{" "}
        <A href={links.footballSite}>here</A>.
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
