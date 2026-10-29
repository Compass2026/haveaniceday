import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://hadaniceday.com', // TODO: confirm production domain
  build: {
    // shop.html, podcast.html: served as /shop and /podcast (see vercel.json)
    format: 'file',
  },
  trailingSlash: 'never',
});
