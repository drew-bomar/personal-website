import { CANOPY_FAR } from "./foliage";

/**
 * Environmental layers, back to front.
 *
 * `src` renders a transparent asset; `paths` is the generated SVG fallback used
 * when no asset exists. Positioning, grading and parallax for each layer live in
 * scene.css keyed by `key`, so swapping artwork never touches component code.
 */
export type FoliageLayer = {
  key: string;
  src: string | null;
  paths: string[];
};

export const LAYERS = {
  /** Generated SVG. Blurred hard so it reads as canopy haze, not vector shapes. */
  canopyFar: { key: "canopy-far", src: null, paths: CANOPY_FAR },
  /** Blue-hazed distant foliage — atmospheric perspective baked into the art. */
  distant: { key: "distant", src: "/scene/distant.webp", paths: [] },
  /** Focal subject, standing in the open corridor beneath the moon. */
  monolith: { key: "monolith", src: "/scene/monolith.webp", paths: [] },
  /** Right-side falls: the water element, and a counterweight to the left text. */
  waterfall: { key: "waterfall", src: "/scene/waterfall.webp", paths: [] },
  /** Dense near foliage. */
  near: { key: "near", src: "/scene/near.webp", paths: [] },
  /** Foreground silhouette framing the viewport edges. */
  fore: { key: "fore", src: "/scene/foliage-fore.webp", paths: [] },
} satisfies Record<string, FoliageLayer>;
