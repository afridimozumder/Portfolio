import type { ImageMetadata } from "astro";

// Photo manifest for the /photography gallery + home teaser.
//
// Source images live in src/assets/photography (so Astro's <Image> can
// generate responsive srcsets + modern formats). They are auto-discovered
// here; to add a shot later, just drop a file in that folder and — if you
// want good alt text or country grouping — add an override entry below.

export interface Photo {
  src: ImageMetadata;
  /** Meaningful alt text. */
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
// alt text written from the actual images; `teaser: true` = shown in the home strip.
const meta: Record<string, Omit<Photo, "src">> = {
  "img001-afridi": { alt: "A lone fisherman casting a net from a boat on calm, misty water at dawn.", teaser: true },
  "img-3281": { alt: "Colourful townhouses and a moored wooden boat along Copenhagen's Nyhavn canal.", teaser: true },
  "img-1070": { alt: "Pink cherry blossoms in full bloom against a bright blue spring sky.", teaser: true },
  "img-6364": { alt: "An illuminated Chinese-style pagoda reflected in water at night in Tivoli Gardens.", teaser: true },
  "75024812-f01a-491b-9bd7-e2a2128eafb9": { alt: "A fiery orange sunset glowing over a darkened city skyline." },
  "img-0366": { alt: "Symmetrical steel arches of a covered pedestrian bridge receding into the distance." },
  "img-1017": { alt: "A dark, sculptural modern tower against a moody dusk sky by the waterfront." },
  "img-1029": { alt: "The green copper dome of Copenhagen's Marble Church behind rising fountain spray." },
  "img-1037": { alt: "A historic city square with an equestrian statue and a clock-tower building." },
  "img-1118": { alt: "Birds scattered in flight across a soft, overcast grey sky." },
  "img-1360": { alt: "A small wooden little-free-library box nestled among green foliage." },
  "img-3164": { alt: "An ornate vaulted interior lit warmly from above." },
  "img-3314": { alt: "A cyclist riding down a rain-slicked cobblestone street lined with old buildings." },
  "img-4796": { alt: "Bare winter trees silhouetted along a quiet street at dusk." },
  "img-6365": { alt: "A warmly lit restaurant exterior at night with a figure passing by." },
  "img003-afridi": { alt: "A figure rowing a wooden boat across still, misty water." },
};

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
