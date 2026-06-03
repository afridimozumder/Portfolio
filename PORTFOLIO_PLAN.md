# Portfolio Build Plan — Shorif Ahmed Afridi Mozumder

A step-by-step playbook to build and publish a personal portfolio using **Claude Code**.
Goal: simple, easy to read, important things highlighted, fully responsive — and built to
tell a clear **career-pivot-into-GRC** story.

**Locked decisions:** Design = Refined Professional · Stack = Astro + Tailwind ·
Photography = a dedicated `/photography` gallery page (so the site is multi-page:
home + gallery).

---

## 0. The strategy (read this first)

Your portfolio has one job: make a recruiter or hiring manager believe, in under 30 seconds,
that you are a credible early-career **GRC / cybersecurity** candidate with a real technical
foundation. Everything below serves that.

**Three principles drive every decision in this plan:**

1. **Lead with the pivot narrative.** Software Engineering → Networking → MSc Cybersecurity → GRC.
   Make it look intentional. Your missing roles (ISP Network Engineer, Teaching Assistant) are
   your *strongest* professional evidence — they go near the top, not the bike shop.
2. **Be honest about being a student, but present strongly.** Don't fake GRC experience.
   Instead, show direction: thesis topic, a clearly-labeled certifications roadmap, and framing
   that shows you understand frameworks (ISO 27001, NIST CSF, risk, controls).
3. **Curate, don't dump.** You have 32 repos; most are coursework. Show your best **4–6** with
   real context. A recruiter clicking through to a half-finished class project hurts more than
   helps.

---

## 1. Recommended tech stack

| Layer | Recommendation | Why |
|---|---|---|
| Framework | **Astro** (+ Tailwind CSS) | Ships almost no JS, top Lighthouse scores, perfect for a content/portfolio site. Has a built-in content layer for projects + an optional blog. "Secure-by-default static output" is itself a nice signal for a security candidate. |
| Styling | **Tailwind CSS** | Fast, consistent, responsive-first. Easy for Claude Code to keep tidy. |
| Content | **Astro Content Collections** (Markdown/MDX) | Your projects, experience, and certs live as structured data/markdown — easy to add to later without touching layout. |
| Hosting | **Cloudflare Pages** or **GitHub Pages** | Both free. Cloudflare gives instant previews + easy custom domains; GitHub Pages fits your existing GitHub presence. |
| Domain (optional) | `ahmedafridi.com`, `afridimozumder.com`, or `afridi.dev` | A custom domain reads more professional than `*.github.io`. Optional for v1. |

**Simpler fallback:** if you'd rather not learn a framework, plain **HTML + CSS + a little JS**
works for a single-page portfolio. You lose the easy blog/projects-collection, but it's the
lowest-maintenance option. The plan's prompts include notes for this path.

**Heavier option (not recommended here):** Next.js is overkill for a static portfolio and adds
maintenance burden with no benefit for your use case.

---

## 2. Site architecture

A **single-page home** (anchored, sticky nav) plus a **dedicated `/photography` gallery page**.
The nav includes a "Photography" link that routes to the gallery; the home page carries a small
teaser that links there. Home sections, in order of importance (top = most important = most
visually highlighted):

1. **Hero** — Name · "Cybersecurity · GRC" · one-line positioning · Copenhagen ·
   primary actions (Download CV, LinkedIn, GitHub, Email).
2. **About** — the pivot narrative in 3–4 sentences. This is where you connect the dots.
3. **Focus / What I work toward** — GRC explicitly: frameworks you're learning, your thesis,
   the certifications roadmap. *This is the section that signals direction.*
4. **Experience** — Network Engineer (ISP) and Teaching Assistant FIRST, then Copenhagen roles
   framed for transferable skills (reliability, logistics under pressure, customer-facing).
5. **Education** — MSc Cybersecurity, Aalborg University · BSc Software Engineering, AIUB.
6. **Projects** — curated 4–6, each with: what it is, why you built it, what you learned.
   Thesis highlighted at the top.
7. **Certifications & Learning** — in-progress vs. planned, clearly labeled. Honesty = credibility.
8. **Photography & Travel (teaser)** — a small strip of 3–4 favorite shots with a
   "View gallery →" link to the dedicated `/photography` page. Low emphasis on the home page.
9. **Contact** — email, LinkedIn, GitHub, location, CV download.

