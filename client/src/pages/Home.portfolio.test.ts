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
    expect(homeSource).toContain('const featuredProjectOrder = ["WebClient Hunter", "IRONCLASP", "Pizza Connect", "Tehsil Sahayak"]');
    expect(homeSource).toContain('portfolioProjects.map((project)');
    expect(homeSource).toContain('Integration experience');
    expect(homeSource).toContain('OpenStreetMap');
    expect(homeSource).toContain('Nominatim');
    expect(homeSource).toContain('project-link project-link-primary');
    expect(homeSource).not.toContain('95+ Lighthouse');
    expect(homeSource).not.toContain('MAANG-level Portfolio');
    expect(cssSource).toContain('.project-link-primary');
  });
});
