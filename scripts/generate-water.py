"""Derive the moving-water assets from the scene artwork.

Emits an alpha stencil and a tiling texture for each body of water, so the
plates themselves never move:

  falls-mask.webp / water-tile.webp   falling water in the grotto
  pool-mask.webp  / ripple-tile.webp  the stream's lit surface

Each mask keeps the surrounding cliff, foliage and rocks perfectly still; the
tiles are the only things that move. Run: python3 scripts/generate-water.py
"""
import numpy as np
from PIL import Image
from scipy.ndimage import gaussian_filter, grey_opening, uniform_filter

SRC = "public/scene/grotto.webp"
STREAM = "public/scene/stream.webp"
POOL_Y = 815  # water below this is the basin surface, not the falls
HAZE_X = 980  # left of here, below HAZE_Y, is haze rather than falling water
HAZE_Y = 460

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
# Below the cliff face the falls' left flank is standing haze, not falling
# water. It is bright and blue enough to pass the colour test but has nothing
# to fall from, so animating it read as drifting fog. Keep everything above the
# cliff line, and below it keep only what lies right of the water's edge; both
# boundaries are ramped so no edge shows in the stencil.
xs = np.arange(W)[None, :]
ys = np.arange(H)[:, None]
score = score * np.clip(
    np.clip((xs - HAZE_X) / 80.0, 0, 1) + np.clip((HAZE_Y - ys) / 60.0, 0, 1), 0, 1
)
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

print("falls mask", (W // 2, H // 2), "tile", TW, TH)
print("falls coverage %.2f%%" % (100 * (score > 0.05).mean()))

# ── the stream's surface ──────────────────────────────────────────────
sim = Image.open(STREAM).convert("RGBA")
SW, SH = sim.size
sa = np.asarray(sim).astype(np.float32)
sR, sG, sB, sA = sa[..., 0], sa[..., 1], sa[..., 2], sa[..., 3]
sL = 0.299 * sR + 0.587 * sG + 0.114 * sB

# ── pool stencil ──
# The falls' colour test is useless here: this reflection is warm gold, not
# blue. What does separate water from everything else is that its surface is
# banded horizontally while foliage and rock are detailed in every direction.
# A shoreline traced from the artwork bounds the search; brightness then
# concentrates the shimmer on the lit reflection, where it actually belongs,
# and leaves the dark water and the rocks standing in it alone.
SHORE_Y = np.array([230, 300, 360, 420, 480, 540, 600, 631])
SHORE_L = np.array([650, 598, 562, 518, 452, 378, 318, 298])
SHORE_R = np.array([772, 864, 908, 962, 1012, 1072, 1142, 1182])
rows = np.arange(SH)
cols = np.arange(SW)[None, :]
left = np.interp(rows, SHORE_Y, SHORE_L)[:, None]
right = np.interp(rows, SHORE_Y, SHORE_R)[:, None]
shore = (
    np.clip((cols - left) / 26.0, 0, 1)
    * np.clip((right - cols) / 26.0, 0, 1)
    * np.clip((rows - 228) / 26.0, 0, 1)[:, None]
)
banded = uniform_filter(np.abs(sL - gaussian_filter(sL, (9, 0.4))), 9) - uniform_filter(
    np.abs(sL - gaussian_filter(sL, (0.4, 9))), 9
)
pool = (
    shore
    * np.clip((sL - 32) / 45.0, 0, 1)
    * np.clip((4 - (sG - np.maximum(sR, sB))) / 6.0, 0, 1)
    * np.clip(banded / 6.0, 0, 1)
    * (sA / 255.0)
)
pool = np.clip(gaussian_filter(pool, 2.2) * 1.7, 0, 1)
pm = np.zeros((SH, SW, 4), np.uint8)
pm[..., :3] = 255
pm[..., 3] = (pool * 255).astype(np.uint8)
Image.fromarray(pm).resize((SW // 2, SH // 2), Image.LANCZOS).save(
    "public/scene/pool-mask.webp", quality=88, method=6
)

# ── ripple tile ──
# Bands of reflected light, drawn in the water's own plane and then resampled
# into screen space through a perspective falloff, so they crowd together
# toward the far bank exactly as the painted ripples do. Wrapped in x so the
# texture can drift sideways forever. Two of these counter-drifting is what
# produces the shimmer: the bands carry a slow waviness, so sliding them past
# each other moves their crossings around instead of merely translating a
# fixed pattern.
PW, PH = 750, 631
PLANE = 1400
rng2 = np.random.default_rng(19)
plane = rng2.standard_normal((PLANE, PW))
xw = dict(mode=["reflect", "wrap"])
plane = (
    gaussian_filter(plane, (1.1, 15), **xw)
    + gaussian_filter(plane, (0.5, 5), **xw) * 0.55
)
# Waviness along the bands, itself wrapped so it tiles with them.
wave = gaussian_filter(rng2.standard_normal(PW), 46, mode="wrap")
wave = 11.0 * wave / np.abs(wave).max()
depth = PLANE * (1.0 - (1.0 - np.arange(PH) / PH) ** 1.8)
u = depth[:, None] + wave[None, :]
u = np.clip(u, 0, PLANE - 2)
u0 = u.astype(np.int32)
fr = u - u0
xi = np.arange(PW)[None, :]
ripple = plane[u0, xi] * (1 - fr) + plane[u0 + 1, xi] * fr
ripple = 128.0 + (ripple - ripple.mean()) * (30.0 / ripple.std())
Image.fromarray(np.clip(ripple, 0, 255).astype(np.uint8), "L").convert("RGB").save(
    "public/scene/ripple-tile.webp", quality=74, method=6
)
print("pool mask", (SW // 2, SH // 2), "ripple", PW, PH)
print("pool coverage %.2f%%" % (100 * (pool > 0.05).mean()))
