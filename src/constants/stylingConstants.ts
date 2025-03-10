import {StyleSheet} from "react-native";
import {
  Montserrat_500Medium,
  Montserrat_700Bold,
  Montserrat_800ExtraBold,
  Montserrat_900Black,
  useFonts
} from "@expo-google-fonts/montserrat";

// come in and change the entire look of the app without knowing how to code
// this contains all the constants necessary for a graphics designer to


// Text and Font
export default () => {
  let [fontsLoaded] = useFonts({
    Montserrat_500Medium,
    Montserrat_700Bold,
    Montserrat_800ExtraBold,
    Montserrat_900Black,
  });
};

// Colors
export const YELLOW = "#ffec3b"
export const ORANGE = "#f39a3e"
export const PURPLE = "#c062ed"
export const BLUE = "#2355e2"
export const NAVY = "#0d2763"

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

// Stylesheets: Fonts
export const FONT = StyleSheet.create({
  MONTSERRAT_500MEDIUM: {
    fontFamily: 'Montserrat_500Medium',
  },
  MONTSERRAT_700BOLD: {
    fontFamily: 'Montserrat_700Bold',
  },
  MONTSERRAT_800EXTRABOLD: {  // titles and game score
    fontFamily: 'Montserrat_800ExtraBold',
  },
  MONTSERRAT_900BLACK: {  // game word
    fontFamily: 'Montserrat_900Black',
  },
})

// Stylesheets: Home Menu - index.tsx
export const HIDE_TAB_BAR = {
  display: 'none'
};
export const TAB_BAR = {
  backgroundColor: NAVY,
  borderTopWidth: 0,
};