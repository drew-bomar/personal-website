import type { ReactNode } from "react";

export function Section({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-24 border-t border-line py-14">
      <h2 className="mb-8 font-mono text-xs uppercase tracking-[0.2em] text-muted">
        {title}
      </h2>
      {children}
    </section>
  );
}

export function Tag({ children }: { children: ReactNode }) {
  return (
    <li className="rounded-full border border-line bg-surface px-2.5 py-1 font-mono text-[11px] text-muted">
      {children}
    </li>
  );
}

export function TagList({ items }: { items: readonly string[] }) {
  return (
    <ul className="mt-4 flex flex-wrap gap-1.5">
      {items.map((item) => (
        <Tag key={item}>{item}</Tag>
      ))}
    </ul>
  );
}

export function Bullets({ items }: { items: readonly string[] }) {
  return (
    <ul className="mt-3 space-y-2">
      {items.map((item) => (
        <li key={item} className="flex gap-3 text-[15px] leading-relaxed">
          <span aria-hidden className="mt-2 size-1 shrink-0 rounded-full bg-accent" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}
