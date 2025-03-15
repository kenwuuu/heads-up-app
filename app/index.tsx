import {Dimensions, FlatList, StyleSheet, View} from 'react-native';
import {Card, FAB, Text} from 'react-native-paper';
import {useDeckStore} from '@/src/zustand_state_store/deckStore';
import {useGameStore} from '@/src/zustand_state_store/gameStore';
import {Deck} from '@/decks/decks';
import {SafeAreaView} from 'react-native-safe-area-context';
import {APP_NAME, GRID_COLUMN_COUNT, GRID_SPACING, GRID_SPACING_MULTIPLIER} from '@/src/constants/constants';
import {handleStartGame} from "@/app/gameUtils";
import {FONT, GLOBAL_STYLES, NAVY, PURPLE, YELLOW} from "@/src/constants/stylingConstants";
import {
  Montserrat_100Thin,
  Montserrat_100Thin_Italic,
  Montserrat_200ExtraLight,
  Montserrat_200ExtraLight_Italic,
  Montserrat_300Light,
  Montserrat_300Light_Italic,
  Montserrat_400Regular,
  Montserrat_400Regular_Italic,
  Montserrat_500Medium,
  Montserrat_500Medium_Italic,
  Montserrat_600SemiBold,
  Montserrat_600SemiBold_Italic,
  Montserrat_700Bold,
  Montserrat_700Bold_Italic,
  Montserrat_800ExtraBold,
  Montserrat_800ExtraBold_Italic,
  Montserrat_900Black,
  Montserrat_900Black_Italic,
  useFonts,
} from '@expo-google-fonts/montserrat';

const screenWidth = Dimensions.get('window').width;
export const cardWidth = (screenWidth - (GRID_COLUMN_COUNT + 1) * GRID_SPACING * 2) / GRID_COLUMN_COUNT;

export default function HomeScreen() {
  const decks = useDeckStore((state) => state.decks);
  const selectedDeck = useGameStore((state) => state.selectedDeck);
  const setSelectedDeck = useGameStore((state) => state.setSelectedDeck);
  const startGame = useGameStore((state) => state.startGame);
  let [fontsLoaded] = useFonts({
    Montserrat_100Thin,
    Montserrat_200ExtraLight,
    Montserrat_300Light,
    Montserrat_400Regular,
    Montserrat_500Medium,
    Montserrat_600SemiBold,
    Montserrat_700Bold,
    Montserrat_800ExtraBold,
    Montserrat_900Black,
    Montserrat_100Thin_Italic,
    Montserrat_200ExtraLight_Italic,
    Montserrat_300Light_Italic,
    Montserrat_400Regular_Italic,
    Montserrat_500Medium_Italic,
    Montserrat_600SemiBold_Italic,
    Montserrat_700Bold_Italic,
    Montserrat_800ExtraBold_Italic,
    Montserrat_900Black_Italic,
  });

  const renderDeckCard = ({ item: deck }: { item: Deck }) => (
    <Card
      style={[
        styles.card,
        selectedDeck?.id === deck.id && styles.selectedCard,
      ]}
      onPress={() => setSelectedDeck(deck)}
    >
      <Card.Content style={styles.cardContent}>
        <Text style={[GLOBAL_STYLES.TITLE, styles.cardTitleSize]}>
          {deck.title}
        </Text>
        <Text style={GLOBAL_STYLES.CAPTION}>
          {deck.words.length} words
        </Text>
        <Text variant="bodySmall" numberOfLines={2} style={[GLOBAL_STYLES.BODY, styles.cardBodyMargin]}>
          {deck.description}
        </Text>
      </Card.Content>
    </Card>
  );

  return (
    <SafeAreaView style={GLOBAL_STYLES.SAFE_AREA_CONTAINER} edges={['top']}>
      <View style={GLOBAL_STYLES.BACKGROUND_CONTAINER}>
        <FlatList
          data={decks}
          renderItem={renderDeckCard}
          keyExtractor={(item) => item.id}
          numColumns={GRID_COLUMN_COUNT}
          columnWrapperStyle={styles.row}
          contentContainerStyle={styles.grid}
          style={styles.flatList}
          ListHeaderComponent={
            <Text variant="headlineLarge" style={styles.appTitle}>
              {APP_NAME}
            </Text>
          }
        />
        <FAB
          style={styles.fab}
          onPress={() => {
            handleStartGame(selectedDeck, startGame)
          }}
          disabled={!selectedDeck}
          label="Start Game"
        />
      </View>
    </SafeAreaView>
  );
}

// Stylesheets: Home Screen - index.tsx
export const styles = StyleSheet.create({
  flatList: {
    paddingHorizontal: GRID_SPACING * GRID_SPACING_MULTIPLIER.SMALL,
  },
  appTitle: {
    textAlign: 'center',
    marginBottom: GRID_SPACING * GRID_SPACING_MULTIPLIER.SMALL,
    paddingTop: GRID_SPACING * GRID_SPACING_MULTIPLIER.MEDIUM,
    fontSize: 48,
    ...FONT.MONTSERRAT_800EXTRABOLD,
    ...GLOBAL_STYLES.GAME_TEXT
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
    borderWidth: 1.5,
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