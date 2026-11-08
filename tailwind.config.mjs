/** Tailwind is installed with the Astro project. The site styles live in src/styles/global.css. */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx}'],
  theme: { extend: {} },
  plugins: [],
  corePlugins: { preflight: false },
};
