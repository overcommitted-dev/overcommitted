import { defineConfig } from 'astro/config';
import preact from '@astrojs/preact';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import vercel from '@astrojs/vercel';

// https://astro.build/config
export default defineConfig({
  output: 'static',
  adapter: vercel({
    imageService: true,
    webAnalytics: {
      enabled: true
    }
  }),
  site: 'https://overcommitted.dev',
  base: '/overcommitted',
  integrations: [preact(), sitemap()],
  vite: {
    plugins: [tailwindcss()]
  }
});
