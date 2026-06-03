import type { ImageMetadata } from "astro";

// Photo manifest for the /photography gallery + home teaser.
//
// Source images live in src/assets/photography (so Astro's <Image> can
// generate responsive srcsets + modern formats). They are auto-discovered
// here; to add a shot later, just drop a file in that folder and — if you
// want good alt text or country grouping — add an override entry below.

export interface Photo {
  src: ImageMetadata;
  /** Meaningful alt text. TODO: fill these in before launch (Phase 3). */
  alt: string;
  caption?: string;
  /** Country for optional gallery grouping (ties in the travel angle). */
  country?: string;
  /** true = include in the small 3–4 image home teaser strip. */
  teaser?: boolean;
}

const files = import.meta.glob<{ default: ImageMetadata }>(
  "../assets/photography/*.{jpg,jpeg,png,webp,avif}",
  { eager: true },
);

// Per-image metadata overrides, keyed by filename (without extension).
// Empty for now — alt text, captions, countries, and teaser picks land in Phase 3.
const meta: Record<string, Omit<Photo, "src">> = {};

export const photos: Photo[] = Object.entries(files)
  .map(([path, mod]) => {
    const key = path.split("/").pop()!.replace(/\.[^.]+$/, "");
    return {
      src: mod.default,
      alt: meta[key]?.alt ?? "",
      caption: meta[key]?.caption,
      country: meta[key]?.country,
      teaser: meta[key]?.teaser ?? false,
    };
  })
  .sort((a, b) => (a.src.src > b.src.src ? 1 : -1));

export const teaserPhotos = photos.filter((p) => p.teaser);
