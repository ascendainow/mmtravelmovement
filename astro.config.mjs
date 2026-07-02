import { defineConfig } from 'astro/config';
import netlify from '@astrojs/netlify';

// https://astro.build/config
export default defineConfig({
  site: 'https://mmtravelmovement.netlify.app',
  output: 'static',
  adapter: netlify(),
  devToolbar: { enabled: false },
});
