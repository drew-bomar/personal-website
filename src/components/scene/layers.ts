import {
  CANOPY_FAR,
  CANOPY_MID,
  FOLIAGE_FORE,
  FOLIAGE_MID,
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
  { key: "canopy-far", src: null, paths: CANOPY_FAR },
  { key: "canopy-mid", src: null, paths: CANOPY_MID },
  { key: "foliage-mid", src: null, paths: FOLIAGE_MID },
  { key: "foliage-near", src: null, paths: FOLIAGE_NEAR },
  { key: "foliage-fore", src: null, paths: FOLIAGE_FORE },
];
