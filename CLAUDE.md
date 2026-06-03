# CLAUDE.md — Portfolio project conventions

Personal cybersecurity/GRC portfolio for **Shorif Ahmed Afridi Mozumder**.

## Source of truth

`.claude/SKILL.md` (skill `portfolio-builder`) holds the canonical **content, design
system, and non-negotiable rules**. Read it before building or editing anything. If a
fact changes, update the skill — don't hardcode facts in components. `PORTFOLIO_PLAN.md`
holds the phased build plan.

## Stack

- **Astro 5** + **Tailwind CSS v4** (via `@tailwindcss/vite`). Static output, minimal JS.
  (Pinned to Astro 5 — Astro 6's experimental rolldown bundler isn't yet compatible with `@tailwindcss/vite`.)
- Multi-page: home (`/`, single-page scroll) + dedicated gallery (`/photography`).
- TypeScript strict.

## Commands

| Command | Does |
|---|---|
| `npm run dev` | Dev server at http://localhost:4321 |
| `npm run build` | Production build to `dist/` |
| `npm run preview` | Serve the production build locally |
| `npm run check` | `astro check` (type + content errors) |
| `npm run prepare:images` | Re-run asset prep (HEIC→JPEG, resize, stage CV) |

## Project layout

```
src/
  pages/            index.astro (home), photography.astro (gallery)
  layouts/          BaseLayout.astro — head, theme bootstrap, nav, footer
  components/       Nav, Footer, ThemeToggle (+ sections/, ui/ added in Phase 3)
  content/          content collections: experience, education, projects, certifications
  content.config.ts collection schemas (zod)
  data/             site.ts (identity/links), photos.ts (gallery manifest)
  styles/           global.css — Tailwind import + design tokens
  assets/           optimised images (headshot.jpg, photography/*.jpg) — go through <Image>
public/             favicon.svg, cv/*.pdf (static, served as-is)
assets/             ORIGINAL source images + CV (untouched; not deployed)
scripts/            prepare-images.mjs (Phase 0 asset prep)
```

## Design system — "Refined Professional" (do not swap)

- **Fonts:** Fraunces Variable (display) + Public Sans Variable (body). Self-hosted via
  Fontsource. Never Inter/Roboto/Arial.
- **Colour:** warm paper neutrals + ONE teal accent. All colours are semantic CSS
  variables in `global.css`, mapped to Tailwind utilities via `@theme inline`:
  `bg-paper`, `bg-surface`, `text-ink`, `text-muted`, `text-faint`, `border-edge`,
  `text-accent` / `bg-accent`, `accent-strong`, `accent-soft`. **Use these tokens, not
  raw hex** — that's what makes light/dark + future re-theming one-line changes.
- **Dark mode:** `data-theme="dark"` on `<html>`, set pre-paint in BaseLayout (no flash),
  toggled by `ThemeToggle`. Use the `dark:` variant only when a token can't express it.
- `.container-page` = the standard centered content measure.

## Adding content later (no component edits needed)

- **Project:** add a `.md` to `src/content/projects/` (thesis = `featured: true`). Keep to 4–6.
- **Certification:** add to `src/content/certifications/` with a truthful `status`.
- **Experience:** add to `src/content/experience/` with a `relevanceRank` (lower = first).
- **Education:** add to `src/content/education/` with an `order`.
- **Photo:** drop an image in `src/assets/photography/`; add an alt/caption/country/teaser
  override in `src/data/photos.ts` if needed. Gallery + grouping update automatically.
- **Identity / links / taglines:** `src/data/site.ts`.

See each collection's `_README.md` for the exact frontmatter fields.

## Rules (from the skill — do not break)

1. Lead with the pivot narrative (SWE → Network Eng → MSc Cybersecurity → GRC).
2. Experience ordered by **relevance, not date**.
3. Honest student positioning; certs split in-progress vs planned; never claim unearned.
4. Curate projects — 4–6 best, thesis featured.
5. Hierarchy is the design: Hero/Focus/top-Experience loudest; hobbies quietest.
6. Responsive, WCAG AA, keyboard accessible, alt text on every image, Lighthouse 90s+, light/dark.

Commit to git after each working section.
