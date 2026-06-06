import satori from "satori";
import { Resvg } from "@resvg/resvg-js";
import { mkdir, writeFile, access } from "fs/promises";
import { join } from "path";
import { PatternsInfographic } from "./infographic-template";

const FONTS_DIR = join(import.meta.dir, "fonts");
const OUTPUT_DIR = join(import.meta.dir, "..", "public", "blog");
const SLUG = "agentic-workflow-patterns-how-ai-agents-work-in-2026";

const WIDTH = 2100;
const HEIGHT = 900;

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
  console.log("Generating patterns infographic...\n");

  const [interLight, interRegular] = await Promise.all([
    loadFont(INTER_LIGHT_URL, "Inter-Light.ttf"),
    loadFont(INTER_REGULAR_URL, "Inter-Regular.ttf"),
  ]);

  await mkdir(OUTPUT_DIR, { recursive: true });

  const svg = await satori(PatternsInfographic() as React.ReactNode, {
    width: WIDTH,
    height: HEIGHT,
    fonts: [
      { name: "Inter", data: interLight, weight: 300, style: "normal" },
      { name: "Inter", data: interRegular, weight: 400, style: "normal" },
    ],
  });

  const resvg = new Resvg(svg, { fitTo: { mode: "width", value: WIDTH } });
  const pngBuffer = resvg.render().asPng();

  const outputPath = join(OUTPUT_DIR, `${SLUG}.png`);
  await writeFile(outputPath, pngBuffer);

  console.log(`Done! Wrote ${outputPath} (${WIDTH}x${HEIGHT})`);
}

main().catch((err) => {
  console.error("Failed to generate infographic:", err);
  process.exit(1);
});
