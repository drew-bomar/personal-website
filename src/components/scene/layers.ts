import { CANOPY_FAR } from "./foliage";

/**
 * Environmental layers, back to front.
 *
 * `src` renders a transparent asset; `paths` is the generated SVG fallback used
 * when no asset exists. Positioning, grading, masking and parallax for each
 * layer live in scene.css keyed by `key`, so swapping artwork never touches
 * component code.
 */
export type FoliageLayer = {
  key: string;
  src: string | null;
  paths: string[];
};

export const LAYERS = {
  /** Generated SVG haze, blurred hard. Sits above the sky, below the world. */
  canopyFar: { key: "canopy-far", src: null, paths: CANOPY_FAR },
  /** Distant ridge: establishes jungle continuing past the viewport. */
  canopyFrame: { key: "canopy-frame", src: "/scene/canopy-frame.webp", paths: [] },
  /** The landform. Oversized so the cliffs read as continuing beyond frame. */
  cliffs: { key: "cliffs", src: "/scene/cliffs.webp", paths: [] },
  /** Focal falls, masked into the cliff face rather than laid on top of it. */
  grotto: { key: "grotto", src: "/scene/grotto.webp", paths: [] },
  /** Basin the falls drain into — gives the water somewhere to go. */
  stream: { key: "stream", src: "/scene/stream.webp", paths: [] },
  /** Dense near foliage. */
  near: { key: "near", src: "/scene/near.webp", paths: [] },
  /** Foreground silhouette framing the viewport edges. Sharpest layer. */
  fore: { key: "fore", src: "/scene/foliage-fore.webp", paths: [] },
  /**
   * Focal subject from the previous pass. Not part of the environment brief's
   * depth order, so it is not rendered — restore by adding it back in Hero.
   */
  monolith: { key: "monolith", src: "/scene/monolith.webp", paths: [] },
} satisfies Record<string, FoliageLayer>;
