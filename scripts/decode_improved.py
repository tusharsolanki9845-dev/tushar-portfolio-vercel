#!/usr/bin/env python3
import base64, zlib, re
from pathlib import Path

def parts(prefix):
    files = sorted(
        Path(".restore-data").glob(f"{prefix}_*.txt"),
        key=lambda p: int(re.search(r"_(\d+)\.txt$", p.name).group(1)),
    )
    files = [p for p in files if re.fullmatch(rf"{prefix}_\d+\.txt", p.name)]
    if not files:
        raise SystemExit(f"No {prefix}_N.txt parts found")
    return "".join(p.read_text().strip() for p in files)

home = zlib.decompress(base64.b64decode(parts("home")))
css = zlib.decompress(base64.b64decode(parts("css")))
Path("client/src/pages/Home.tsx").write_bytes(home)
Path("client/src/index.css").write_bytes(css)
print("Wrote", len(home), len(css))
