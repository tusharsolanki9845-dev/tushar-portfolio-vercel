import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const homeSource = readFileSync(new URL("./Home.tsx", import.meta.url), "utf8");
const cssSource = readFileSync(new URL("../index.css", import.meta.url), "utf8");

describe("Pizza Connect portfolio entry", () => {
  it("shows the verified live ordering PWA rather than a pending launch", () => {
    expect(homeSource).toContain('name: "Pizza Connect"');
    expect(homeSource).toContain('status: "live"');
    expect(homeSource).toContain('statusLabel: "live"');
    expect(homeSource).toContain('link: "https://pizza-connect-pwa-crocksy.vercel.app"');
    expect(homeSource).toContain('linkLabel: "view live site"');
    expect(homeSource).toContain('COD and UPI options');
    expect(homeSource).toContain('offline support');
    expect(homeSource).toContain('Project results');
    expect(homeSource).toContain('Offline-ready storefront');
    expect(homeSource).toContain('Clear WhatsApp handoff');
    expect(homeSource).toContain('Flexible payment intent');
    expect(cssSource).toContain('@media (hover: hover)');
    expect(cssSource).toContain('@media (prefers-reduced-motion: reduce)');
    expect(homeSource).toContain('portfolio-theme');
    expect(homeSource).toContain('Switch to ${theme === "dark" ? "light" : "dark"} mode');
    expect(homeSource).toContain('aria-pressed={theme === "light"}');
    expect(cssSource).toContain(':root[data-theme="light"]');
    expect(cssSource).toContain('.theme-toggle');
    expect(homeSource).not.toContain('linkLabel: "launching soon"');
  });
});

describe("recruiter-facing portfolio evidence", () => {
  it("puts verified original work and live demos ahead of unsupported score or API claims", () => {
    expect(homeSource).toContain('const featuredProjectOrder = ["WebClient Hunter", "Aeris", "IEC College Campus Track", "Campus Signal by IEC", "IRONCLASP", "Pizza Connect", "Tehsil Sahayak"]');
    expect(homeSource).not.toContain('name: "CampusTrack"');
    expect(homeSource).toContain('portfolioProjects.map((project)');
    expect(homeSource).toContain('Integration experience');
    expect(homeSource).toContain('OpenStreetMap');
    expect(homeSource).toContain('Nominatim');
    expect(homeSource).toContain('project-link project-link-primary');
    expect(homeSource).not.toContain('95+ Lighthouse');
    expect(homeSource).not.toContain('MAANG-level Portfolio');
    expect(cssSource).toContain('.project-link-primary');
  });

  it("keeps verified summary counters and the Campus Signal live entry accurate", () => {
    expect(homeSource).toContain('{ count: 12, label: "projects built" }');
    expect(homeSource).toContain('{ count: 5, label: "Forage simulations" }');
    expect(homeSource).toContain('{ count: 2, label: "client builds shipped" }');
    expect(homeSource).toContain('{ count: 2029, label: "graduation year" }');
    expect(homeSource).toContain('12 projects built, from solo builds to client-facing e-commerce stores');
    expect(homeSource).toContain('name: "IEC College Campus Track"');
    expect(homeSource).toContain('statusLabel: "live · verified public information"');
    expect(homeSource).toContain('link: "https://campustrack-iec.vercel.app"');
    expect(homeSource).toContain('linkLabel: "view live website"');
    expect(homeSource).toContain('href={`/projects/${project.slug}`}');
    expect(homeSource).toContain('releaseDate: "Aug 2026"');
    expect(homeSource).toContain('statusLabel: "live · access-gated Firebase"');
    expect(homeSource).toContain('name: "Aeris"');
    expect(homeSource).toContain('link: "https://weathernow-zmvf3inw.manus.space"');
    expect(homeSource).toContain('statusLabel: "live · Open-Meteo"');
    expect(homeSource).toContain('link: "https://campus-signal-iec.vercel.app"');
    expect(homeSource).toContain('Campus Signal requires a student account before entry');
  });

  it("keeps analytics outside the critical rendering path", () => {
    expect(homeSource).toContain('lazy(() => import("@vercel/analytics/react")');
    expect(homeSource).toContain('<Suspense fallback={null}><Analytics /></Suspense>');
  });
});
