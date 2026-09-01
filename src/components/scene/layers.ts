import {
  CANOPY_FAR,
  CANOPY_MID,
  FOLIAGE_FORE,
  FOLIAGE_NEAR,
} from "./foliage";

/**
 * The five environmental layers, back to front.
 *
 * Each layer renders `src` if one is set, and falls back to the generated SVG
 * `paths` otherwise. To swap in real artwork, drop a transparent PNG/WebP in
 * `public/scene/` and set `src` here — nothing else changes. Layers stay
 * independently transformable either way.
 */
export type FoliageLayer = {
  key: string;
  /** Transparent asset. Takes precedence over `paths` when set. */
  src: string | null;
  /** Generated organic SVG, used until an asset exists. */
  paths: string[];
};

export const FOLIAGE_LAYERS: FoliageLayer[] = [
  // Far planes stay generated SVG: heavily blurred, they read as atmospheric
  // canopy haze rather than vector shapes, so they sit behind the artwork
  // without a style clash.
  { key: "canopy-far", src: null, paths: CANOPY_FAR },
  { key: "canopy-mid", src: null, paths: CANOPY_MID },
  // Near planes are the painterly artwork.
  { key: "foliage-near", src: "/scene/foliage-near.webp", paths: FOLIAGE_NEAR },
  { key: "foliage-fore", src: "/scene/foliage-fore.webp", paths: FOLIAGE_FORE },
];
