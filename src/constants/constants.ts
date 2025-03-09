// this contains all the constants necessary to change the
// functionality of the app without knowing how to code


// App Text
export const APP_NAME = "Head2Head";

// Game UI constants
export const DEFAULT_GAME_DURATION_SECONDS = 60;
export const MINIMUM_GAME_DURATION_SECONDS = 1;
export const DEFAULT_READY_TEXT = 'Ready?';
export const COUNTDOWN_TIME = 3;

// Layout constants
export const GRID_COLUMN_COUNT = 2;
export const GRID_SPACING = 8;
export const GRID_SPACING_MULTIPLIER = {
  TINY: 1,
  SMALL: 2,
  MEDIUM: 4,
  LARGE: 6,
};

// UI Theme constants
export const SELECTED_CARD_STYLES = {
  BACKGROUND_COLOR: '#e8f0fe',
  BORDER_COLOR: '#1a73e8',
  BORDER_WIDTH: 2,
};

// Button colors
export const BUTTON_COLORS = {
  CORRECT: '#4CAF50',
  INCORRECT: '#f44336',
};

// Layout dimensions
export const MAX_BUTTON_CONTAINER_WIDTH = 300;

// Text colors
export const HINT_TEXT_COLOR = '#666';

// Audio constants
export const AUDIO_CONFIG = {
  PLAYS_IN_SILENT_MODE_IOS: true,
  STAYS_ACTIVE_IN_BACKGROUND: false,
};
