#!/usr/bin/env python3
"""Restore client/src/pages/Home.tsx from a known-good commit and apply student-friendly pricing."""
from __future__ import annotations

import urllib.request
from pathlib import Path

GOOD_SHA = "f7288ac036536c3ab5915f943a12b72d6ca4fc3e"
URL = (
    "https://raw.githubusercontent.com/tusharsolanki9845-dev/tushar-portfolio-vercel/"
    f"{GOOD_SHA}/client/src/pages/Home.tsx"
)
OUT = Path("client/src/pages/Home.tsx")

REPLACEMENTS = [
    ("₹8,000 – 20,000", "₹5,000 – 15,000"),
    ("₹20,000 – 45,000", "₹15,000 – 35,000"),
    ("₹40,000 – 80,000", "₹30,000 – 60,000"),
    ("₹8,000–20,000", "₹5,000–15,000"),
    ("₹20,000–45,000", "₹15,000–35,000"),
    ("₹40,000–80,000", "₹30,000–60,000"),
]


def main() -> None:
    text = urllib.request.urlopen(URL, timeout=60).read().decode("utf-8")
    for old, new in REPLACEMENTS:
        if old not in text:
            raise SystemExit(f"Expected string not found: {old!r}")
        text = text.replace(old, new)
    if "₹5,000 – 15,000" not in text:
        raise SystemExit("Student pricing not applied")
    if "wa.me/916396015608" not in text:
        raise SystemExit("WhatsApp number missing after restore")
    OUT.parent.mkdir(parents=True, exist_ok=True)
    OUT.write_text(text, encoding="utf-8")
    print(f"Wrote {OUT} ({len(text)} chars) with student-friendly pricing; WhatsApp unchanged.")


if __name__ == "__main__":
    main()
