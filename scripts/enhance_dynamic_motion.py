#!/usr/bin/env python3
"""Make the portfolio feel more dynamic: count-up stats, orbit spin, stronger reveals."""
from __future__ import annotations

from pathlib import Path

HOME = Path("client/src/pages/Home.tsx")
CSS = Path("client/src/index.css")

OLD_STAT = '''function AnimatedStat({ count, label }: { count: number; label: string }) {
  return (
    <div className="stat">
      <div className="stat-number">{count}{count < 2029 ? "+" : ""}</div>
      <div className="stat-label">{label}</div>
    </div>
  );
}'''

NEW_STAT = '''function AnimatedStat({ count, label }: { count: number; label: string }) {
  const [display, setDisplay] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useState<HTMLDivElement | null>(null)[0];
  const nodeRef = (useState(() => ({ current: null as HTMLDivElement | null }))[0]);

  useEffect(() => {
    const node = nodeRef.current;
    if (!node) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setDisplay(count);
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.4 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [count, nodeRef]);

  useEffect(() => {
    if (!started) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setDisplay(count);
      return;
    }
    const duration = 1100;
    const start = performance.now();
    let frame = 0;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setDisplay(Math.round(count * eased));
      if (t < 1) frame = window.requestAnimationFrame(tick);
    };
    frame = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(frame);
  }, [started, count]);

  return (
    <div className="stat" ref={(node) => { nodeRef.current = node; }}>
      <div className="stat-number">{display}{count < 2029 ? "+" : ""}</div>
      <div className="stat-label">{label}</div>
    </div>
  );
}'''

# Cleaner AnimatedStat without the unused ref state mistake
NEW_STAT = '''function AnimatedStat({ count, label }: { count: number; label: string }) {
  const [display, setDisplay] = useState(0);
  const [started, setStarted] = useState(false);
  const nodeRef = useState(() => ({ current: null as HTMLDivElement | null }))[0];

  useEffect(() => {
    const node = nodeRef.current;
    if (!node) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setDisplay(count);
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.35 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [count, nodeRef]);

  useEffect(() => {
    if (!started) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setDisplay(count);
      return;
    }
    const duration = 1200;
    const start = performance.now();
    let frame = 0;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setDisplay(Math.round(count * eased));
      if (t < 1) frame = window.requestAnimationFrame(tick);
    };
    frame = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(frame);
  }, [started, count]);

  return (
    <div className="stat" ref={(node) => { nodeRef.current = node; }}>
      <div className="stat-number">{display}{count < 2029 ? "+" : ""}</div>
      <div className="stat-label">{label}</div>
    </div>
  );
}'''

