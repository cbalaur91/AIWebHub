import { describe, expect, test } from "bun:test";
import { abs, OG_IMAGE, ORG, SITE_URL } from "@/lib/site";

describe("abs()", () => {
  test("root path", () => {
    expect(abs("/")).toBe(`${SITE_URL}/`);
  });

  test("nested path", () => {
    expect(abs("/blog/how-much-does-a-custom-website-cost-in-2026")).toBe(
      `${SITE_URL}/blog/how-much-does-a-custom-website-cost-in-2026`,
    );
  });

  test("leading-slash handling: with and without are equivalent", () => {
    expect(abs("services")).toBe(`${SITE_URL}/services`);
    expect(abs("services")).toBe(abs("/services"));
  });

  test("never doubles the leading slash", () => {
    expect(abs("/about")).toBe("https://www.aiwebhub.io/about");
    expect(abs("/about").startsWith(`${SITE_URL}//`)).toBe(false);
  });
});

describe("site identity constants", () => {
  test("OG_IMAGE is the absolute share image", () => {
    expect(OG_IMAGE).toBe("https://www.aiwebhub.io/thumbnails/logo-thumbnail.png");
  });

  test("ORG bag exposes name, logo, founder, author URL, and social profiles", () => {
    expect(ORG.name).toBe("AIWebHub");
    expect(ORG.url).toBe(SITE_URL);
    expect(ORG.logo).toBe("https://www.aiwebhub.io/logo/logo.png");
    expect(ORG.founder).toBe("Cosmin Balaur");
    expect(ORG.authorUrl).toContain("linkedin.com");
    expect(ORG.sameAs.length).toBeGreaterThan(0);
  });
});
