import { Resources } from '../resources.js';

export class Enemy {
  constructor(x, y, speed) {
    this.x = x;
    this.y = y;
    this.xInit = x;
    this.speed = speed;
    this.sprite = 'images/enemy-bug.png';
  }

  reset() {
    this.x = this.xInit;
  }

  // Multiplying by dt keeps movement speed consistent regardless of
  // frame rate. resetBoundaryX is the x past which the enemy has moved
  // fully off-screen and should loop back to its start.
  update(dt, resetBoundaryX) {
    this.x += this.speed * dt;

    if (this.x > resetBoundaryX) {
      this.reset();
    }
  }

  render(ctx) {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }
}
