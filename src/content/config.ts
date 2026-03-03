import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const thoughts = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdoc}", base: "./src/content/thoughts" }),
  schema: z.object({
    title: z.string(),
    date: z.string(),
    excerpt: z.string().optional(),
    category: z.string(),
    tags: z.array(z.string()).default([]),
    featured: z.boolean().default(false),
  }),
});

const shorts = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdoc}", base: "./src/content/shorts" }),
  schema: z.object({
    title: z.string(),
    date: z.string(),
    category: z.string(),
    tags: z.array(z.string()).default([]),
  }),
});

export const collections = { thoughts, shorts };
