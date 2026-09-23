# Bug Game — Classic Arcade Game Clone

A modernized version of Udacity's Classic Arcade Game Clone (a Frogger-style
game), originally built as an ES5/prototype-based project on HTML5 Canvas.
It's been refactored into modern JavaScript (ES6+ classes, ES modules) and
rebuilt on [Vite](https://vitejs.dev), with a real HUD, accessibility
support, and CI-driven deployment.

**Live Demo:** [fernandanauata.github.io/arcade-game-clone](https://fernandanauata.github.io/arcade-game-clone/)

---

## How to play

Move the character with the **arrow keys**. Avoid the bugs — each hit costs
a life. Reach the water to score a point and go again. Run out of lives and
the game ends; press **Restart** to play again.

---

## Modernization & refactoring summary

| Area                       | Before                                                                                                                                                     | After                                                                                                                                                                                                                         |
| -------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Tooling & build system** | Three `<script>` tags loaded in a fixed order, no bundler, no linting                                                                                      | [Vite](https://vitejs.dev) dev server/build, ESLint, and Prettier                                                                                                                                                             |
| **Architecture & OOP**     | `Enemy`/`Player`/`Resources` as ES5 constructor functions with `.prototype` methods, `Resources` as a global-attaching IIFE                                | Clean ES6 classes (`Enemy`, `Player`, `ResourceLoader`, `Engine`) as ES modules, no implicit globals                                                                                                                          |
| **State management & HUD** | No score, no lives, no UI feedback — a collision or a win just silently reset the player's position                                                        | Central `gameState.js` tracking lives, score, and game-over status; a visible HUD; a Restart control; `aria-live="polite"` status announcements for collisions, scoring, and game over                                        |
| **Canvas & rendering**     | Fixed-pixel canvas, no DPI awareness, unbounded frame delta                                                                                                | High-DPI (Retina) canvas scaling via `devicePixelRatio`, a responsive canvas that scales down on narrow viewports, and a capped frame-time delta (`dt`) so a backgrounded/stalled tab can't let entities skip past collisions |
| **Code quality**           | Dead/duplicate `Player.update`, input handling read the deprecated global `event` object, magic numbers scattered throughout, no image-load error handling | Dead code removed, input handling uses the passed key argument, magic numbers centralized in `src/config.js`, and `ResourceLoader` surfaces failed image loads instead of hanging silently                                    |

---

## Getting started

```bash
npm install
npm run dev
```

Then open the local URL Vite prints (typically http://localhost:5173).

### Scripts

| Command           | What it does                         |
| ----------------- | ------------------------------------ |
| `npm run dev`     | Start the Vite dev server            |
| `npm run build`   | Production build to `dist/`          |
| `npm run preview` | Preview the production build locally |
| `npm run lint`    | Run ESLint                           |
| `npm run format`  | Format the codebase with Prettier    |

---

## Deployment

This repo deploys to GitHub Pages via [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml):
on every push to `main` (or a manual run from the Actions tab), it installs
dependencies, lints, builds with Vite, and publishes `dist/` using GitHub's
official `actions/deploy-pages` action.

To set this up on a fork or a new repo:

1. In **Settings → Pages → Build and deployment**, set **Source** to
   **GitHub Actions**.
2. Push to `main` (or run the `Deploy to GitHub Pages` workflow manually
   from the **Actions** tab) — the first run publishes the site.
3. Because GitHub Pages project sites are served from
   `https://<user>.github.io/<repo>/` rather than the domain root, asset
   URLs need that `/repo/` prefix in production. `vite.config.js` sets
   `base: '/arcade-game-clone/'` for production builds only, so the dev
   server is unaffected. If you fork this under a different repo name,
   update that value to match.

---

## Project structure

```
index.html               Entry HTML (mounts the game + HUD)
src/
  main.js                 Wires up the player, enemies, engine, and game state
  engine.js                Game loop, rendering, collision detection
  gameState.js              Score/lives tracking and UI/aria-live updates
  config.js                 Named constants (tile size, board bounds, etc.)
  resources.js               Image loading/caching
  entities/
    Player.js
    Enemy.js
  style.css
public/
  images/                     Game sprites
.github/workflows/
  deploy.yml                   Build + deploy to GitHub Pages on push to main
```

---

## About the author

**Fernanda Nauata** — Senior Product Designer (UX, UI & Visual)

10+ years of experience across AAA games (EA Sports), SaaS platforms,
marketing, and digital products, designing product experiences end-to-end —
from research and strategy through visual craft and implementation. Active
mentor in the Vancouver tech community (SFU Surge, FLUI Design Jam, IxDF).

- Portfolio: [fernandanauata.com](https://fernandanauata.com)
- LinkedIn: [linkedin.com/in/fernandanauata](https://www.linkedin.com/in/fernandanauata/)
- Contact: [contact@fernandanauata.com](mailto:contact@fernandanauata.com)

---

## License

MIT — see [LICENSE](LICENSE).
