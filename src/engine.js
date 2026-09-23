// Game loop: updates entities, checks collisions, and draws the board
// and entities every frame. Owns the canvas element and its 2D context;
// callers only ever talk to the Engine instance.
import { Resources } from './resources.js';
import {
  CANVAS_WIDTH,
  CANVAS_HEIGHT,
  TILE_WIDTH,
  TILE_HEIGHT,
  NUM_ROWS,
  NUM_COLS,
  COLLISION_HALF_WIDTH,
  ENEMY_RESET_X,
  MAX_DT,
} from './config.js';

// Top row is water; the rest alternate stone and grass.
const ROW_IMAGES = [
  'images/water-block.png',
  'images/stone-block.png',
  'images/stone-block.png',
  'images/stone-block.png',
  'images/grass-block.png',
  'images/grass-block.png',
];

const TILE_ASSETS = [
  'images/stone-block.png',
  'images/water-block.png',
  'images/grass-block.png',
  'images/enemy-bug.png',
  'images/char-boy.png',
];

export class Engine {
  constructor({ container, player, enemies, onCollision }) {
    this.player = player;
    this.enemies = enemies;
    this.onCollision = onCollision;
    this.lastTime = null;
    this.running = false;

    this.canvas = document.createElement('canvas');
    this.ctx = this.canvas.getContext('2d');
    this._setupCanvas();
    container.appendChild(this.canvas);

    this._tick = this._tick.bind(this);
  }

  // Backs the canvas at devicePixelRatio resolution for crisp rendering
  // on high-DPI/Retina screens, while its CSS size stays at the logical
  // (505x606) size so layout and input math are unaffected.
  _setupCanvas() {
    const dpr = window.devicePixelRatio || 1;
    this.canvas.width = CANVAS_WIDTH * dpr;
    this.canvas.height = CANVAS_HEIGHT * dpr;
    this.canvas.style.width = `${CANVAS_WIDTH}px`;
    this.canvas.style.height = `${CANVAS_HEIGHT}px`;
    this.ctx.scale(dpr, dpr);
  }

  // Loads the tile/sprite images and starts the loop once they're ready.
  start() {
    Resources.load(TILE_ASSETS);
    Resources.onReady(() => {
      this.lastTime = Date.now();
      this.running = true;
      this._tick();
    });
  }

  stop() {
    this.running = false;
  }

  resume() {
    if (this.running) return;
    this.lastTime = Date.now();
    this.running = true;
    this._tick();
  }

  _tick() {
    if (!this.running) return;

    const now = Date.now();
    const dt = Math.min((now - this.lastTime) / 1000, MAX_DT);

    this._update(dt);
    this._render();

    this.lastTime = now;
    requestAnimationFrame(this._tick);
  }

  _update(dt) {
    this.enemies.forEach((enemy) => enemy.update(dt, ENEMY_RESET_X));
    this.player.update();
    this._checkCollisions();
  }

  // Collision detection lives here, decoupled from the entities
  // themselves: entities only know how to move and reset, the engine
  // decides when two of them are touching and reacts.
  _checkCollisions() {
    this.enemies.forEach((enemy) => {
      const isColliding =
        Math.abs(enemy.x - this.player.x) <= COLLISION_HALF_WIDTH &&
        Math.abs(enemy.y - this.player.y) <= COLLISION_HALF_WIDTH;

      if (isColliding) {
        enemy.reset();
        this.player.reset();
        this.onCollision?.();
      }
    });
  }

  _render() {
    for (let row = 0; row < NUM_ROWS; row++) {
      for (let col = 0; col < NUM_COLS; col++) {
        this.ctx.drawImage(Resources.get(ROW_IMAGES[row]), col * TILE_WIDTH, row * TILE_HEIGHT);
      }
    }

    this.enemies.forEach((enemy) => enemy.render(this.ctx));
    this.player.render(this.ctx);
  }
}
