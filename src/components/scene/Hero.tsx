"use client";

import { useEffect, useRef } from "react";
import { STARS } from "./stars";
import {
  DISTANT_TREELINE,
  FOREGROUND_TREELINE,
  MID_TREELINE,
  VIEWBOX,
} from "./treelines";
import "./scene.css";

/** Treeline SVG. One path, positioned and coloured entirely by CSS. */
function Treeline({ d, className }: { d: string; className: string }) {
  return (
    <div className={`layer ${className}`} aria-hidden>
      <svg
        viewBox={`0 0 ${VIEWBOX.width} ${VIEWBOX.height}`}
        preserveAspectRatio="xMidYMax slice"
      >
        <path d={d} />
      </svg>
    </div>
  );
}

export default function Hero() {
  const ref = useRef<HTMLElement>(null);

  // Drive parallax through CSS custom properties rather than re-rendering.
  // Pointer is rAF-throttled; scroll is clamped to the hero's own height.
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;
    let px = 0;
    let py = 0;

    const apply = () => {
      frame = 0;
      el.style.setProperty("--px", px.toFixed(4));
      el.style.setProperty("--py", py.toFixed(4));
    };

    const onPointer = (e: PointerEvent) => {
      px = (e.clientX / window.innerWidth) * 2 - 1;
      py = (e.clientY / window.innerHeight) * 2 - 1;
      if (!frame) frame = requestAnimationFrame(apply);
    };

    const onScroll = () => {
      const sy = Math.min(1, Math.max(0, window.scrollY / el.offsetHeight));
      el.style.setProperty("--sy", sy.toFixed(4));
    };

    window.addEventListener("pointermove", onPointer, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => {
      window.removeEventListener("pointermove", onPointer);
      window.removeEventListener("scroll", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <section className="scene" ref={ref}>
      {/* 1 — stars */}
      <div className="layer layer-stars" aria-hidden>
        <svg viewBox="0 0 1440 280" preserveAspectRatio="xMidYMin slice">
          {STARS.map((s, i) => (
            <circle
              key={i}
              className="star"
              cx={s.cx}
              cy={s.cy}
              r={s.r}
              fill="#e8f1ea"
              style={
                {
                  "--o": s.o,
                  "--delay": `${s.delay}s`,
                  "--dur": `${s.dur}s`,
                  opacity: s.o,
                } as React.CSSProperties
              }
            />
          ))}
        </svg>
      </div>

      {/* 2 — moon */}
      <div className="layer layer-moon" aria-hidden>
        <div className="moon-bloom" />
        <div className="moon-disc" />
      </div>

      {/* 3 — light corridor */}
      <div className="layer layer-river" aria-hidden>
        <div className="river" />
      </div>

      {/* 4-6 — forest depth */}
      <Treeline d={DISTANT_TREELINE} className="layer-distant" />
      <Treeline d={MID_TREELINE} className="layer-mid" />

      {/* 7 — fog sits between mid and foreground for real depth */}
      <div className="layer layer-fog" aria-hidden>
        <div className="fog fog-b" />
        <div className="fog fog-a" />
        <div className="fog fog-c" />
      </div>

      <Treeline d={FOREGROUND_TREELINE} className="layer-fore" />

      <div className="vignette" aria-hidden />

      {/* 8 — content */}
      <div className="scene-content">
        <nav className="scene-nav">
          <span className="mark">DB</span>
          <a href="#index">Index</a>
        </nav>

        <main className="scene-main">
          <p className="eyebrow rise" style={{ "--d": "0.1s" } as React.CSSProperties}>
            Dream Forest Systems
          </p>

          <h1 className="scene-name rise" style={{ "--d": "0.2s" } as React.CSSProperties}>
            Drew Bomar
          </h1>

          <div className="rule rise" style={{ "--d": "0.35s" } as React.CSSProperties} />

          <p className="scene-lede rise" style={{ "--d": "0.45s" } as React.CSSProperties}>
            Software engineer building intelligent products and systems.
          </p>

          <p className="scene-meta rise" style={{ "--d": "0.6s" } as React.CSSProperties}>
            AI · Product · Infrastructure · Design
          </p>
        </main>

        <div className="scene-foot rise" style={{ "--d": "0.8s" } as React.CSSProperties}>
          <a className="explore" href="#index">
            <span className="explore-line" aria-hidden />
            Explore
          </a>
          <span>St. Louis, MO</span>
        </div>
      </div>
    </section>
  );
}
