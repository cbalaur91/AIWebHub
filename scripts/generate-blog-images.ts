// Renders every route's social share card to a 1600×900 PNG, at build time.
//
// Three sources feed one renderer, so every card on the site comes out of the
// same template and reads as one system:
//
//   • blog posts     → public/blog/{slug}.png   (from lib/blog-posts.ts)
//   • static routes  → public/og/{route}.png    (from lib/og-images.ts)
//   • case studies   → public/og/portfolio-{slug}.png (from lib/portfolio-data.ts)
//
// Existing files are skipped, so committed cards are never rewritten — delete a
// PNG to re-render it after changing its copy.

import satori from "satori";
import { Resvg } from "@resvg/resvg-js";
import { mkdir, writeFile, access } from "fs/promises";
import { dirname, join, relative } from "path";
import { getAllPosts } from "../lib/blog-posts";
import {
  OG_CARDS,
  OG_CARD_HEIGHT,
  OG_CARD_MAX_BYTES,
  OG_CARD_WIDTH,
  ogCardPath,
} from "../lib/og-images";
import { getAllCategories, getAllProjects } from "../lib/portfolio-data";
import { BlogImageTemplate } from "./blog-image-template";

const FONTS_DIR = join(import.meta.dir, "fonts");
const PUBLIC_DIR = join(import.meta.dir, "..", "public");
const OUTPUT_DIR = join(PUBLIC_DIR, "blog");

/** One card to render. `seed` drives the template's blob placement and hue. */
type CardJob = {
  /** Absolute path of the PNG to write. */
  outputPath: string;
  title: string;
  tags: string[];
  seed: string;
};

/** Resolve a site-relative card path (`/og/about.png`) to a file path. */
function publicPath(sitePath: string): string {
  return join(PUBLIC_DIR, sitePath.replace(/^\//, ""));
}

/**
 * Every card the site needs, in render order. Blog jobs are listed first and
 * built exactly as before — same template, same slug seed — so the eight
 * committed blog PNGs stay byte-for-byte what they are today.
 */
function collectJobs(): CardJob[] {
  const categoryLabels = new Map(
    getAllCategories().map((category) => [category.value, category.label]),
  );

  const blog: CardJob[] = getAllPosts().map((post) => ({
    outputPath: join(OUTPUT_DIR, `${post.slug}.png`),
    title: post.title,
    tags: post.tags,
    seed: post.slug,
  }));

  const routes: CardJob[] = OG_CARDS.map((card) => ({
    outputPath: publicPath(ogCardPath(card.route)),
    title: card.title,
    tags: card.tags,
    seed: card.route,
  }));

  const caseStudies: CardJob[] = getAllProjects().map((project) => ({
    outputPath: publicPath(ogCardPath(`/portfolio/${project.slug}`)),
    title: project.title,
    tags: ["Case Study", categoryLabels.get(project.category) ?? project.category],
    seed: project.slug,
  }));

  return [...blog, ...routes, ...caseStudies];
}

const INTER_LIGHT_URL =
  "https://fonts.gstatic.com/s/inter/v20/UcCO3FwrK3iLTeHuS_nVMrMxCp50SjIw2boKoduKmMEVuOKfMZg.ttf";
const INTER_REGULAR_URL =
  "https://fonts.gstatic.com/s/inter/v20/UcCO3FwrK3iLTeHuS_nVMrMxCp50SjIw2boKoduKmMEVuLyfMZg.ttf";

async function loadFont(url: string, filename: string): Promise<ArrayBuffer> {
  const fontPath = join(FONTS_DIR, filename);

  try {
    await access(fontPath);
    const file = Bun.file(fontPath);
    return file.arrayBuffer();
  } catch {
    // Font not cached, will download below
  }

  console.log(`Downloading font: ${filename}...`);
  await mkdir(FONTS_DIR, { recursive: true });
  const response = await fetch(url);
  const buffer = await response.arrayBuffer();
  await writeFile(fontPath, Buffer.from(buffer));
  return buffer;
}

async function main() {
  console.log("Generating share cards...\n");

  const [interLight, interRegular] = await Promise.all([
    loadFont(INTER_LIGHT_URL, "Inter-Light.ttf"),
    loadFont(INTER_REGULAR_URL, "Inter-Regular.ttf"),
  ]);

  const jobs = collectJobs();
  for (const dir of new Set(jobs.map((job) => dirname(job.outputPath)))) {
    await mkdir(dir, { recursive: true });
  }

  let generated = 0;
  let skipped = 0;

  for (const job of jobs) {
    try {
      await access(job.outputPath);
      skipped++;
      continue;
    } catch {
      // Image doesn't exist, will generate below
    }

    console.log(`Generating: ${relative(PUBLIC_DIR, job.outputPath)}`);

    const svg = await satori(
      BlogImageTemplate({
        title: job.title,
        tags: job.tags,
        slug: job.seed,
      }) as React.ReactNode,
      {
        width: OG_CARD_WIDTH,
        height: OG_CARD_HEIGHT,
        fonts: [
          {
            name: "Inter",
            data: interLight,
            weight: 300,
            style: "normal",
          },
          {
            name: "Inter",
            data: interRegular,
            weight: 400,
            style: "normal",
          },
        ],
      }
    );

    const resvg = new Resvg(svg, {
      fitTo: { mode: "width", value: OG_CARD_WIDTH },
    });
    const pngData = resvg.render();
    const pngBuffer = pngData.asPng();

    // The asset budget from issue #11 is enforced here rather than left to
    // review: a card that blows it fails the build instead of shipping.
    if (pngBuffer.byteLength > OG_CARD_MAX_BYTES) {
      throw new Error(
        `${relative(PUBLIC_DIR, job.outputPath)} is ${Math.round(
          pngBuffer.byteLength / 1024
        )} KB, over the ${OG_CARD_MAX_BYTES / 1024} KB card budget`
      );
    }

    await writeFile(job.outputPath, pngBuffer);
    generated++;
  }

  console.log(
    `\nDone! Generated: ${generated}, Skipped (already exist): ${skipped}`
  );
}

main().catch((err) => {
  console.error("Failed to generate share cards:", err);
  process.exit(1);
});
