import {StyleSheet} from "react-native";
import {
  Montserrat_500Medium,
  Montserrat_700Bold,
  Montserrat_800ExtraBold,
  Montserrat_900Black,
  useFonts
} from "@expo-google-fonts/montserrat";
// noinspection ES6PreferShortImport

// this contains all the constants necessary for a graphics designer to
// come in and change the entire look of the app without knowing how to code


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

// Stylesheets: Colors
export const COLORS = {
  SURFACE: {
    backgroundColor: NAVY
  },
  PRIMARY: {
    color: NAVY
  },
  SECONDARY: {
    color: YELLOW
  },
  TERTIARY: {
    color: YELLOW
  },
}

// Stylesheets: Global
export const GLOBAL_STYLES = StyleSheet.create({
  BACKGROUND_CONTAINER: {
    flex: 1,
    ...COLORS.SURFACE,
  },
  SAFE_AREA_CONTAINER: {
    flex: 1,
    backgroundColor: NAVY,
  },
  GAME_TEXT: {
    color: YELLOW,
  },
  BUTTON_TEXT: {
    color: YELLOW,
  },
  TITLE: {
    color: PURPLE,
    fontSize: 20,
    ...FONT.MONTSERRAT_800EXTRABOLD
  },
  CAPTION: {
    color: PURPLE,
    ...FONT.MONTSERRAT_700BOLD
  },
  BODY: {
    color: PURPLE,
    ...FONT.MONTSERRAT_500MEDIUM
  }
})
