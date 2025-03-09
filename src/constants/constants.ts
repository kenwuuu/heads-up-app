// Game UI constants
export const DEFAULT_GAME_DURATION_SECONDS = 60;
export const MINIMUM_GAME_DURATION_SECONDS = 1;
export const DEFAULT_READY_TEXT = 'Ready?';
export const COUNTDOWN_START = 3;
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

// Text styles
export const TEXT_STYLES = {
  TIMER: {
    paddingTop: 10,
    fontSize: 48,
    fontWeight: '700' as const,
    color: '#333',
  },
  COUNTDOWN: {
    padding: 80,
    fontSize: 72,
    fontWeight: '700' as const,
    color: '#333',
  },
  WORD: {
    fontSize: 36,
    fontWeight: '600' as const,
    color: '#333',
  },
  SCORE: {
    fontSize: 24,
    fontWeight: '500' as const,
    color: '#666',
  },
};

// Layout spacing
export const SPACING = {
  SMALL: 8,
  MEDIUM: 16,
  LARGE: 32,
  XLARGE: 64,
};

// Card styles
export const CARD_STYLES = {
  borderRadius: 12,
  width: '90%' as const,
  padding: SPACING.XLARGE,
  backgroundColor: '#fff',
  alignItems: 'center' as const,
  justifyContent: 'center' as const,
};
