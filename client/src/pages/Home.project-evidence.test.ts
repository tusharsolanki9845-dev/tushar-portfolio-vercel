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

describe("CampusTrack portfolio evidence", () => {
  it("describes the verified Firebase release without inventing institutional data or email delivery outcomes", async () => {
    const source = await readFile(new URL("./Home.tsx", import.meta.url), "utf8");

    expect(source).toContain('link: "https://campustrack-iec.vercel.app"');
    expect(source).toContain('github: "https://github.com/tusharsolanki9845-dev/campustrack-iec"');
    expect(source).toContain('statusLabel: "live · Firebase-backed"');
    expect(source).toContain("Firebase Authentication and private-by-default Firestore rules");
    expect(source).toContain("Teacher-issued QR sessions");
    expect(source).toContain("owner-configured; no test delivery claim is made");
    expect(source).not.toContain("iecattend-ay6ur7my.manus.space");
    expect(source).not.toContain("automatic email delivery verified");
  });
});
