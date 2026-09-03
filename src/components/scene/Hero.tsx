"use client";

import { useEffect, useRef } from "react";
import { FOLIAGE_VIEWBOX } from "./foliage";
import { LAYERS, type FoliageLayer } from "./layers";
import { STARS } from "./stars";
import "./scene.css";

/**
 * One environmental layer. Renders a transparent asset when `src` is set,
 * otherwise the generated organic SVG. All five layers share the same
 * coordinate space so they compose as a single scene.
 */
function Foliage({
  layer,
  children,
}: {
  layer: FoliageLayer;
  children?: React.ReactNode;
}) {
  return (
    <div className={`layer layer-foliage layer-${layer.key}`} aria-hidden>
      {layer.src ? (
        <img src={layer.src} alt="" draggable={false} />
      ) : (
        <svg
          viewBox={`0 0 ${FOLIAGE_VIEWBOX.width} ${FOLIAGE_VIEWBOX.height}`}
          preserveAspectRatio="xMidYMid slice"
        >
          {/* Generated static markup from scripts/generate-foliage.py. */}
          <g dangerouslySetInnerHTML={{ __html: layer.paths.join("") }} />
        </svg>
      )}
      {children}
    </div>
  );
}

export default function Hero() {
  const ref = useRef<HTMLElement>(null);

  // Parallax drives CSS custom properties instead of re-rendering.
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
      {/* Stars are divs, not SVG circles. An opacity animation on an SVG child
          cannot be composited, so 150 of them forced a full repaint of this
          layer every frame — by far the most expensive thing on the page. Only one in five twinkles; the rest paint once and never again. */}
      <div className="layer layer-stars" aria-hidden>
        {STARS.map((s, i) => (
          <span
            key={i}
            className={i % 5 === 0 ? "star star-tw" : "star"}
            style={
              {
                left: `${((s.cx / 1440) * 100).toFixed(3)}%`,
                top: `${((s.cy / 280) * 100).toFixed(3)}%`,
                width: `${(s.r * 2).toFixed(2)}px`,
                height: `${(s.r * 2).toFixed(2)}px`,
                opacity: s.o,
                "--o": s.o,
                "--delay": `${s.delay}s`,
                "--dur": `${s.dur}s`,
              } as React.CSSProperties
            }
          />
        ))}
      </div>

      {/* moon */}
      <div className="layer layer-moon" aria-hidden>
        <div className="moon-bloom" />
        <div className="moon-disc" />
      </div>

      {/* light corridor — the winding negative space through the canopy */}
      <div className="layer layer-river" aria-hidden>
        <div className="river" />
      </div>

      <Foliage layer={LAYERS.canopyFar} />

      <Foliage layer={LAYERS.canopyFrame} />

      {/* the landform, the falls cut into it, and the basin they drain to */}
      <Foliage layer={LAYERS.cliffs} />
      {/* The plate itself never moves. Only these two streak fields scroll,
          stencilled to the falling water and blended into the painted falls. */}
      <Foliage layer={LAYERS.grotto}>
        <div className="falls">
          <div className="falls-flow falls-flow-a" />
          <div className="falls-flow falls-flow-b" />
        </div>
      </Foliage>
      {/* the lit surface shimmers; the rocks standing in it do not */}
      <Foliage layer={LAYERS.stream}>
        <div className="pool">
          <div className="pool-ripple pool-ripple-a" />
          <div className="pool-ripple pool-ripple-b" />
        </div>
      </Foliage>

      {/* fog separates the background plates from the near planes. Each band is
          a fixed window the cloud drifts through, so banks form and dissolve. */}
      <div className="layer layer-fog" aria-hidden>
        <div className="fog fog-high">
          <div className="fog-drift" />
        </div>
        <div className="fog fog-valley">
          <div className="fog-drift" />
        </div>
        <div className="fog fog-base">
          <div className="fog-drift" />
        </div>
      </div>

      {/* The near plate with its vines masked out, then each vine as its own
          small cutout so it can swing without rasterising the whole plate. */}
      <div className="layer layer-foliage layer-near" aria-hidden>
        <img
          className="near-still"
          src={LAYERS.near.src!}
          alt=""
          draggable={false}
        />
        <img
          className="sway sway-l"
          src="/scene/near-vine-l.webp"
          alt=""
          draggable={false}
        />
        <img
          className="sway sway-l2"
          src="/scene/near-vine-l2.webp"
          alt=""
          draggable={false}
        />
        <img
          className="sway sway-r"
          src="/scene/near-vine-r.webp"
          alt=""
          draggable={false}
        />
        <img
          className="sway sway-r2"
          src="/scene/near-vine-r2.webp"
          alt=""
          draggable={false}
        />
      </div>

      <Foliage layer={LAYERS.fore} />

      <div className="vignette" aria-hidden />

      {/* content */}
      <div className="scene-content">
        <nav className="scene-nav">
          <span className="mark">DB</span>
          <a href="#index">Index</a>
        </nav>

        <main className="scene-main">
          <p
            className="eyebrow rise"
            style={{ "--d": "0.1s" } as React.CSSProperties}
          >
            Dream Forest Systems
          </p>

          <h1
            className="scene-name rise"
            style={{ "--d": "0.2s" } as React.CSSProperties}
          >
            Drew Bomar
          </h1>

          <div
            className="rule rise"
            style={{ "--d": "0.35s" } as React.CSSProperties}
          />

          <p
            className="scene-lede rise"
            style={{ "--d": "0.45s" } as React.CSSProperties}
          >
            Software engineer building intelligent products and systems.
          </p>

          <p
            className="scene-meta rise"
            style={{ "--d": "0.6s" } as React.CSSProperties}
          >
            AI · Product · Infrastructure · Design
          </p>
        </main>

        <div
          className="scene-foot rise"
          style={{ "--d": "0.8s" } as React.CSSProperties}
        >
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
