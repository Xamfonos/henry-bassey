import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel/static';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  output: 'static',
  adapter: vercel(),
  integrations: [tailwind()],
});
