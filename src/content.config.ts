import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

// Experience — ordered by RELEVANCE, not date. Lower `relevanceRank` = shown first.
// (Network Engineer + Teaching Assistant rank above the Copenhagen roles.)
const experience = defineCollection({
  loader: glob({ pattern: "**/[^_]*.{md,mdx}", base: "./src/content/experience" }),
  schema: z.object({
    role: z.string(),
    org: z.string(),
    location: z.string().optional(),
    start: z.string(), // human label, e.g. "May 2023"
    end: z.string().optional(), // omit if current
    current: z.boolean().default(false),
    relevanceRank: z.number(),
    bullets: z.array(z.string()).default([]),
    frame: z.string().optional(), // transferable-skill framing note
  }),
});

const education = defineCollection({
  loader: glob({ pattern: "**/[^_]*.{md,mdx}", base: "./src/content/education" }),
  schema: z.object({
    degree: z.string(),
    institution: z.string(),
    location: z.string().optional(),
    start: z.string(),
    end: z.string().optional(),
    current: z.boolean().default(false),
    note: z.string().optional(),
    order: z.number().default(0),
  }),
});

const projects = defineCollection({
  loader: glob({ pattern: "**/[^_]*.{md,mdx}", base: "./src/content/projects" }),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    stack: z.array(z.string()).default([]),
    learned: z.string(),
    repoUrl: z.string().url().optional(),
    featured: z.boolean().default(false), // thesis = featured, sorts first
    order: z.number().default(0),
  }),
});

const certifications = defineCollection({
  loader: glob({ pattern: "**/[^_]*.{md,mdx}", base: "./src/content/certifications" }),
  schema: z.object({
    name: z.string(),
    // Honesty rule: never mark as "earned" unless truly earned.
    status: z.enum(["earned", "course", "in-progress", "planned"]),
    provider: z.string().optional(),
    progress: z.number().min(0).max(100).optional(),
    note: z.string().optional(),
    order: z.number().default(0),
  }),
});

export const collections = { experience, education, projects, certifications };
