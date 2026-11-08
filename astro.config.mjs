import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://henrybassey.com',
  output: 'static',
  adapter: vercel(),
  integrations: [tailwind({ applyBaseStyles: false }), react(), mdx(), sitemap()],
  redirects: {
    '/blog/using-ai-tools-for-research': {
      status: 301,
      destination: '/blog/ai-research-tool-bias',
    },
  },
});
