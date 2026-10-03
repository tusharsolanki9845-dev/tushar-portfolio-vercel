#!/usr/bin/env python3
"""Make project cards look like dimensional 3D product tiles."""
from __future__ import annotations

from pathlib import Path

HOME = Path("client/src/pages/Home.tsx")
CSS = Path("client/src/index.css")

OLD_MOCKUP_WITH_IMG = '''function ProjectMockup({ theme, name, previewImage }: { theme: Project["theme"]; name: string; previewImage?: string }) {
  if (previewImage) {
    return (
      <div className={`project-mockup project-preview ${theme}`} role="img" aria-label={`${name} live project preview`}>
        <img src={previewImage} alt={`${name} live website preview`} loading="lazy" />
        <span className="project-preview-label">live interface</span>
      </div>
    );
  }

  return (
    <div className={`project-mockup ${theme}`} role="img" aria-label={`${name} project preview`}>
      <div className="mockup-window">
        <div className="mockup-top"><span /><span /><span /></div>
        <div className="mockup-content">
          <div className="mockup-kicker">{name} / build-preview</div>
          <div className="mockup-heading">A working product, not a mockup.</div>
          <div className="mockup-lines"><i /><i /><i /></div>
        </div>
      </div>
    </div>
  );
}'''

NEW_MOCKUP = '''function ProjectMockup({ theme, name, previewImage }: { theme: Project["theme"]; name: string; previewImage?: string }) {
  if (previewImage) {
    return (
      <div className="project-stage" aria-hidden="false">
        <div className="project-stage-shadow" aria-hidden="true" />
        <div className={`project-mockup project-preview ${theme}`} role="img" aria-label={`${name} live project preview`}>
          <div className="project-mockup-glare" aria-hidden="true" />
          <img src={previewImage} alt={`${name} live website preview`} loading="lazy" />
          <span className="project-preview-label">live interface</span>
        </div>
      </div>
    );
  }

  return (
    <div className="project-stage" aria-hidden="false">
      <div className="project-stage-shadow" aria-hidden="true" />
      <div className={`project-mockup ${theme}`} role="img" aria-label={`${name} project preview`}>
        <div className="project-mockup-glare" aria-hidden="true" />
        <div className="mockup-window">
          <div className="mockup-top"><span /><span /><span /></div>
          <div className="mockup-content">
            <div className="mockup-kicker">{name} / build-preview</div>
            <div className="mockup-heading">A working product, not a mockup.</div>
            <div className="mockup-lines"><i /><i /><i /></div>
          </div>
        </div>
      </div>
    </div>
  );
}'''

# Stronger tilt magnitudes if handlers exist
OLD_TILT_MATH = """                    const tiltX = (0.5 - py) * 10;
                    const tiltY = (px - 0.5) * 12;"""
NEW_TILT_MATH = """                    const tiltX = (0.5 - py) * 14;
                    const tiltY = (px - 0.5) * 16;"""

CSS_BLOCK = '''

/* —— 3D project stage look —— */
.project-list {
  perspective: 1400px;
}

.project-card {
  --tilt-x: 0deg;
  --tilt-y: 0deg;
  --tilt-scale: 1;
  overflow: visible;
  transform-style: preserve-3d;
  transform: perspective(1000px) rotateX(var(--tilt-x)) rotateY(var(--tilt-y)) scale(var(--tilt-scale));
  transition: transform 200ms cubic-bezier(0.23, 1, 0.32, 1), border-color 240ms ease, background 240ms ease, box-shadow 240ms ease;
}

.project-card.is-tilting {
  transition: transform 50ms linear, border-color 200ms ease, box-shadow 200ms ease;
  z-index: 2;
}

.project-stage {
  position: relative;
  min-height: 280px;
  transform-style: preserve-3d;
  transform: translateZ(28px);
}

.project-stage-shadow {
  position: absolute;
  left: 10%;
  right: 10%;
  bottom: -18px;
  height: 28px;
  border-radius: 50%;
  background: radial-gradient(ellipse at center, rgba(0, 0, 0, 0.45), transparent 70%);
  filter: blur(8px);
  opacity: 0.55;
  transform: translateZ(-20px) scale(0.92);
  transition: opacity 220ms ease, transform 220ms ease;
  pointer-events: none;
}

.project-card.is-tilting .project-stage-shadow,
.project-card:hover .project-stage-shadow {
  opacity: 0.85;
  transform: translateZ(-24px) scale(1.02);
}

.project-mockup {
  transform-style: preserve-3d;
  transform: rotateY(-6deg) rotateX(4deg);
  box-shadow:
    0 18px 40px rgba(0, 0, 0, 0.28),
    0 2px 0 rgba(255, 255, 255, 0.06) inset,
    -12px 16px 32px rgba(0, 0, 0, 0.22);
  border: 1px solid color-mix(in srgb, var(--border) 70%, rgba(255, 255, 255, 0.18));
  transition: transform 280ms cubic-bezier(0.23, 1, 0.32, 1), box-shadow 280ms ease;
}

.project-card.is-tilting .project-mockup,
.project-card:hover .project-mockup {
  transform: rotateY(-2deg) rotateX(2deg) translateZ(12px) scale(1.02);
  box-shadow:
    0 28px 56px rgba(0, 0, 0, 0.36),
    0 2px 0 rgba(255, 255, 255, 0.08) inset,
    -16px 22px 40px rgba(0, 0, 0, 0.28);
}

.project-mockup-glare {
  position: absolute;
  inset: 0;
  z-index: 3;
  pointer-events: none;
  background: linear-gradient(
    115deg,
    transparent 20%,
    rgba(255, 255, 255, 0.14) 42%,
    transparent 58%
  );
  mix-blend-mode: soft-light;
  opacity: 0.55;
  transform: translateZ(2px);
}

.project-info {
  transform: translateZ(18px);
  transform-style: preserve-3d;
}

.mockup-window {
  transform: translateZ(8px);
  box-shadow: 0 20px 36px rgba(0, 0, 0, 0.35), 0 1px 0 rgba(255, 255, 255, 0.08) inset;
}

@media (max-width: 900px) {
  .project-mockup {
    transform: none;
  }
  .project-card.is-tilting .project-mockup,
  .project-card:hover .project-mockup {
    transform: none;
  }
  .project-stage {
    transform: none;
  }
  .project-info {
    transform: none;
  }
}

@media (prefers-reduced-motion: reduce) {
  .project-card,
  .project-card.is-tilting,
  .project-mockup,
  .project-stage,
  .project-info {
    transform: none !important;
  }
  .project-stage-shadow {
    display: none;
  }
}
'''


def main() -> None:
    home = HOME.read_text(encoding="utf-8")
    if "project-stage" in home:
        print("Home already has project-stage")
    elif OLD_MOCKUP_WITH_IMG not in home:
        raise SystemExit("ProjectMockup block not found — check whitespace")
    else:
        home = home.replace(OLD_MOCKUP_WITH_IMG, NEW_MOCKUP)
        print("ProjectMockup upgraded to 3D stage")

    if OLD_TILT_MATH in home:
        home = home.replace(OLD_TILT_MATH, NEW_TILT_MATH)
        print("Tilt angle increased")

    HOME.write_text(home, encoding="utf-8")

    css = CSS.read_text(encoding="utf-8")
    if "3D project stage look" in css:
        print("CSS 3D block already present")
    else:
        CSS.write_text(css.rstrip() + CSS_BLOCK, encoding="utf-8")
        print("Appended 3D project stage CSS")


if __name__ == "__main__":
    main()
