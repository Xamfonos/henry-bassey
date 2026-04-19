import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';
import mdx from '@astrojs/mdx';

export default defineConfig({
  site: 'https://henrybassey.com',
  output: 'static',
  adapter: vercel(),
  integrations: [tailwind(), react(), mdx()],
  redirects: {
    '/blog/using-ai-tools-for-research': {
      status: 301,
      destination: '/blog/ai-research-tool-bias',
    },
  },
});