**Plus a separate page:** `/photography` — the full gallery (see design notes in §3 and the
build prompt in Phase 3).

**Highlighting rule:** Hero, Focus, and the top of Experience get the strongest visual weight
(size, color accent, position). Hobbies get the least. Don't let everything shout — hierarchy
*is* the design.

---

## 3. Design direction — Refined Professional (chosen)

Generous whitespace; a characterful display font (a refined serif or grotesque — **not**
Inter/Roboto/Arial) paired with a clean, readable body font; ONE restrained accent color; subtle
motion on load. Reads trustworthy and senior — the right register for GRC. Pick a distinctive type
pairing as a starting point rather than a default system font, and keep the accent disciplined.

**The gallery page** stays consistent with this: calm, image-first, lots of breathing room — the
photos provide the color, the chrome stays quiet. A clean responsive grid (or light masonry) with a
lightbox, and optional grouping by country to tie in the travel angle.

**Non-negotiables:** light/dark friendly, WCAG AA contrast, real type hierarchy, no generic
"purple-gradient-on-white" AI look, fast load.

---

## 4. The build, phase by phase (with Claude Code prompts)

Work **one section at a time**, commit to git after each, and review in the browser before moving on.
Paste these prompts into Claude Code. Replace `[bracketed]` bits with your details.

### Phase 0 — Prep your assets (do this before any code)

Gather into a folder:
- A clean headshot (you have one) and 6–12 of your best photography images (resized, ~1600px wide).
- Your **fresh CV as PDF** (the portfolio links to it).
- Final text for: About paragraph, the two missing roles (ISP + TA) with dates and 2–3 bullets each,
  thesis title + one-line description, target certifications (in-progress / planned), and your chosen
  4–6 projects with a one-line "what I learned" each.
- Decide: custom domain or not; Cloudflare Pages or GitHub Pages.

> **Tip:** Before building, spend 30 minutes writing real READMEs for your 4–6 chosen repos —
> recruiters click through. You can ask Claude Code: *"Write a clear README for this repo
> explaining what it does, the stack, and what I learned, in a professional but plain tone."*

### Phase 1 — Scaffold + install the skill

```
Set up a new Astro project with Tailwind CSS for my personal portfolio.
I've placed a Claude Code skill at .claude/skills/portfolio-builder/SKILL.md —
read it first; it has my real content, the design system, and the rules to follow.
Initialize a git repo, create a sensible folder structure (components, sections,
content collections for projects/experience/certs), and a CLAUDE.md at the root
summarizing the project conventions. Don't build any sections yet — just the
skeleton, the layout shell, the design tokens (fonts, colors, spacing), and a
running dev server. Then show me the empty styled shell.
```

### Phase 2 — Content/data layer

```
Create the content layer described in the portfolio-builder skill: structured
data files (Markdown/MDX content collections) for experience, education, projects,
and certifications, plus a single site config for my name, taglines, and links.
Populate them with the real content from the skill. Keep layout out of this step —
just clean, well-typed data I can edit later without touching components.
```

### Phase 3 — Build sections (one prompt per section)

Hero:
```
Build the Hero section per the skill's design direction and hierarchy rules.
Name, the "Cybersecurity · GRC" positioning line, a one-sentence value statement,
Copenhagen location, and primary actions (Download CV, LinkedIn, GitHub, Email).
This is the most visually weighted element on the page. Make it responsive and
add one tasteful staggered load animation. Show me mobile and desktop.
```

About + Focus:
```
Build the About section (the pivot narrative) and the Focus section (GRC: frameworks,
thesis, and what I work toward). Focus is a key credibility section — give it strong
visual hierarchy. Keep copy tight and confident, honest about being a student.
```

Experience + Education:
```
Build Experience and Education. Order experience by relevance, NOT date: Network
Engineer (ISP) and Teaching Assistant first, then the Copenhagen roles framed for
transferable skills. Use the content collection data. Make it scannable on mobile.
```

Projects:
```
Build the Projects section from the projects collection — only the curated 4–6.
Each card: title, one-line what-it-is, the stack, and a one-line "what I learned",
with a link to the repo. Highlight the thesis project at the top. No grid of 32 repos.
```

