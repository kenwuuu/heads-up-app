import {StyleSheet} from "react-native";

// come in and change the entire look of the app without knowing how to code
// this contains all the constants necessary for a graphics designer to


// Text and Font

// Colors

export const YELLOW = "#fced60"
export const PURPLE = "#b467e6"
export const NAVY = "#14265f"

// Components

// Stylesheets: Global
export const styleSheet = StyleSheet.create({
  BACKGROUND_CONTAINER: {
    flex: 1,
    backgroundColor: NAVY,
  },
  SAFE_AREA_CONTAINER: {
    flex: 1,
    backgroundColor: NAVY,
  },
  GAME_TEXT: {
    color: YELLOW,
  },
  DECK_CARD_TEXT: {
    color: PURPLE,
  },
  MENU_BACKGROUND: {
    backgroundColor: NAVY,
  }
})

// Stylesheets: Home Menu - index.tsx
export const HIDE_TAB_BAR = {
  display: 'none'
};
export const TAB_BAR = {
  backgroundColor: NAVY,
  borderTopWidth: 0,
};