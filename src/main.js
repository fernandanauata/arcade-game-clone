import './style.css';
import { Player } from './entities/Player.js';
import { Enemy } from './entities/Enemy.js';
import { Engine } from './engine.js';
import { GameState } from './gameState.js';
import { ENEMY_CONFIGS } from './config.js';

const container = document.getElementById('game-container');
const scoreEl = document.getElementById('score');
const livesEl = document.getElementById('lives');
const statusEl = document.getElementById('game-status');
const restartBtn = document.getElementById('restart-btn');

const enemies = ENEMY_CONFIGS.map(({ x, y, speed }) => new Enemy(x, y, speed));
const player = new Player({ onReachGoal: () => gameState.addScore() });

const engine = new Engine({
  container,
  player,
  enemies,
  onCollision: () => {
    gameState.loseLife();
    if (gameState.gameOver) {
      engine.stop();
    }
  },
});

const gameState = new GameState({
  scoreEl,
  livesEl,
  statusEl,
  restartBtn,
  onRestart: () => {
    player.reset();
    enemies.forEach((enemy) => enemy.reset());
    engine.resume();
  },
});

engine.start();

// Listens for key presses and sends the keys to the player's
// handleInput() method.
document.addEventListener('keyup', (e) => {
  const allowedKeys = {
    37: 'left',
    38: 'up',
    39: 'right',
    40: 'down',
  };

  const key = allowedKeys[e.keyCode];
  if (key) {
    player.handleInput(key);
  }
});

// Stop arrow keys/space from scrolling the page while playing.
window.addEventListener(
  'keydown',
  (e) => {
    if ([32, 37, 38, 39, 40].includes(e.keyCode)) {
      e.preventDefault();
    }
  },
  false
);
