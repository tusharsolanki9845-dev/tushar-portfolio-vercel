#!/usr/bin/env python3
"""Make project 3D tilt feel physical: damped motion, directional light & shadow."""
from __future__ import annotations

from pathlib import Path

HOME = Path("client/src/pages/Home.tsx")
CSS = Path("client/src/index.css")

OLD_HANDLERS = '''                  onPointerMove={(event) => {
                    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
                    if (window.matchMedia("(hover: none)").matches) return;
                    const bounds = event.currentTarget.getBoundingClientRect();
                    const px = (event.clientX - bounds.left) / bounds.width;
                    const py = (event.clientY - bounds.top) / bounds.height;
                    const tiltX = (0.5 - py) * 14;
                    const tiltY = (px - 0.5) * 16;
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

# More realistic: softer max angle, center-weighted falloff, light + shadow vectors
NEW_HANDLERS = '''                  onPointerMove={(event) => {
                    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
                    if (window.matchMedia("(hover: none)").matches) return;
                    const el = event.currentTarget;
                    const bounds = el.getBoundingClientRect();
                    const px = Math.min(1, Math.max(0, (event.clientX - bounds.left) / bounds.width));
                    const py = Math.min(1, Math.max(0, (event.clientY - bounds.top) / bounds.height));
                    // Center-weighted: stronger near edges, smooth near middle
                    const nx = (px - 0.5) * 2;
                    const ny = (py - 0.5) * 2;
                    const tiltX = (-ny * 11).toFixed(2);
                    const tiltY = (nx * 13).toFixed(2);
                    // Shadow moves opposite the high side of the card
                    const shadowX = (nx * 18).toFixed(1);
                    const shadowY = (14 + ny * 10).toFixed(1);
                    // Specular sits slightly above the pointer
                    el.style.setProperty("--spotlight-x", `${px * 100}%`);
                    el.style.setProperty("--spotlight-y", `${py * 100}%`);
                    el.style.setProperty("--tilt-x", `${tiltX}deg`);
                    el.style.setProperty("--tilt-y", `${tiltY}deg`);
                    el.style.setProperty("--tilt-scale", "1.02");
                    el.style.setProperty("--shadow-x", `${shadowX}px`);
                    el.style.setProperty("--shadow-y", `${shadowY}px`);
                    el.style.setProperty("--glare-x", `${px * 100}%`);
                    el.style.setProperty("--glare-y", `${py * 100}%`);
                    el.style.setProperty("--light-intensity", `${(0.35 + (1 - Math.hypot(nx, ny) * 0.25)).toFixed(2)}`);
                    el.classList.add("is-tilting");
                  }}
                  onPointerLeave={(event) => {
                    const el = event.currentTarget;
                    el.style.removeProperty("--spotlight-x");
                    el.style.removeProperty("--spotlight-y");
                    el.style.setProperty("--tilt-x", "0deg");
                    el.style.setProperty("--tilt-y", "0deg");
                    el.style.setProperty("--tilt-scale", "1");
                    el.style.setProperty("--shadow-x", "0px");
                    el.style.setProperty("--shadow-y", "18px");
                    el.style.setProperty("--glare-x", "30%");
                    el.style.setProperty("--glare-y", "20%");
                    el.style.setProperty("--light-intensity", "0.4");
                    el.classList.remove("is-tilting");
                  }}'''

CSS_REALISTIC = '''

/* —— realistic 3D physics + lighting —— */
.project-list {
  perspective: 1600px;
  perspective-origin: 50% 40%;
}

.project-card {
  --tilt-x: 0deg;
  --tilt-y: 0deg;
  --tilt-scale: 1;
  --shadow-x: 0px;
  --shadow-y: 18px;
  --glare-x: 30%;
  --glare-y: 20%;
  --light-intensity: 0.4;
  overflow: visible;
  transform-style: preserve-3d;
  transform:
    perspective(1100px)
    rotateX(var(--tilt-x))
    rotateY(var(--tilt-y))
    scale3d(var(--tilt-scale), var(--tilt-scale), 1);
  transition:
    transform 420ms cubic-bezier(0.22, 1, 0.36, 1),
    border-color 280ms ease,
    background 280ms ease,
    box-shadow 420ms cubic-bezier(0.22, 1, 0.36, 1);
  box-shadow:
    var(--shadow-x) var(--shadow-y) 32px rgba(0, 0, 0, 0.22),
    0 1px 0 rgba(255, 255, 255, 0.04) inset;
}

.project-card.is-tilting {
  /* near-instant tracking while pointer is down on the surface */
  transition:
    transform 80ms cubic-bezier(0.2, 0.8, 0.2, 1),
    box-shadow 80ms ease,
    border-color 200ms ease;
  z-index: 3;
  box-shadow:
    var(--shadow-x) calc(var(--shadow-y) + 8px) 48px rgba(0, 0, 0, 0.34),
    0 0 0 1px color-mix(in srgb, var(--accent) 22%, transparent),
    0 1px 0 rgba(255, 255, 255, 0.06) inset;
}

/* Ambient light wash that follows the pointer */
.project-card::before {
  content: "";
  position: absolute;
  inset: 0;
  z-index: 0;
  pointer-events: none;
  border-radius: inherit;
  opacity: 0;
  background: radial-gradient(
    600px circle at var(--spotlight-x, 50%) var(--spotlight-y, 40%),
    rgba(255, 255, 255, calc(var(--light-intensity) * 0.12)),
    transparent 42%
  );
  transition: opacity 280ms ease;
}

