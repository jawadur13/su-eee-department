import os
from PIL import Image, ImageEnhance

SRC = r"D:\Projects\A-Databrandix\Mechanical-Engineering-main\temporary files"
DST = r"D:\Projects\A-Databrandix\Mechanical-Engineering-main\public\assets"

FILES = [
    "sueec-robotics-workshop.png",
    "sueec-tech-talks.png",
    "sueec-project-exhibitions.png",
    "sueec-industrial-visits.png",
    "sueec-leadership.png",
    "sueec-networking.png",
    "cover.png",
    "intro-image.png",
]

for f in FILES:
    src_path = os.path.join(SRC, f)
    dst_path = os.path.join(DST, f.replace(".png", ".webp"))

    img = Image.open(src_path).convert("RGB")
    orig_w, orig_h = img.size

    img = ImageEnhance.Sharpness(img).enhance(1.5)
    img = ImageEnhance.Contrast(img).enhance(1.2)
    img = ImageEnhance.Brightness(img).enhance(1.1)
    img = ImageEnhance.Color(img).enhance(1.1)

    img.save(dst_path, "webp", quality=85)
    out_size = os.path.getsize(dst_path)
    print(f"{f} -> {f.replace('.png','.webp')}  ({orig_w}x{orig_h}  {out_size/1024:.1f} KB)")
