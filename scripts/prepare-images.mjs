/**
 * One-off asset prep (Phase 0).
 *
 *  - Converts HEIC/HEIF photos to JPEG (browsers don't render HEIC).
 *  - Sanitises filenames (drops "©" and other unsafe characters).
 *  - Resizes every photo to max 1600px wide, the headshot to 1000px.
 *  - Stages the CV PDF into /public/cv for direct download.
 *
 * Sources in ./assets are left untouched. Re-runnable (idempotent-ish).
 * Run:  npm run prepare:images
 */
import { readdir, mkdir, copyFile, readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";
import heicConvert from "heic-convert";

const root = path.resolve(fileURLToPath(import.meta.url), "../..");
const SRC_PHOTOS = path.join(root, "assets", "photography");
const OUT_PHOTOS = path.join(root, "src", "assets", "photography");
const OUT_HEADSHOT = path.join(root, "src", "assets");
const OUT_CV = path.join(root, "public", "cv");

const slugify = (name) =>
  name
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

async function toJpegBuffer(file) {
  const buf = await readFile(file);
  if (/\.hei[cf]$/i.test(file)) {
    // Decode HEIC → raw JPEG buffer first; sharp can't read HEIC on Windows.
    return Buffer.from(await heicConvert({ buffer: buf, format: "JPEG", quality: 0.95 }));
  }
  return buf;
}

async function processPhotos() {
  await mkdir(OUT_PHOTOS, { recursive: true });
  const entries = (await readdir(SRC_PHOTOS)).filter((f) =>
    /\.(jpe?g|png|hei[cf])$/i.test(f),
  );

  let ok = 0;
  for (const file of entries) {
    const base = slugify(file.replace(/\.[^.]+$/, ""));
    const out = path.join(OUT_PHOTOS, `${base}.jpg`);
    try {
      const input = await toJpegBuffer(path.join(SRC_PHOTOS, file));
      await sharp(input)
        .rotate() // honour EXIF orientation
        .resize({ width: 1600, withoutEnlargement: true })
        .jpeg({ quality: 80, mozjpeg: true })
        .toFile(out);
      ok++;
      console.log(`  ✓ ${file}  →  photography/${base}.jpg`);
    } catch (err) {
      console.error(`  ✗ ${file}: ${err.message}`);
    }
  }
  console.log(`Photos: ${ok}/${entries.length} processed.`);
}

async function processHeadshot() {
  await mkdir(OUT_HEADSHOT, { recursive: true });
  const src = path.join(root, "assets", "headshot.png");
  const out = path.join(OUT_HEADSHOT, "headshot.jpg");
  await sharp(await readFile(src))
    .rotate()
    .resize({ width: 1000, withoutEnlargement: true })
    .jpeg({ quality: 86, mozjpeg: true })
    .toFile(out);
  console.log("Headshot: src/assets/headshot.jpg");
}

async function stageCv() {
  await mkdir(OUT_CV, { recursive: true });
  const files = (await readdir(path.join(root, "assets"))).filter((f) =>
    /\.pdf$/i.test(f),
  );
  if (!files.length) return console.warn("CV: no PDF found in /assets.");
  await copyFile(
    path.join(root, "assets", files[0]),
    path.join(OUT_CV, "Shorif-Ahmed-Afridi-Mozumder-CV.pdf"),
  );
  console.log(`CV: public/cv/Shorif-Ahmed-Afridi-Mozumder-CV.pdf (from ${files[0]})`);
}

console.log("Preparing assets…");
await processPhotos();
await processHeadshot();
await stageCv();
console.log("Done.");