Certifications + Photography teaser + Contact (home):
```
Build three home sections: (1) Certifications & Learning, clearly splitting in-progress
vs planned; (2) a small Photography & Travel TEASER — 3–4 favorite images with a
"View gallery →" link to /photography; (3) Contact with email, LinkedIn, GitHub,
location, and CV download. Add a "Photography" link to the site nav that routes to /photography.
```

Dedicated gallery page (`/photography`):
```
Create a dedicated /photography page consistent with the Refined Professional design:
calm, image-first, generous spacing. Build a responsive grid (or light masonry) of my
photos with a click-to-open lightbox (keyboard accessible, Esc to close). Optionally group
images by country to tie in the travel angle. Use Astro's <Image> for responsive srcset,
lazy loading, and modern formats so the page stays fast even with many photos. Pull image
data from a simple photos collection/manifest so I can add shots later without touching layout.
```

### Phase 4 — Responsive + accessible + dark mode

```
Audit the whole site for responsiveness across mobile, tablet, and desktop, and fix
any issues. Ensure WCAG AA contrast, keyboard navigation, focus styles, alt text on
all images, and semantic landmarks. Add a light/dark mode toggle that respects the
system preference. Show me the trouble spots you found and fixed.
```

*(Normal build prompt — no workflow needed. The deep, independently-verified audit comes in Phase 6.)*

### Phase 5 — Polish, SEO, and meta

```
Add SEO and social polish: per-page <title> and meta description, Open Graph + Twitter
card tags, a generated OG image with my name and "Cybersecurity · GRC", a favicon,
sitemap, robots.txt, and JSON-LD Person schema. Keep animations subtle and purposeful.
```

### Phase 6 — Full audit + verify (use a dynamic workflow here)

This is the one phase where a dynamic workflow earns its token cost: it's an audit-and-verify
task, exactly what the feature is built for. Trigger it by including the word "workflow". Run it
in a fresh session if your budget is tight (see §7).

```
Run a workflow to audit the whole portfolio site, fix what's safe to fix, and independently
verify every fix before reporting it. Cover:
- Responsiveness across mobile, tablet, and desktop breakpoints
- WCAG AA: contrast, keyboard nav, focus styles, alt text, semantic landmarks
- Performance: image optimization and lazy-loading, bundle size, Lighthouse-style checks
- SEO/meta: titles, descriptions, Open Graph, sitemap, robots, structured data
- Broken links and console errors
Follow the standards in .claude/skills/portfolio-builder/SKILL.md and the Verification
standard in §8 of my plan. Only report issues an independent agent confirms. Summarize what
was found, what changed, and anything that needs my decision.
```

### Phase 6.5 — Final pre-launch check (workflow)

```
Run a workflow for a final pre-launch pass against the checklist in the skill and §9 of my plan:
CV PDF downloads; only the curated 4–6 projects show; thesis featured; certs split into
in-progress/planned; all links work (LinkedIn, GitHub, email, Instagram); images have alt text;
dark/light mode works; no typos. Verify each item independently and give me a pass/fail report
with safe fixes applied.
```

### Phase 7 — Deploy

GitHub Pages path:
```
Set up deployment to GitHub Pages via GitHub Actions: build on push to main, deploy
the Astro static output, and configure the correct base path. Walk me through pushing
the repo and confirm the live URL.
```
Cloudflare Pages path:
```
Give me step-by-step instructions to deploy this Astro site to Cloudflare Pages by
connecting my GitHub repo (build command, output directory, env). Then how to add a
custom domain and HTTPS.
```

### Phase 8 — Maintain

```
Document in CLAUDE.md exactly how I add a new project, a new certification, or a new
experience entry later — which file to edit and the field format — so I can do it in
two minutes without breaking anything.
```

---

## 5. Working effectively with Claude Code

- **Keep a `CLAUDE.md`** at the repo root (conventions, stack, "don'ts"). Claude Code reads it
  automatically every session — it's your project memory.
- **The skill is your source of truth for content + design.** Update it if your facts change
  (new cert earned, thesis title finalized) and Claude Code stays accurate.
- **Commit per section.** `git commit` after each working piece so you can always roll back.
- **Iterate visually.** After each section, look at it on your phone before moving on.
- **One change at a time.** "Now make the hero font larger on mobile" beats a giant rewrite prompt.

---

## 6. Dynamic workflows — use surgically, not everywhere

