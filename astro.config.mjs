import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel';
import tailwind from '@astrojs/tailwind';
import keystatic from '@keystatic/astro';
import react from '@astrojs/react';
import markdoc from '@astrojs/markdoc';

export default defineConfig({
  site: 'https://henrybassey.com',

  output: 'static',
  adapter: vercel(),
  integrations: [tailwind(), react(), markdoc(), keystatic()],
});
