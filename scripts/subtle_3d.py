#!/usr/bin/env python3
"""Tone down project 3D so it feels subtle and natural."""
from __future__ import annotations

from pathlib import Path

HOME = Path("client/src/pages/Home.tsx")
CSS = Path("client/src/index.css")


def main() -> None:
    home = HOME.read_text(encoding="utf-8")

    # Soften pointer math (works for either *14/*16 or *11/*13 variants)
    replacements = [
        ("const tiltX = (0.5 - py) * 14;", "const tiltX = (0.5 - py) * 5;"),
        ("const tiltY = (px - 0.5) * 16;", "const tiltY = (px - 0.5) * 6;"),
        ("const tiltX = (-ny * 11).toFixed(2);", "const tiltX = (-ny * 5).toFixed(2);"),
        ("const tiltY = (nx * 13).toFixed(2);", "const tiltY = (nx * 6).toFixed(2);"),
        ('setProperty("--tilt-scale", "1.015")', 'setProperty("--tilt-scale", "1.006")'),
        ('setProperty("--tilt-scale", "1.02")', 'setProperty("--tilt-scale", "1.006")'),
        ('setProperty("--tilt-scale", "1.015");', 'setProperty("--tilt-scale", "1.006");'),
        ('setProperty("--tilt-scale", "1.02");', 'setProperty("--tilt-scale", "1.006");'),
    ]
    for old, new in replacements:
        if old in home:
            home = home.replace(old, new)
            print(f"home: {old[:40]} -> softened")

    HOME.write_text(home, encoding="utf-8")

    css = CSS.read_text(encoding="utf-8")

    css_reps = [
        # Rest pose — almost flat product, tiny angle
        (
            "transform: rotateY(-6deg) rotateX(4deg);",
            "transform: rotateY(-2deg) rotateX(1.5deg);",
        ),
        (
            "transform: rotateY(-5deg) rotateX(3.5deg) translateZ(0);",
            "transform: rotateY(-2deg) rotateX(1.5deg) translateZ(0);",
        ),
        # Hover lift milder
        (
            "transform: rotateY(-2deg) rotateX(2deg) translateZ(12px) scale(1.02);",
            "transform: rotateY(-1deg) rotateX(1deg) translateZ(6px) scale(1.01);",
        ),
        (
            "transform: rotateY(-1deg) rotateX(1deg) translateZ(16px) scale(1.025);",
            "transform: rotateY(-1deg) rotateX(1deg) translateZ(6px) scale(1.01);",
        ),
        # Stage less extreme
        ("transform: translateZ(28px);", "transform: translateZ(16px);"),
        ("transform: translateZ(36px);", "transform: translateZ(16px);"),
        ("transform: translateZ(18px);", "transform: translateZ(10px);"),
        ("transform: translateZ(22px);", "transform: translateZ(10px);"),
        ("transform: translateZ(8px);", "transform: translateZ(4px);"),
        ("transform: translateZ(10px);", "transform: translateZ(4px);"),
        # Softer shadows on mockup
        (
            """box-shadow:
    0 18px 40px rgba(0, 0, 0, 0.28),
    0 2px 0 rgba(255, 255, 255, 0.06) inset,
    -12px 16px 32px rgba(0, 0, 0, 0.22);""",
            """box-shadow:
    0 12px 28px rgba(0, 0, 0, 0.16),
    0 1px 0 rgba(255, 255, 255, 0.05) inset,
    -6px 10px 20px rgba(0, 0, 0, 0.12);""",
        ),
        (
            """box-shadow:
    0 28px 56px rgba(0, 0, 0, 0.36),
    0 2px 0 rgba(255, 255, 255, 0.08) inset,
    -16px 22px 40px rgba(0, 0, 0, 0.28);""",
            """box-shadow:
    0 16px 36px rgba(0, 0, 0, 0.2),
    0 1px 0 rgba(255, 255, 255, 0.06) inset,
    -8px 12px 24px rgba(0, 0, 0, 0.14);""",
        ),
        # Glare quieter
        ("rgba(255, 255, 255, 0.14)", "rgba(255, 255, 255, 0.08)"),
        ("opacity: 0.55;\n  transform: translateZ(2px);", "opacity: 0.35;\n  transform: translateZ(2px);"),
        # Stage shadow softer
        ("opacity: 0.55;", "opacity: 0.35;"),
        ("opacity: 0.85;", "opacity: 0.55;"),
        ("opacity: 0.5;", "opacity: 0.35;"),
        ("opacity: 0.9;", "opacity: 0.55;"),
        # Smoother transitions (less snappy)
        ("transition: transform 50ms linear", "transition: transform 120ms ease-out"),
        ("transition: transform 60ms linear", "transition: transform 120ms ease-out"),
        ("transform 80ms cubic-bezier(0.2, 0.8, 0.2, 1)", "transform 140ms ease-out"),
        ("transform 90ms cubic-bezier(0.2, 0.8, 0.2, 1)", "transform 140ms ease-out"),
    ]

    for old, new in css_reps:
        if old in css:
            css = css.replace(old, new)
            print(f"css: matched {old[:48]!r}")

    # Append override block to win cascade over earlier aggressive rules
    marker = "/* subtle natural 3D overrides */"
    if marker not in css:
        css = css.rstrip() + f"""

{marker}
.project-card {{
  --tilt-x: 0deg;
  --tilt-y: 0deg;
  --tilt-scale: 1;
  transform: perspective(1200px) rotateX(var(--tilt-x)) rotateY(var(--tilt-y)) scale(var(--tilt-scale));
  transition: transform 380ms cubic-bezier(0.25, 0.8, 0.25, 1), border-color 280ms ease, box-shadow 380ms ease;
}}

.project-card.is-tilting {{
  transition: transform 140ms ease-out, border-color 200ms ease, box-shadow 200ms ease;
  z-index: 2;
}}

.project-stage {{
  transform: translateZ(14px);
}}

.project-stage-shadow {{
  opacity: 0.32;
  filter: blur(12px);
  bottom: -14px;
  height: 24px;
}}

.project-card.is-tilting .project-stage-shadow,
.project-card:hover .project-stage-shadow {{
  opacity: 0.48;
}}

.project-mockup {{
  transform: rotateY(-2deg) rotateX(1.25deg);
  box-shadow:
    0 10px 24px rgba(0, 0, 0, 0.14),
    0 1px 0 rgba(255, 255, 255, 0.05) inset;
}}

.project-card.is-tilting .project-mockup,
.project-card:hover .project-mockup {{
  transform: rotateY(-0.5deg) rotateX(0.5deg) translateZ(4px) scale(1.008);
  box-shadow:
    0 14px 30px rgba(0, 0, 0, 0.18),
    0 1px 0 rgba(255, 255, 255, 0.06) inset;
}}

.project-mockup-glare {{
  opacity: 0.28;
  background: linear-gradient(
    120deg,
    transparent 28%,
    rgba(255, 255, 255, 0.07) 48%,
    transparent 64%
  );
}}

.project-info {{
  transform: translateZ(8px);
}}

@media (max-width: 900px) {{
  .project-mockup,
  .project-card.is-tilting .project-mockup,
  .project-card:hover .project-mockup,
  .project-stage,
  .project-info {{
    transform: none !important;
  }}
}}

@media (prefers-reduced-motion: reduce) {{
  .project-card,
  .project-card.is-tilting,
  .project-mockup,
  .project-stage,
  .project-info {{
    transform: none !important;
  }}
  .project-stage-shadow,
  .project-mockup-glare {{
    display: none;
  }}
}}
"""
        print("appended subtle override block")

    CSS.write_text(css, encoding="utf-8")
    print("done")


if __name__ == "__main__":
    main()
