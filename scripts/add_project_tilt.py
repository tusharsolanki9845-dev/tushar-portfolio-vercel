#!/usr/bin/env python3
"""Add 3D pointer-tilt to project cards."""
from __future__ import annotations

from pathlib import Path

HOME = Path("client/src/pages/Home.tsx")
CSS = Path("client/src/index.css")

OLD_HANDLERS = '''                  onPointerMove={(event) => {
                    const bounds = event.currentTarget.getBoundingClientRect();
                    event.currentTarget.style.setProperty("--spotlight-x", `${((event.clientX - bounds.left) / bounds.width) * 100}%`);
                    event.currentTarget.style.setProperty("--spotlight-y", `${((event.clientY - bounds.top) / bounds.height) * 100}%`);
                  }}
                  onPointerLeave={(event) => {
                    event.currentTarget.style.removeProperty("--spotlight-x");
                    event.currentTarget.style.removeProperty("--spotlight-y");
                  }}'''

NEW_HANDLERS = '''                  onPointerMove={(event) => {
                    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
                    if (window.matchMedia("(hover: none)").matches) return;
                    const bounds = event.currentTarget.getBoundingClientRect();
                    const px = (event.clientX - bounds.left) / bounds.width;
                    const py = (event.clientY - bounds.top) / bounds.height;
                    const tiltX = (0.5 - py) * 10;
                    const tiltY = (px - 0.5) * 12;
                    event.currentTarget.style.setProperty("--spotlight-x", `${px * 100}%`);
                    event.currentTarget.style.setProperty("--spotlight-y", `${py * 100}%`);
                    event.currentTarget.style.setProperty("--tilt-x", `${tiltX.toFixed(2)}deg`);
                    event.currentTarget.style.setProperty("--tilt-y", `${tiltY.toFixed(2)}deg`);
                    event.currentTarget.style.setProperty("--tilt-scale", "1.015");
                    event.currentTarget.classList.add("is-tilting");
                  }}
                  onPointerLeave={(event) => {
                    event.currentTarget.style.removeProperty("--spotlight-x");
                    event.currentTarget.style.removeProperty("--spotlight-y");
                    event.currentTarget.style.setProperty("--tilt-x", "0deg");
                    event.currentTarget.style.setProperty("--tilt-y", "0deg");
                    event.currentTarget.style.setProperty("--tilt-scale", "1");
                    event.currentTarget.classList.remove("is-tilting");
                  }}'''

OLD_CARD_CSS = '''.project-card {
  position: relative;
  isolation: isolate;
  overflow: hidden;
  display: grid;
  grid-template-columns: 1.05fr 0.95fr;
  gap: 40px;
  padding: 32px;
  border: 1px solid var(--border);
  border-radius: var(--radius);
  background: var(--panel);
  box-shadow: 0 10px 26px rgba(0, 0, 0, 0.12);
  transition: transform 240ms cubic-bezier(0.23, 1, 0.32, 1), border-color 240ms ease, background 240ms ease, box-shadow 240ms ease;
}'''

NEW_CARD_CSS = '''.project-list {
  perspective: 1200px;
}

.project-card {
  --tilt-x: 0deg;
  --tilt-y: 0deg;
  --tilt-scale: 1;
  position: relative;
  isolation: isolate;
  overflow: hidden;
  display: grid;
  grid-template-columns: 1.05fr 0.95fr;
  gap: 40px;
  padding: 32px;
  border: 1px solid var(--border);
  border-radius: var(--radius);
  background: var(--panel);
  box-shadow: 0 10px 26px rgba(0, 0, 0, 0.12);
  transform: perspective(900px) rotateX(var(--tilt-x)) rotateY(var(--tilt-y)) scale(var(--tilt-scale)) translateY(0);
  transform-style: preserve-3d;
  will-change: transform;
  transition: transform 180ms cubic-bezier(0.23, 1, 0.32, 1), border-color 240ms ease, background 240ms ease, box-shadow 240ms ease;
}

.project-card.is-tilting {
  transition: transform 60ms linear, border-color 240ms ease, background 240ms ease, box-shadow 240ms ease;
  border-color: color-mix(in srgb, var(--accent) 55%, var(--border));
  box-shadow:
    0 24px 48px rgba(0, 0, 0, 0.28),
    0 0 0 1px color-mix(in srgb, var(--accent) 18%, transparent);
}'''

OLD_HOVER = '''@media (hover: hover) {
  .project-card:hover,
  .project-card:focus-within {
    transform: translateY(-8px);
    border-color: rgba(240, 177, 82, 0.72);
    background: var(--panel-hover);
    box-shadow: 0 22px 44px rgba(0, 0, 0, 0.28);
  }'''

NEW_HOVER = '''@media (hover: hover) {
  .project-card:hover,
  .project-card:focus-within {
    border-color: rgba(240, 177, 82, 0.72);
    background: var(--panel-hover);
    box-shadow: 0 22px 44px rgba(0, 0, 0, 0.28);
  }

  .project-card:hover:not(.is-tilting),
  .project-card:focus-within:not(.is-tilting) {
    transform: perspective(900px) rotateX(0deg) rotateY(0deg) scale(1) translateY(-8px);
  }'''


def main() -> None:
    home = HOME.read_text(encoding="utf-8")
    if "--tilt-x" in home:
        print("Home already has tilt handlers")
    elif OLD_HANDLERS not in home:
        raise SystemExit("pointer handlers block not found")
    else:
        home = home.replace(OLD_HANDLERS, NEW_HANDLERS)
        HOME.write_text(home, encoding="utf-8")
        print("Home tilt handlers added")

    css = CSS.read_text(encoding="utf-8")
    if "--tilt-x: 0deg" in css:
        print("CSS already has tilt")
    else:
        if OLD_CARD_CSS not in css:
            raise SystemExit("project-card CSS block not found")
        # Avoid duplicating .project-list rule - NEW_CARD_CSS starts with .project-list
        # Replace only .project-card block carefully
        css = css.replace(OLD_CARD_CSS, NEW_CARD_CSS.replace(".project-list {\n  perspective: 1200px;\n}\n\n", "", 1))
        # Add perspective on project-list separately if missing
        if "perspective: 1200px" not in css:
            css = css.replace(
                ".project-list {\n  display: grid;\n  gap: 20px;\n}",
                ".project-list {\n  display: grid;\n  gap: 20px;\n  perspective: 1200px;\n}",
            )
        if OLD_HOVER in css:
            css = css.replace(OLD_HOVER, NEW_HOVER)
        # reduced motion
        if "project-card 3d tilt" not in css:
            css += '''

/* project-card 3d tilt */
@media (prefers-reduced-motion: reduce) {
  .project-card,
  .project-card.is-tilting,
  .project-card:hover,
  .project-card:focus-within {
    transform: none !important;
  }
}
'''
        CSS.write_text(css, encoding="utf-8")
        print("CSS tilt styles added")


if __name__ == "__main__":
    main()
