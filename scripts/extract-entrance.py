"""Cut the three entrance plates out of the generated contact sheet.

The sheet arrives as one image holding three panels, so the panels are found by
their empty rows and columns rather than by hand-measured boxes.

Grading is baked in rather than left to a CSS filter. Ungraded the plates
arrive far brighter than the scene they open onto, so it looked like the scene
dimmed as you reached it — but a filter on a layer that is also being scaled
costs a re-rasterisation per frame, and measured a 800ms frame during the
entrance. Baked, it is free.

Run: python3 scripts/extract-entrance.py
"""
import numpy as np
from PIL import Image

SRC = "/Users/drewbomar/Downloads/ChatGPT Image Sep 3, 2026, 01_55_50 PM.png"
# name -> panel box, and whether that panel is a full-bleed curtain
PANELS = {
    "enter-near": (9, 9, 828, 468),
    "enter-mid": (844, 9, 1663, 468),
    "enter-strands": (260, 481, 1408, 890),
}
BRIGHT, SAT = 0.62, 0.72

im = Image.open(SRC).convert("RGBA")
for name, (x0, y0, x1, y1) in PANELS.items():
    c = np.asarray(im.crop((x0, y0, x1, y1))).astype(np.float32)
    rgb = c[..., :3]
    lum = (rgb * [0.2126, 0.7152, 0.0722]).sum(axis=2, keepdims=True)
    rgb = np.clip((lum + (rgb - lum) * SAT) * BRIGHT, 0, 255)
    rgb *= [0.96, 1.0, 1.03]  # a touch bluer, as the scene's own grading is
    c[..., :3] = np.clip(rgb, 0, 255)
    # These exports top out near 250 rather than 255; snap so solid leaf bodies
    # do not veil what is behind them.
    c[..., 3] = np.where(c[..., 3] >= 246, 255, c[..., 3])
    out = Image.fromarray(c.astype(np.uint8))
    out.save("public/scene/%s.webp" % name, quality=84, method=6)
    print("%-14s %dx%d" % (name, out.width, out.height))
