import { STARTING_LIVES } from './config.js';

// Tracks score/lives and renders them plus status messages into the
// DOM elements it's given. Kept separate from Engine so the game loop
// doesn't need to know about the HUD or aria-live announcements.
export class GameState {
  constructor({ scoreEl, livesEl, statusEl, restartBtn, onRestart }) {
    this.scoreEl = scoreEl;
    this.livesEl = livesEl;
    this.statusEl = statusEl;
    this.restartBtn = restartBtn;
    this.onRestart = onRestart;

    this.restartBtn.addEventListener('click', () => this._restart());

    this.reset();
  }

  reset() {
    this.score = 0;
    this.lives = STARTING_LIVES;
    this.gameOver = false;
    this._render();
    this._announce('New game. Use the arrow keys to reach the water. Avoid the bugs!');
  }

  _restart() {
    this.reset();
    this.onRestart?.();
  }

  addScore() {
    if (this.gameOver) return;
    this.score += 1;
    this._render();
    this._announce(`You reached the water! Score: ${this.score}`);
  }

  loseLife() {
    if (this.gameOver) return;
    this.lives -= 1;
    this._render();

    if (this.lives <= 0) {
      this.gameOver = true;
      this._announce(`Game over. Final score: ${this.score}. Press Restart to play again.`);
    } else {
      this._announce(`Ouch! A bug got you. Lives left: ${this.lives}`);
    }
  }

  _render() {
    this.scoreEl.textContent = `Score: ${this.score}`;
    this.livesEl.textContent = `Lives: ${this.lives}`;
  }

  _announce(message) {
    this.statusEl.textContent = message;
  }
}
