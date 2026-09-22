import { Resources } from '../resources.js';
import {
  TILE_WIDTH,
  TILE_HEIGHT,
  PLAYER_START_X,
  PLAYER_START_Y,
  PLAYER_MIN_X,
  PLAYER_MAX_X,
  PLAYER_MIN_Y,
  PLAYER_MAX_Y,
  PLAYER_WIN_Y,
} from '../config.js';

export class Player {
  constructor({ onReachGoal } = {}) {
    this.x = PLAYER_START_X;
    this.y = PLAYER_START_Y;
    this.sprite = 'images/char-boy.png';
    this.onReachGoal = onReachGoal;
  }

  // Movement is grid-based and driven directly by the move*/handleInput
  // calls below rather than per-frame interpolation, so there's nothing
  // to advance here on each tick.
  update() {}

  reset() {
    this.x = PLAYER_START_X;
    this.y = PLAYER_START_Y;
  }

  render(ctx) {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }

  moveLeft() {
    if (this.x > PLAYER_MIN_X) {
      this.x -= TILE_WIDTH;
    }
  }

  moveRight() {
    if (this.x < PLAYER_MAX_X) {
      this.x += TILE_WIDTH;
    }
  }

  moveUp() {
    if (this.y > PLAYER_MIN_Y) {
      this.y -= TILE_HEIGHT;
    }

    if (this.y < PLAYER_WIN_Y) {
      this.reset();
      this.onReachGoal?.();
    }
  }

  moveDown() {
    if (this.y < PLAYER_MAX_Y) {
      this.y += TILE_HEIGHT;
    }
  }

  handleInput(key) {
    switch (key) {
      case 'left':
        this.moveLeft();
        break;

      case 'up':
        this.moveUp();
        break;

      case 'right':
        this.moveRight();
        break;

      case 'down':
        this.moveDown();
        break;

      default:
        break;
    }
  }
}
