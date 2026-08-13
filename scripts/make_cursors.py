from PIL import Image
import os
from collections import deque

src_dir = r"C:\Users\katia\Downloads"
dest = r"c:\Users\katia\OneDrive\Documentos\New project\portafolio\src\assets\cursors"

sources = [
    ("ChatGPT Image 12 ago 2026, 18_32_40 (1).png", "cursor-default", "topleft", 32),
    ("ChatGPT Image 12 ago 2026, 18_32_40 (2).png", "cursor-pointer", "topcenter", 32),
    ("ChatGPT Image 12 ago 2026, 18_32_40 (3).png", "cursor-click", "topleft", 32),
    ("ChatGPT Image 12 ago 2026, 18_32_41 (4).png", "cursor-text", "center", 28),
]


def is_bg(r: int, g: int, b: int) -> bool:
    return r < 35 and g < 35 and b < 35


def remove_background_keep_body(im: Image.Image) -> Image.Image:
    im = im.convert("RGBA")
    w, h = im.size
    px = im.load()
    visited = [[False] * w for _ in range(h)]
    q: deque[tuple[int, int]] = deque()

    def enqueue(x: int, y: int) -> None:
        if 0 <= x < w and 0 <= y < h and not visited[y][x]:
            r, g, b, a = px[x, y]
            if a > 0 and is_bg(r, g, b):
                visited[y][x] = True
                q.append((x, y))

    for x in range(w):
        enqueue(x, 0)
        enqueue(x, h - 1)
    for y in range(h):
        enqueue(0, y)
        enqueue(w - 1, y)

    while q:
        x, y = q.popleft()
        px[x, y] = (0, 0, 0, 0)
        for nx, ny in ((x + 1, y), (x - 1, y), (x, y + 1), (x, y - 1)):
            enqueue(nx, ny)

    bbox = im.getbbox()
    return im.crop(bbox) if bbox else im


def dark_solid_cream(im: Image.Image) -> Image.Image:
    """Force opaque cream body on ALL non-bg pixels; keep copperish edges brighter."""
    out = im.copy()
    px = out.load()
    cream = (252, 240, 220, 255)
    cream_mid = (245, 228, 200, 255)
    copper = (230, 150, 90, 255)
    for y in range(out.height):
        for x in range(out.width):
            r, g, b, a = px[x, y]
            if a < 8:
                continue
            lum = 0.299 * r + 0.587 * g + 0.114 * b
            is_copper = r > 100 and g > 50 and b < r * 0.82 and (r - b) > 20 and lum > 70
            if is_copper:
                px[x, y] = copper
            elif lum < 130:
                px[x, y] = cream
            else:
                # highlights / midtones also go cream so nothing stays dark/hollow
                px[x, y] = cream_mid
    return out


def pack(im: Image.Image, size: int, align: str = "topleft", pad: int = 1) -> Image.Image:
    max_inner = size - pad * 2
    w, h = im.size
    scale = min(max_inner / w, max_inner / h)
    nw, nh = max(1, int(w * scale)), max(1, int(h * scale))
    im = im.resize((nw, nh), Image.Resampling.LANCZOS)
    canvas = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    if align == "topleft":
        x, y = pad, pad
    elif align == "topcenter":
        x, y = (size - nw) // 2, pad
    else:
        x, y = (size - nw) // 2, (size - nh) // 2
    canvas.paste(im, (x, y), im)
    return canvas


def main() -> None:
    os.makedirs(dest, exist_ok=True)
    for src_name, base, align, size in sources:
        raw = Image.open(os.path.join(src_dir, src_name)).convert("RGBA")
        cut = remove_background_keep_body(raw)

        # light: keep original dark body
        light = pack(cut.copy(), size, align)
        light.save(os.path.join(dest, f"{base}.png"), optimize=True)

        # dark: solid cream fill for ALL four
        dark = pack(dark_solid_cream(cut.copy()), size, align)
        dark_path = os.path.join(dest, f"{base}-dark.png")
        dark.save(dark_path, optimize=True)

        cream = sum(1 for p in dark.getdata() if p[3] > 200 and p[0] > 200)
        print(f"{base}-dark cream_px={cream} file={os.path.getsize(dark_path)}")


if __name__ == "__main__":
    main()
