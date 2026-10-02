#!/usr/bin/env python3
import base64, zlib
from pathlib import Path
home = zlib.decompress(base64.b64decode("".join(p.read_text().strip() for p in sorted(Path(".restore-data").glob("home_*.txt")))))
css = zlib.decompress(base64.b64decode("".join(p.read_text().strip() for p in sorted(Path(".restore-data").glob("css_*.txt")))))
Path("client/src/pages/Home.tsx").write_bytes(home)
Path("client/src/index.css").write_bytes(css)
print("Wrote", len(home), len(css))
