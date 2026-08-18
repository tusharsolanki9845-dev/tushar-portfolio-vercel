import { describe, expect, it } from "vitest";
import { buildContactEmailUrl } from "./contact";

describe("buildContactEmailUrl", () => {
  it("creates an email draft without adding form data to an analytics URL", () => {
    const url = buildContactEmailUrl({
      name: "Asha Sharma",
      email: "asha@example.com",
      topic: "freelance",
      message: "I would like to discuss a small e-commerce project.",
    });

    expect(url).toMatch(/^mailto:tusharsolanki9845@gmail\.com\?/);
    const params = new URL(url).searchParams;
    expect(params.get("subject")).toBe("Freelance project — portfolio contact");
    expect(params.get("body")).toContain("Asha Sharma");
  });
});
