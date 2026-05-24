import { defineConfig } from 'astro/config';

// Served at https://bifteki-crew.github.io/games/
export default defineConfig({
  site: 'https://bifteki-crew.github.io',
  base: '/games',
  trailingSlash: 'always',
  build: {
    assets: '_assets',
  },
});
