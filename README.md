# Bug Game — Classic Arcade Game Clone

A Frogger-style arcade game built with vanilla JavaScript (ES modules) and
[Vite](https://vitejs.dev). Originally created for Udacity's Front-End Web
Developer Nanodegree, then modernized to current web standards.

---

## How to play

Move the character with the **arrow keys**. Avoid the bugs — each hit costs
a life. Reach the water to score a point and go again. Run out of lives and
the game ends; press **Restart** to play again.

---

## Getting started

```bash
npm install
npm run dev
```

Then open the local URL Vite prints (typically http://localhost:5173).

### Other scripts

| Command           | What it does                         |
| ----------------- | ------------------------------------ |
| `npm run build`   | Production build to `dist/`          |
| `npm run preview` | Preview the production build locally |
| `npm run lint`    | Run ESLint                           |
| `npm run format`  | Format the codebase with Prettier    |

---

## Project structure

```
index.html          Entry HTML (mounts the game + HUD)
src/
  main.js            Wires up the player, enemies, engine, and game state
  engine.js           Game loop, rendering, collision detection
  gameState.js        Score/lives tracking and UI/aria-live updates
  config.js           Named constants (tile size, board bounds, etc.)
  resources.js        Image loading/caching
  entities/
    Player.js
    Enemy.js
  style.css
public/
  images/              Game sprites
```

---

## About the author

[Fernanda Nauata](https://www.alvesfernanda.com) is a Graphic Designer and
Front-End Developer.

- [Facebook](https://www.facebook.com/allvesfernanda)
- [LinkedIn](https://www.linkedin.com/fernandanauata)
- [Instagram](https://instagram.com/allvesfernanda)
- [Twitter](https://twitter.com/allvesfernanda)
- [Email](mailto:ferhcard@gmail.com)

---

## License

MIT — see [LICENSE](LICENSE).
