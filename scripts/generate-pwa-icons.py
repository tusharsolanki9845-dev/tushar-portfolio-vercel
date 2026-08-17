from pathlib import Path
from PIL import Image, ImageDraw

output_dir = Path("/home/ubuntu/tushar-portfolio-vercel/client/public/pwa")
output_dir.mkdir(parents=True, exist_ok=True)

for size in (180, 192, 512):
    image = Image.new("RGBA", (size, size), "#111715")
    draw = ImageDraw.Draw(image)
    s = size / 512
    amber = "#f2b35e"
    paper = "#f9f1e5"
    draw.ellipse((108*s, 108*s, 404*s, 404*s), outline=amber, width=max(2, int(16*s)))
    draw.rectangle((214*s, 156*s, 252*s, 342*s), fill=paper)
    draw.rectangle((188*s, 156*s, 280*s, 194*s), fill=paper)
    draw.rectangle((188*s, 304*s, 342*s, 342*s), fill=amber)
    filename = "apple-touch-icon.png" if size == 180 else f"icon-{size}.png"
    image.save(output_dir / filename, "PNG", optimize=True)
