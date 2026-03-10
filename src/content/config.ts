import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

export const BLOG_CATEGORIES = [
    'Developer Marketing',
    'Technical Reviews',
    'Case Studies',
    'Content Strategy',
    'SEO & GEO',
    'Uncategorized',
] as const;

export type BlogCategory = typeof BLOG_CATEGORIES[number];

const blog = defineCollection({
    loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/blog' }),
    schema: z.object({
        title: z.string(),
        date: z.string(),
        excerpt: z.string(),
        coverImage: z.string().optional(),
        tags: z.array(z.string()).default([]),
        featured: z.boolean().default(false),
        category: z.enum(BLOG_CATEGORIES).default('Uncategorized'),
    }),
});

export const collections = { blog };
