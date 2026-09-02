"""Cut two hanging vines out of the near plate so they can sway.

The foreground plate was the obvious candidate and the wrong one: it is graded
to brightness 0.17, so a vine moving against the sky there changes almost no
luminance no matter how far it swings. The near plate is twice as bright and
its vines are longer and better separated.

A mask selects; it cannot displace. So the plate is drawn three times from the
same file: once with the vines masked out, and once per vine with only that
vine showing, each free to rotate about the point it hangs from. Emits only the
three stencils — the artwork itself is reused, not duplicated.

  public/scene/near-still-mask.webp   everything except the two vines
  public/scene/near-vine-l-mask.webp  the left trailing vine
  public/scene/near-vine-r-mask.webp  the right trailing vine

Anchors sit well above the visible window, so the cut never comes into frame
even at full scroll, and rotating about them displaces the tip while leaving
the attachment still. Run: python3 scripts/generate-sway.py
"""
import numpy as np
from PIL import Image
from scipy.ndimage import gaussian_filter

SRC = "public/scene/near.webp"
# (x0, x1, y0, y1) in artwork pixels. Generous boxes; the plate's own alpha
# then keeps only the leaves inside them.
VINES = {
    "l": (468, 585, 148, 585),
    "r": (1082, 1205, 148, 578),
}

im = Image.open(SRC).convert("RGBA")
W, H = im.size
alpha = np.asarray(im)[..., 3].astype(np.float32) / 255.0
xs = np.arange(W)[None, :]
ys = np.arange(H)[:, None]

stencils = {}
for key, (x0, x1, y0, y1) in VINES.items():
    f = 34.0  # feather, so no cut edge is ever a hard line
    box = (
        np.clip((xs - x0) / f, 0, 1)
        * np.clip((x1 - xs) / f, 0, 1)
        * np.clip((ys - y0) / f, 0, 1)
        * np.clip((y1 - ys) / f, 0, 1)
    )
    stencils[key] = gaussian_filter(box * alpha, 3.0)

union = np.clip(sum(stencils.values()), 0, 1)


def write(name, a):
    m = np.zeros((H, W, 4), np.uint8)
    m[..., :3] = 255
    m[..., 3] = (np.clip(a, 0, 1) * 255).astype(np.uint8)
    Image.fromarray(m).resize((W // 2, H // 2), Image.LANCZOS).save(
        "public/scene/%s.webp" % name, quality=88, method=6
    )


write("near-still-mask", 1.0 - union)
for key, s in stencils.items():
    write("near-vine-%s-mask" % key, s)
    print("vine %s covers %.3f%% of the plate" % (key, 100 * (s > 0.05).mean()))
