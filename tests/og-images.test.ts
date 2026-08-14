import { describe, expect, test } from "bun:test";
import { existsSync, readFileSync, statSync } from "fs";
import { join } from "path";
import { getAllPosts } from "@/lib/blog-posts";
import { getAllProjects } from "@/lib/portfolio-data";
import {
  OG_CARDS,
  OG_CARD_HEIGHT,
  OG_CARD_MAX_BYTES,
  OG_CARD_WIDTH,
  ogCardFor,
  ogCardPath,
} from "@/lib/og-images";
import { ogCardImages, SITE_URL } from "@/lib/site";

const PUBLIC_DIR = join(import.meta.dir, "..", "public");

/**
 * A route advertising an `og:image` that 404s is worse than no card at all, and
 * it is invisible in source — the URL is built by convention, the file by a
 * prebuild script. These assertions are what tie the two together, so a route
 * added to `OG_CARDS` (or a project added to `portfolio-data`) without a
 * rendered card fails here rather than on a share.
 */
function readCard(sitePath: string): { width: number; height: number; bytes: number } {
  const filePath = join(PUBLIC_DIR, sitePath.replace(/^\//, ""));
  expect(existsSync(filePath)).toBe(true);

  // PNG IHDR: width and height are big-endian uint32s at byte 16 and 20.
  const header = readFileSync(filePath);
  return {
    width: header.readUInt32BE(16),
    height: header.readUInt32BE(20),
    bytes: statSync(filePath).size,
  };
}

/** A generated card: exactly 1600×900, inside the asset budget. */
function expectValidCard(sitePath: string) {
  const card = readCard(sitePath);
  expect(card.width).toBe(OG_CARD_WIDTH);
  expect(card.height).toBe(OG_CARD_HEIGHT);
  expect(card.bytes).toBeLessThan(OG_CARD_MAX_BYTES);
}

/**
 * A blog post's share image doubles as the article's hero, so it is authored
 * per post rather than generated — one post ships a 2100×900 infographic. Only
 * the properties a share card actually depends on are asserted: it exists, it
 * is landscape enough not to be cropped to nothing, and it is inside budget.
 */
function expectValidShareImage(sitePath: string) {
  const card = readCard(sitePath);
  expect(card.width / card.height).toBeGreaterThanOrEqual(1.5);
  expect(card.bytes).toBeLessThan(OG_CARD_MAX_BYTES);
}

describe("ogCardPath()", () => {
  test("the site root maps to home.png", () => {
    expect(ogCardPath("/")).toBe("/og/home.png");
  });

  test("a top-level route keeps its slug", () => {
    expect(ogCardPath("/about")).toBe("/og/about.png");
  });

  test("nested routes flatten to a single filename", () => {
    expect(ogCardPath("/tools/website-cost-calculator")).toBe(
      "/og/tools-website-cost-calculator.png",
    );
    expect(ogCardPath("/portfolio/salinair")).toBe("/og/portfolio-salinair.png");
  });

  test("a trailing slash does not change the card", () => {
    expect(ogCardPath("/about/")).toBe(ogCardPath("/about"));
  });
});

describe("OG_CARDS table", () => {
  test("every route appears once", () => {
    const routes = OG_CARDS.map((card) => card.route);
    expect(new Set(routes).size).toBe(routes.length);
  });

  test("every card resolves to a distinct image", () => {
    const paths = OG_CARDS.map((card) => ogCardPath(card.route));
    expect(new Set(paths).size).toBe(paths.length);
  });

  test("every card carries a title, tags and alt text", () => {
    for (const card of OG_CARDS) {
      expect(card.title.length).toBeGreaterThan(0);
      expect(card.tags.length).toBeGreaterThan(0);
      expect(card.alt.length).toBeGreaterThan(0);
    }
  });

  test("the money pages and legal pages are all covered", () => {
    for (const route of [
      "/",
      "/about",
      "/services",
      "/ai-consulting",
      "/web-design-detroit",
      "/portfolio",
      "/blog",
      "/contact",
      "/tools/website-cost-calculator",
      "/privacy-policy",
      "/terms-of-service",
    ]) {
      expect(ogCardFor(route)).toBeDefined();
    }
  });
});

describe("generated cards exist at the advertised size", () => {
  test.each(OG_CARDS.map((card) => card.route))("%s", (route) => {
    expectValidCard(ogCardPath(route));
  });

  test.each(getAllProjects().map((project) => project.slug))(
    "/portfolio/%s",
    (slug) => {
      expectValidCard(ogCardPath(`/portfolio/${slug}`));
    },
  );

  test.each(getAllPosts().map((post) => post.slug))("/blog/%s", (slug) => {
    const post = getAllPosts().find((p) => p.slug === slug)!;
    expectValidShareImage(post.image);
  });
});

describe("ogCardImages()", () => {
  test("emits one absolute-URL image with its intrinsic size", () => {
    const images = ogCardImages("/about") as { url: string }[];
    expect(images).toHaveLength(1);
    expect(images[0]).toEqual({
      url: `${SITE_URL}/og/about.png`,
      width: OG_CARD_WIDTH,
      height: OG_CARD_HEIGHT,
      alt: ogCardFor("/about")!.alt,
    });
  });

  test("an explicit alt wins, for routes with no table entry", () => {
    const images = ogCardImages("/portfolio/salinair", "Salinair case study") as {
      url: string;
      alt: string;
    }[];
    expect(images[0].url).toBe(`${SITE_URL}/og/portfolio-salinair.png`);
    expect(images[0].alt).toBe("Salinair case study");
  });
});