.project-card.is-tilting::before,
.project-card:hover::before {
  opacity: 1;
}

.project-stage {
  position: relative;
  min-height: 280px;
  transform-style: preserve-3d;
  transform: translateZ(36px);
}

.project-stage-shadow {
  position: absolute;
  left: 8%;
  right: 8%;
  bottom: -22px;
  height: 36px;
  border-radius: 50%;
  background: radial-gradient(
    ellipse at center,
    rgba(0, 0, 0, 0.5),
    rgba(0, 0, 0, 0.18) 45%,
    transparent 72%
  );
  filter: blur(10px);
  opacity: 0.5;
  transform: translate3d(calc(var(--shadow-x) * 0.35), 0, -28px) scale(0.9);
  transition: opacity 320ms ease, transform 320ms cubic-bezier(0.22, 1, 0.36, 1);
  pointer-events: none;
}

.project-card.is-tilting .project-stage-shadow {
  opacity: 0.9;
  transform: translate3d(calc(var(--shadow-x) * 0.55), 4px, -32px) scale(1.05);
}

.project-mockup {
  transform-style: preserve-3d;
  /* Rest pose: slight isometric product angle */
  transform: rotateY(-5deg) rotateX(3.5deg) translateZ(0);
  box-shadow:
    10px 18px 36px rgba(0, 0, 0, 0.3),
    -6px 12px 24px rgba(0, 0, 0, 0.18),
    0 1px 0 rgba(255, 255, 255, 0.07) inset;
  border: 1px solid color-mix(in srgb, var(--border) 65%, rgba(255, 255, 255, 0.2));
  transition: transform 380ms cubic-bezier(0.22, 1, 0.36, 1), box-shadow 380ms ease;
}

.project-card.is-tilting .project-mockup {
  /* Align mockup with card plane while lifting slightly */
  transform: rotateY(-1deg) rotateX(1deg) translateZ(16px) scale(1.025);
  box-shadow:
    calc(var(--shadow-x) * 0.4) calc(var(--shadow-y) * 0.7) 44px rgba(0, 0, 0, 0.38),
    -8px 14px 28px rgba(0, 0, 0, 0.2),
    0 1px 0 rgba(255, 255, 255, 0.1) inset;
  transition: transform 90ms cubic-bezier(0.2, 0.8, 0.2, 1), box-shadow 90ms ease;
}

/* Specular highlight tracks the pointer */
.project-mockup-glare {
  position: absolute;
  inset: 0;
  z-index: 3;
  pointer-events: none;
  border-radius: inherit;
  background:
    radial-gradient(
      420px circle at var(--glare-x, 30%) var(--glare-y, 20%),
      rgba(255, 255, 255, calc(var(--light-intensity, 0.4) * 0.55)),
      transparent 38%
    ),
    linear-gradient(
      125deg,
      transparent 28%,
      rgba(255, 255, 255, 0.08) 48%,
      transparent 62%
    );
  mix-blend-mode: soft-light;
  opacity: 0.7;
  transform: translateZ(3px);
  transition: opacity 220ms ease;
}

.project-card.is-tilting .project-mockup-glare {
  opacity: 1;
}

.project-info {
  transform: translateZ(22px);
  transform-style: preserve-3d;
}

.mockup-window {
  transform: translateZ(10px);
  box-shadow:
    0 22px 40px rgba(0, 0, 0, 0.38),
    0 1px 0 rgba(255, 255, 255, 0.1) inset;
}

@media (max-width: 900px) {
  .project-mockup,
  .project-card.is-tilting .project-mockup,
  .project-stage,
  .project-info {
    transform: none !important;
  }
}

@media (prefers-reduced-motion: reduce) {
  .project-card,
  .project-card.is-tilting,
  .project-mockup,
  .project-stage,
  .project-info {
    transform: none !important;
    transition: none !important;
  }
  .project-stage-shadow {
    display: none;
  }
  .project-mockup-glare,
  .project-card::before {
    display: none;
  }
}
'''


def main() -> None:
    home = HOME.read_text(encoding="utf-8")
    if "--glare-x" in home and "--shadow-x" in home and "--light-intensity" in home:
        print("Handlers already realistic")
    elif OLD_HANDLERS not in home:
        # Try partial match recovery
        if "const tiltX = (0.5 - py) * 14" in home:
            home = home.replace(OLD_HANDLERS, NEW_HANDLERS)
            if "--glare-x" not in home:
                raise SystemExit("Could not replace handlers")
            print("Handlers upgraded")
        else:
            raise SystemExit("pointer handlers not found")
    else:
        home = home.replace(OLD_HANDLERS, NEW_HANDLERS)
        print("Handlers upgraded to realistic lighting")

    HOME.write_text(home, encoding="utf-8")

    css = CSS.read_text(encoding="utf-8")
    marker = "/* —— realistic 3D physics + lighting —— */"
    if marker in css:
        print("CSS realistic block already present")
    else:
        CSS.write_text(css.rstrip() + CSS_REALISTIC, encoding="utf-8")
        print("Appended realistic 3D CSS")


if __name__ == "__main__":
    main()
