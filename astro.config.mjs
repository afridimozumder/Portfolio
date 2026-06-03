// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  // Update to the real domain (or GitHub Pages URL) at deploy time.
  site: 'https://afridimozumder.github.io',
  integrations: [sitemap()],
  vite: {
    // @ts-expect-error — @tailwindcss/vite is typed against a newer Vite than
    // Astro 5 bundles (two Vite copies in the tree). Type-only; runtime is fine.
    plugins: [tailwindcss()],
  },
  image: {
    // Sharp is the default; declared here for clarity.
    service: { entrypoint: 'astro/assets/services/sharp' },
  },
});
