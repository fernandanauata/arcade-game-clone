import { defineConfig } from 'vite';

// GitHub Pages serves project sites (as opposed to a user/org root site)
// from https://<user>.github.io/<repo>/, so asset URLs need to be
// prefixed with the repo name in production. The dev server still runs
// at the root regardless.
export default defineConfig({
  base: process.env.NODE_ENV === 'production' ? '/arcade-game-clone/' : '/',
});
