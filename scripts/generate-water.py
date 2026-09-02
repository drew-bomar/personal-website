"""Derive the waterfall flow assets from the grotto artwork.

Emits two files that let the falls animate without moving the plate:

  public/scene/falls-mask.webp  alpha stencil marking only falling water
  public/scene/water-tile.webp  seamlessly tiling water-streak texture

The mask keeps the cliff, foliage and rocks perfectly still; the tile is the
only thing that moves. Run: python3 scripts/generate-water.py
"""
import numpy as np
from PIL import Image
from scipy.ndimage import gaussian_filter, grey_opening

SRC = "public/scene/grotto.webp"
POOL_Y = 815  # water below this is the basin surface, not the falls

im = Image.open(SRC).convert("RGBA")
W, H = im.size
a = np.asarray(im).astype(np.float32)
R, G, B, A = a[..., 0], a[..., 1], a[..., 2], a[..., 3]
L = 0.299 * R + 0.587 * G + 0.114 * B

# ── mask ──────────────────────────────────────────────────────────────
# Falling water is bright, blue-leaning and neither green (foliage) nor
# red (the pink flowers scattered over the cliff face).
score = (
    np.clip((L - 70) / 95.0, 0, 1)
    * np.clip((B - G + 6) / 22.0, 0, 1)
    * np.clip((B - R + 12) / 18.0, 0, 1)
    * (A / 255.0)
)
# Falls are tall columns; specks are not. Opening along y drops the specks.
score = grey_opening(score, size=(15, 3))
# Fade out into the basin — pool shimmer is a separate concern.
ramp = np.clip((POOL_Y - np.arange(H)) / 60.0, 0, 1)[:, None]
score = score * ramp
score = gaussian_filter(score, 2.4)
score = np.clip(score * 1.35, 0, 1)

mask = np.zeros((H, W, 4), np.uint8)
mask[..., :3] = 255
mask[..., 3] = (score * 255).astype(np.uint8)
Image.fromarray(mask).resize((W // 2, H // 2), Image.LANCZOS).save(
    "public/scene/falls-mask.webp", quality=88, method=6
)

# ── tile ──────────────────────────────────────────────────────────────
# Vertical streak field. Filtering wrapped noise along y makes the texture
# exactly periodic in its own height, so it scrolls forever with no seam and
# — unlike a mirrored crop — no symmetry for the eye to lock onto. Three
# octaves give broad ribbons, streaks, and fine threads at once.
TH, TW = 512, 720
rng = np.random.default_rng(7)
n = rng.standard_normal((TH, TW))
wrap = dict(mode="wrap")
tile = (
    gaussian_filter(n, (34, 1.2), **wrap) * 1.00
    + gaussian_filter(n, (9, 0.6), **wrap) * 0.55
    + gaussian_filter(n, (3, 0.35), **wrap) * 0.22
)
tile = 128.0 + (tile - tile.mean()) * (30.0 / tile.std())
tile = np.clip(tile, 0, 255)
Image.fromarray(tile.astype(np.uint8), "L").convert("RGB").save(
    "public/scene/water-tile.webp", quality=72, method=6
)

print("mask", (W // 2, H // 2), "tile", TW, TH)
print("mask coverage %.2f%%" % (100 * (score > 0.05).mean()))
