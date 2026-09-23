// Board grid. The canvas is tiled NUM_COLS x NUM_ROWS, each tile
// TILE_WIDTH x TILE_HEIGHT.
export const TILE_WIDTH = 101;
export const TILE_HEIGHT = 83;
export const NUM_COLS = 5;
export const NUM_ROWS = 6;

export const CANVAS_WIDTH = 505; // NUM_COLS * TILE_WIDTH
// Taller than NUM_ROWS * TILE_HEIGHT (498) on purpose: the extra space
// below the drawn grid is original-template breathing room for the HUD.
export const CANVAS_HEIGHT = 606;

// Player start position and movement bounds. These are the original
// template's values, not perfectly grid-aligned to TILE_WIDTH/HEIGHT,
// but changing them would change the feel of the game, so they're kept
// as-is and simply named here instead of left as inline magic numbers.
export const PLAYER_START_X = 200;
export const PLAYER_START_Y = 400;
export const PLAYER_MIN_X = 0;
export const PLAYER_MAX_X = 400;
export const PLAYER_MIN_Y = 0;
export const PLAYER_MAX_Y = 400;
export const PLAYER_WIN_Y = 46; // crossing above this row line reaches the water

// Collision: an enemy and the player are considered touching when both
// their x and y distance are within this many pixels of each other.
export const COLLISION_HALF_WIDTH = 40;

// An enemy past this x is off the right edge of the canvas and resets
// to its starting position.
export const ENEMY_RESET_X = 500;

// Caps the per-frame time delta so a backgrounded/stalled tab can't
// produce a huge dt on resume that lets entities skip past collisions.
export const MAX_DT = 0.1;

export const STARTING_LIVES = 3;

export const ENEMY_CONFIGS = [
  { x: -100, y: 200, speed: 250 },
  { x: -200, y: 50, speed: 500 },
  { x: -1000, y: 150, speed: 700 },
  { x: -500, y: 100, speed: 200 },
  { x: -800, y: 250, speed: 400 },
];