CSS_APPEND = '''

/* —— Dynamic motion enhancements —— */
@keyframes ambient-shift {
  0%, 100% { transform: translate3d(0, 0, 0) scale(1); opacity: 0.55; }
  50% { transform: translate3d(2%, -1.5%, 0) scale(1.04); opacity: 0.75; }
}

@keyframes orbit-spin {
  from { rotate: 0deg; }
  to { rotate: 360deg; }
}

@keyframes particle-drift {
  0%, 100% { transform: translate3d(0, 0, 0) scale(1); opacity: 0.55; }
  50% { transform: translate3d(6px, -10px, 0) scale(1.35); opacity: 1; }
}

@keyframes float-soft {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-6px); }
}

body::before {
  animation: ambient-shift 18s ease-in-out infinite;
}

.hero-field-orbit-one {
  animation: orbit-spin 28s linear infinite;
  transform-origin: center;
}

.hero-field-orbit-two {
  animation: orbit-spin 42s linear infinite reverse;
  transform-origin: center;
}

.hero-field-particles span:nth-child(1) { animation: particle-drift 4.2s ease-in-out infinite; }
.hero-field-particles span:nth-child(2) { animation: particle-drift 5.1s ease-in-out infinite 0.4s; }
.hero-field-particles span:nth-child(3) { animation: particle-drift 3.8s ease-in-out infinite 0.8s; }
.hero-field-particles span:nth-child(4) { animation: particle-drift 4.8s ease-in-out infinite 1.1s; }
.hero-field-particles span:nth-child(5) { animation: particle-drift 5.4s ease-in-out infinite 0.2s; }
.hero-field-particles span:nth-child(6) { animation: particle-drift 4.5s ease-in-out infinite 0.6s; }

.reveal {
  opacity: 0;
  transform: translateY(28px);
  transition: opacity 700ms cubic-bezier(0.22, 1, 0.36, 1), transform 700ms cubic-bezier(0.22, 1, 0.36, 1);
}

.reveal.is-visible {
  opacity: 1;
  transform: translateY(0);
}

.stats-grid .stat {
  transition: transform 280ms cubic-bezier(0.22, 1, 0.36, 1), border-color 220ms ease;
}

.stats-grid .stat:hover {
  transform: translateY(-4px);
}

.stat-number {
  font-variant-numeric: tabular-nums;
  transition: color 220ms ease;
}

.process-steps > *,
.skill-grid > *,
.fit-panel > *,
.pricing-bands > *,
.project-grid > * {
  opacity: 0;
  transform: translateY(18px);
  transition: opacity 560ms cubic-bezier(0.22, 1, 0.36, 1), transform 560ms cubic-bezier(0.22, 1, 0.36, 1);
}

.reveal.is-visible .process-steps > *,
.reveal.is-visible .skill-grid > *,
.reveal.is-visible .fit-panel > *,
.reveal.is-visible .pricing-bands > *,
.reveal.is-visible .project-grid > *,
.section.reveal.is-visible .process-steps > *,
.section.reveal.is-visible .skill-grid > *,
.section.reveal.is-visible .project-grid > * {
  opacity: 1;
  transform: translateY(0);
}

.reveal.is-visible .process-steps > *:nth-child(1),
.reveal.is-visible .skill-grid > *:nth-child(1),
.reveal.is-visible .project-grid > *:nth-child(1) { transition-delay: 40ms; }
.reveal.is-visible .process-steps > *:nth-child(2),
.reveal.is-visible .skill-grid > *:nth-child(2),
.reveal.is-visible .project-grid > *:nth-child(2) { transition-delay: 100ms; }
.reveal.is-visible .process-steps > *:nth-child(3),
.reveal.is-visible .skill-grid > *:nth-child(3),
.reveal.is-visible .project-grid > *:nth-child(3) { transition-delay: 160ms; }
.reveal.is-visible .process-steps > *:nth-child(4),
.reveal.is-visible .skill-grid > *:nth-child(4),
.reveal.is-visible .project-grid > *:nth-child(4) { transition-delay: 220ms; }
.reveal.is-visible .skill-grid > *:nth-child(5),
.reveal.is-visible .project-grid > *:nth-child(5) { transition-delay: 280ms; }
.reveal.is-visible .project-grid > *:nth-child(6) { transition-delay: 340ms; }
.reveal.is-visible .project-grid > *:nth-child(7) { transition-delay: 400ms; }
.reveal.is-visible .project-grid > *:nth-child(8) { transition-delay: 460ms; }

.btn {
  position: relative;
  overflow: hidden;
}

.btn::after {
  content: "";
  position: absolute;
  inset: 0;
  background: linear-gradient(120deg, transparent 20%, rgba(255, 255, 255, 0.12) 45%, transparent 70%);
  transform: translateX(-120%);
  transition: transform 520ms cubic-bezier(0.22, 1, 0.36, 1);
  pointer-events: none;
}

.btn:hover::after {
  transform: translateX(120%);
}

.site-nav {
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
}

@media (prefers-reduced-motion: reduce) {
  body::before,
  .hero-field-orbit-one,
  .hero-field-orbit-two,
  .hero-field-particles span {
    animation: none !important;
  }

  .process-steps > *,
  .skill-grid > *,
  .fit-panel > *,
  .pricing-bands > *,
  .project-grid > * {
    opacity: 1 !important;
    transform: none !important;
    transition: none !important;
  }
}
'''


def main() -> None:
    home = HOME.read_text(encoding="utf-8")
    if OLD_STAT not in home:
        if "const duration = 1200" in home or "performance.now()" in home and "AnimatedStat" in home:
            print("AnimatedStat already enhanced")
        else:
            raise SystemExit("AnimatedStat block not found")
    else:
        home = home.replace(OLD_STAT, NEW_STAT)
        HOME.write_text(home, encoding="utf-8")
        print("Updated AnimatedStat count-up")

    css = CSS.read_text(encoding="utf-8")
    if "Dynamic motion enhancements" in css:
        print("CSS motion block already present")
    else:
        CSS.write_text(css.rstrip() + CSS_APPEND, encoding="utf-8")
        print("Appended dynamic motion CSS")


if __name__ == "__main__":
    main()
