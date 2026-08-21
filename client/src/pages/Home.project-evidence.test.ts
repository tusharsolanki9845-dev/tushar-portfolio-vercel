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
