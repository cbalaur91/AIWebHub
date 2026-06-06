import satori from "satori";
import { Resvg } from "@resvg/resvg-js";
import { mkdir, writeFile, access } from "fs/promises";
import { join } from "path";
import { getAllPosts } from "../lib/blog-posts";
import { BlogImageTemplate } from "./blog-image-template";

const FONTS_DIR = join(import.meta.dir, "fonts");
const OUTPUT_DIR = join(import.meta.dir, "..", "public", "blog");

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
  console.log("Generating blog images...\n");

  const [interLight, interRegular] = await Promise.all([
    loadFont(INTER_LIGHT_URL, "Inter-Light.ttf"),
    loadFont(INTER_REGULAR_URL, "Inter-Regular.ttf"),
  ]);

  await mkdir(OUTPUT_DIR, { recursive: true });

  let generated = 0;
  let skipped = 0;

  for (const post of getAllPosts()) {
    const outputPath = join(OUTPUT_DIR, `${post.slug}.png`);

    try {
      await access(outputPath);
      skipped++;
      continue;
    } catch {
      // Image doesn't exist, will generate below
    }

    console.log(`Generating: ${post.slug}.png`);

    const svg = await satori(
      BlogImageTemplate({
        title: post.title,
        tags: post.tags,
        slug: post.slug,
      }) as React.ReactNode,
      {
        width: 1600,
        height: 900,
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
      fitTo: { mode: "width", value: 1600 },
    });
    const pngData = resvg.render();
    const pngBuffer = pngData.asPng();

    await writeFile(outputPath, pngBuffer);
    generated++;
  }

  console.log(
    `\nDone! Generated: ${generated}, Skipped (already exist): ${skipped}`
  );
}

main().catch((err) => {
  console.error("Failed to generate blog images:", err);
  process.exit(1);
});
