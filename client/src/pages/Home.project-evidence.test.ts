import { readFile } from "node:fs/promises";
import { describe, expect, it } from "vitest";

describe("NestNavi portfolio evidence", () => {
  it("describes the verified Firebase-backed listing release without restored sample claims", async () => {
    const source = await readFile(new URL("./Home.tsx", import.meta.url), "utf8");

    expect(source).toContain('link: "https://nestnavi-hostel-pg-finder.vercel.app"');
    expect(source).toContain('statusLabel: "live · Firestore-backed"');
    expect(source).toContain("public cards now load only from Firestore records marked as published");
    expect(source).toContain("honest empty state instead of invented properties");
    expect(source).toContain("Google-authenticated administrator workspace");
    expect(source).not.toContain("nestnavi-hostel-pg-finder-crocksy.vercel.app");
    expect(source).not.toContain("sample stay profiles");
  });
});

describe("WebClient Hunter portfolio evidence", () => {
  it("describes the verified evidence-first release without an unsupported AI or backend-production claim", async () => {
    const source = await readFile(new URL("./Home.tsx", import.meta.url), "utf8");

    expect(source).toContain('name: "WebClient Hunter"');
    expect(source).toContain("Evidence-first prospect research");
    expect(source).toContain("bounded OpenStreetMap discovery");
    expect(source).toContain("separate heuristic website checks");
    expect(source).toContain("separately hosted production route remains under verification");
    expect(source).not.toContain("AI prospect intelligence");
    expect(source).not.toContain("full CRM pipeline with AI-powered site audits");
  });
});

describe("cross-project release snapshot", () => {
  it("separates verified public releases from source-only and account-bound verification", async () => {
    const source = await readFile(new URL("./Home.tsx", import.meta.url), "utf8");

    expect(source).toContain("What is live, and what still needs a real-world check");
    expect(source).toContain("verified live");
    expect(source).toContain("source + frontend verified");
    expect(source).toContain("owner data / account test required");
    expect(source).toContain("separately hosted protected API still needs an authenticated production check");
    expect(source).toContain("genuine owner-authorised listing");
    expect(source).not.toContain("all projects are fully verified");
  });
});
