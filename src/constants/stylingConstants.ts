import {StyleSheet} from "react-native";
import {
  Montserrat_500Medium,
  Montserrat_700Bold,
  Montserrat_800ExtraBold,
  Montserrat_900Black,
  useFonts
} from "@expo-google-fonts/montserrat";
import {GRID_SPACING, GRID_SPACING_MULTIPLIER, HINT_TEXT_COLOR} from "@/src/constants/constants";
// noinspection ES6PreferShortImport
import {cardWidth} from "@/app/index";

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
  BUTTON_TEXT: {
    color: YELLOW,
  },
  TITLE: {
    color: PURPLE,
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

// Stylesheets: General - _layout.tsx
export const HIDE_TAB_BAR = {
  display: 'none'
};
export const TAB_BAR = {
  backgroundColor: NAVY,
  borderTopWidth: 0,
};

// Stylesheets: Game - game.tsx
export const gameStyles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
    backgroundColor: PURPLE,
  },
  countdownContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  countdown: {
    paddingTop: 140,
    fontSize: 180,
    ...FONT.MONTSERRAT_800EXTRABOLD,
  },
  homeButton: {
    alignSelf: 'center',
    marginBottom: 20,
    borderRadius: 20,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    ...FONT.MONTSERRAT_700BOLD,
  },
  gameTimer: {
    paddingTop: 36,
    fontSize: 48,
    ...FONT.MONTSERRAT_500MEDIUM
  },
  wordCard: {
    padding: 40,
    width: '90%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
  },
  word: {
    paddingTop: 80,
    textAlign: 'center',
    fontSize: 100,
    ...FONT.MONTSERRAT_900BLACK,
  },
  score: {
    fontSize: 22,
    ...FONT.MONTSERRAT_800EXTRABOLD,
  },
});

// Stylesheets: Home Screen - index.tsx
export const homescreenStyles = StyleSheet.create({
  flatList: {
    paddingHorizontal: GRID_SPACING * GRID_SPACING_MULTIPLIER.SMALL,
  },
  appTitle: {
    textAlign: 'center',
    marginBottom: GRID_SPACING * GRID_SPACING_MULTIPLIER.SMALL,
    paddingTop: GRID_SPACING * GRID_SPACING_MULTIPLIER.MEDIUM,
    fontSize: 48,
    ...FONT.MONTSERRAT_800EXTRABOLD,
    ...styleSheet.GAME_TEXT
  },
  grid: {
    paddingBottom: 80, // Add padding for FAB
    paddingTop: GRID_SPACING * GRID_SPACING_MULTIPLIER.SMALL,
  },
  row: {
    justifyContent: 'space-between',
    marginBottom: GRID_SPACING * GRID_SPACING_MULTIPLIER.SMALL,
  },
  card: {
    width: cardWidth,
    marginHorizontal: 0,
    backgroundColor: NAVY,
    borderColor: PURPLE,
    borderWidth: 1.5,
  },
  cardContent: {
    paddingVertical: 10,
    paddingLeft: 10,
    paddingRight: 10,
  },
  selectedCard: {
    borderColor: YELLOW,
    borderWidth: 1,
  },
  cardTitleSize: {
    fontSize: 20,
  },
  cardBodyMargin: {
    marginTop: 14,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    alignSelf: 'center',
    bottom: 0,
  },
});

// Stylesheets: Settings - settings.tsx
export const settingsStyles = StyleSheet.create({
  container: {
    padding: 16,
  },
  safeAreaContainer: {
    flex: 1,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    marginBottom: 16,
  },
  input: {
    marginBottom: 8,
  },
  hint: {
    color: HINT_TEXT_COLOR,
  },
  toggleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  toggleLabel: {
    fontSize: 16,
  },
});

// Stylesheets: Edit Decks - edit-deck.tsx
export const editDeckMenuStyles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
  },
  safeAreaContainer: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollViewContent: {
    padding: 16,
  },
  input: {
    marginBottom: 16,
  },
  sectionTitle: {
    marginBottom: 16,
  },
  wordItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: '#f5f5f5',
    marginBottom: 8,
    borderRadius: 8,
  },
  addWordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    gap: 8,
  },
  wordInput: {
    flex: 1,
  },
  buttonContainer: {
    padding: 16,
    gap: 8,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  button: {
    width: '100%',
  },
});