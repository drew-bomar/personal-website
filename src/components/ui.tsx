import type { ReactNode } from "react";

/** Page shell — the 672px measure shared by every page. */
export function Shell({ children }: { children: ReactNode }) {
  return (
    <div className="mx-auto max-w-[672px] px-6 py-16 sm:py-20">{children}</div>
  );
}

export function Title({ children }: { children: ReactNode }) {
  return (
    <h1 className="mb-6 text-2xl font-bold text-accent">{children}</h1>
  );
}

/** External link. Internal navigation should use next/link instead. */
export function A({ href, children }: { href: string; children: ReactNode }) {
  const external = href.startsWith("http");
  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
    >
      {children}
    </a>
  );
}

export function P({ children }: { children: ReactNode }) {
  return <p className="mb-5">{children}</p>;
}
