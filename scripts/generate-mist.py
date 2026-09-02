"""Generate the drifting mist texture for the hero scene.

The fog was three radial gradients sliding sideways on `alternate`, so it
reversed direction and its shape never changed. This emits one cloud texture
instead:

  public/scene/mist-tile.webp  pale banks and gaps, wrapping on both axes

Wrapping both ways lets a band translate by exactly one tile diagonally and
land on itself, which gives endless one-way drift with a slow rise and no
reversal. Run: python3 scripts/generate-mist.py
"""
import numpy as np
from PIL import Image
from scipy.ndimage import gaussian_filter

# Roughly the aspect each band displays the tile at, so the clouds are not
# stretched into stripes. One tile spans a whole band vertically, so no cloud
# ever appears twice stacked above itself.
W, H = 768, 250
TINT = (186, 214, 198)  # the scene's existing fog colour

rng = np.random.default_rng(31)
n = rng.standard_normal((H, W))
wrap = dict(mode="wrap")
# Two broad octaves and one soft billow. Anything finer reads as speckle, not
# vapour — a first attempt with sharper octaves looked like lichen.
# Elongated horizontally, because ground mist lies in banks far wider than
# they are tall.
f = (
    gaussian_filter(n, (44, 96), **wrap)
    + gaussian_filter(n, (19, 42), **wrap) * 0.50
    + gaussian_filter(n, (8, 17), **wrap) * 0.20
)
f = (f - f.mean()) / f.std()
# Threshold hard enough that a bank is a definite shape you can follow across
# the frame, soft enough that every edge is still a gradient. Vapour you cannot
# track is vapour you cannot see move.
a = np.clip((f + 0.48) / 2.15, 0, 1) ** 1.28
a = gaussian_filter(a, 4, **wrap)

out = np.zeros((H, W, 4), np.uint8)
out[..., 0], out[..., 1], out[..., 2] = TINT
out[..., 3] = (a * 0.72 * 255).astype(np.uint8)
Image.fromarray(out).save("public/scene/mist-tile.webp", quality=86, method=6)
print("mist", W, H, "alpha mean %.3f peak %.3f" % (a.mean() * 0.72, a.max() * 0.72))
