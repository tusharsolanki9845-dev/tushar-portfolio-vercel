import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const workerSource = readFileSync(new URL("../public/sw.js", import.meta.url), "utf8");

describe("portfolio PWA cache policy", () => {
  it("uses a network-first strategy so returning visitors receive current deployments", () => {
    expect(workerSource).toContain('const CACHE_NAME = "tushar-portfolio-pwa-v2"');
    expect(workerSource).toMatch(/fetch\(event\.request\)\s*\.then\(\(response\) =>/);
    expect(workerSource).toContain('caches.match(event.request).then((cached) => cached || caches.match("/"))');
    expect(workerSource).not.toContain("caches.match(event.request).then((cached) => cached || fetch(event.request)");
  });
});
