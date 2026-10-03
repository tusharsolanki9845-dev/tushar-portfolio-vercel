#!/usr/bin/env python3
from pathlib import Path

css_path = Path("client/src/index.css")
css = css_path.read_text(encoding="utf-8")
replacements = [
    (".process-steps", ".process-grid"),
    (".pricing-bands", ".pricing-grid"),
    (".project-grid", ".project-list"),
]
for old, new in replacements:
    css = css.replace(old, new)
css_path.write_text(css, encoding="utf-8")
print("Stagger selectors fixed")
