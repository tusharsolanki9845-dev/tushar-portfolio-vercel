import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const homeSource = readFileSync(new URL("./Home.tsx", import.meta.url), "utf8");

describe("Pizza Connect portfolio entry", () => {
  it("shows the verified live ordering PWA rather than a pending launch", () => {
    expect(homeSource).toContain('name: "Pizza Connect"');
    expect(homeSource).toContain('status: "live"');
    expect(homeSource).toContain('statusLabel: "live"');
    expect(homeSource).toContain('link: "https://pizza-connect-pwa-crocksy.vercel.app"');
    expect(homeSource).toContain('linkLabel: "view live site"');
    expect(homeSource).toContain('COD and UPI options');
    expect(homeSource).toContain('offline support');
    expect(homeSource).not.toContain('linkLabel: "launching soon"');
  });
});