Claude Code's dynamic workflows fan a task out to many parallel sub-agents, have a second set
of agents try to refute the findings, then converge on one verified result. Powerful, but
token-hungry — Anthropic recommends starting small. For a site this size the rule is simple:
**build by hand, audit with a workflow.**

- **Don't** use a workflow for scaffolding, content, or building/styling sections. Design needs
  your eye and quick back-and-forth; plain prompts in plan mode are better and far cheaper.
- **Do** use a workflow for Phase 6 (full audit + verify) and Phase 6.5 (final check) — both are
  audit-and-verify shaped, the feature's sweet spot.
- **Trigger per-task** by putting the word "workflow" in the prompt, rather than leaving
  `ultracode` on for the whole session (that sets xhigh reasoning on *every* task and drains
  budget). If Claude Code highlights "workflow" when you didn't mean it: Option+W (Mac) /
  Alt+W (Win/Linux) dismisses it.
- **Prereqs:** Claude Code v2.1.154+ and Opus 4.8 selected (`/model opus`). On Pro you also need
  the workflow toggle on in `/config`; if `ultracode` isn't in the `/effort` menu, your model
  doesn't support it. Run `claude update` if unsure.

## 7. Staying within Pro-plan limits — a session plan

This won't all fit in one Pro session, and that's fine — the build is designed to stop and resume
safely. To stretch your budget:

- **Commit after every section** so any session can end and the next picks up from git.
- **Use `/clear` between phases** to drop context you no longer need (long histories cost tokens on
  every turn); use `/compact` when context grows but you're mid-task.
- **Keep workflows in their own session.** They're the most expensive step, so run Phase 6 / 6.5
  on fresh budget, not at the tail of a long building session.
- **Build core-first** so you always have a shippable site if you run out partway.
- **Re-orient cheaply at the start of each session:**

```
Read .claude/skills/portfolio-builder/SKILL.md and CLAUDE.md, check the git log and current
project state, and tell me what's done and what the next step is. Don't change anything yet.
```

**Suggested session breakdown** (merge or split based on how your budget holds):

| Session | Scope | Workflow? |
|---|---|---|
| 1 | Scaffold + content layer + Hero / About / Focus | No |
| 2 | Experience, Education, Projects, Certifications, Contact | No |
| 3 | Photography gallery page + dark mode + first responsive pass | No |
| 4 | Phase 5 polish (SEO / meta / OG / favicon) | No |
| 5 | Phase 6 full audit + verify | **Yes** |
| 6 | Deploy + Phase 6.5 final check | Yes (final check) |

## 8. Verification standard (the audit rubric)

Give the audit workflow one fixed bar so repeated runs grade the same way. "Pass" means:

- Lighthouse ≥ 90 on Performance, Accessibility, Best Practices, and SEO (production build).
- Zero WCAG AA contrast failures; every interactive element keyboard-reachable with visible focus.
- Every image has meaningful `alt` text; gallery images lazy-load.
- No layout breakage at 360px, 768px, and 1280px widths.
- No console errors; no broken internal or external links.
- Meta title + description, Open Graph image, favicon, sitemap, and robots present.
- CV PDF downloads; only 4–6 curated projects show; thesis featured; certs split honestly.

*(If you want this enforced automatically on every audit, paste this list into the skill as a
"Verification standard" section — that's the one case where editing the skill actually helps.)*

---

## 9. Pre-launch checklist

- [ ] CV PDF linked and downloads correctly
- [ ] ISP Network Engineer + Teaching Assistant roles included and dated
- [ ] Only curated 4–6 projects shown; each linked repo has a real README
- [ ] Thesis highlighted; certs split into in-progress vs planned (no overclaiming)
- [ ] Looks right on a real phone, tablet, and desktop
- [ ] Dark/light mode works; AA contrast passes
- [ ] All images have alt text and are optimized
- [ ] Meta tags, OG image, favicon, sitemap present
- [ ] Lighthouse 90s+ across the board
- [ ] Links (LinkedIn /in/ahmedafridi, GitHub, email) all work
- [ ] No typos (read it out loud once)

---

## 10. Note on the fresh CV

Your portfolio content and your CV draw from the same well. The structured content you write for
Phase 0 — especially the two missing roles, the thesis line, and the certs roadmap — is exactly
what a strong one-page GRC-oriented CV needs. Build the content once, use it in both. (I can help
you produce the fresh CV as a polished document whenever you're ready.)
