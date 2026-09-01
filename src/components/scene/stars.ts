// Deterministic star field. Generated at module scope with a seeded PRNG so
// server and client render identical markup (no hydration mismatch).

function mulberry32(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export type Star = {
  cx: number;
  cy: number;
  r: number;
  o: number;
  delay: number;
  dur: number;
};

function build(count: number, seed: number, maxY: number): Star[] {
  const rand = mulberry32(seed);
  const stars: Star[] = [];
  for (let i = 0; i < count; i++) {
    const cy = rand() * maxY;
    // Thin the field toward the horizon so the sky reads as depth, not wallpaper.
    const horizonFade = 1 - cy / maxY;
    stars.push({
      cx: Math.round(rand() * 1440 * 10) / 10,
      cy: Math.round(cy * 10) / 10,
      r: Math.round((0.5 + rand() * 1.3) * 100) / 100,
      o: Math.round((0.15 + rand() * 0.65 * horizonFade) * 100) / 100,
      delay: Math.round(rand() * 8000) / 1000,
      dur: Math.round((3 + rand() * 5) * 1000) / 1000,
    });
  }
  return stars;
}

export const STARS = build(150, 1337, 280);
