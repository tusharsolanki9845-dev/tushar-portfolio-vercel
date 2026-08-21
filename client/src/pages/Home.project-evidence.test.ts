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
