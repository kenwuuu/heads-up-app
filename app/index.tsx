import {Dimensions, FlatList, StyleSheet, View} from 'react-native';
import {Card, FAB, Text} from 'react-native-paper';
import {useDeckStore} from '@/src/zustand_state_store/deckStore';
import {useGameStore} from '@/src/zustand_state_store/gameStore';
import {Deck} from '@/decks/decks';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  APP_NAME,
  GRID_COLUMN_COUNT,
  GRID_SPACING,
  GRID_SPACING_MULTIPLIER,
  SELECTED_CARD_STYLES
} from '@/src/constants/constants';
import {handleStartGame} from "@/app/gameUtils";
import {NAVY, PURPLE, styleSheet, YELLOW} from "@/src/constants/stylingConstants";

const screenWidth = Dimensions.get('window').width;
const cardWidth = (screenWidth - (GRID_COLUMN_COUNT + 1) * GRID_SPACING * 2) / GRID_COLUMN_COUNT;

export default function HomeScreen() {
  const decks = useDeckStore((state) => state.decks);
  const selectedDeck = useGameStore((state) => state.selectedDeck);
  const setSelectedDeck = useGameStore((state) => state.setSelectedDeck);
  const startGame = useGameStore((state) => state.startGame);


  const renderDeckCard = ({ item: deck }: { item: Deck }) => (
    <Card
      style={[
        styles.card,
        selectedDeck?.id === deck.id && styles.selectedCard,
      ]}
      onPress={() => setSelectedDeck(deck)}
    >
      <Card.Content>
        <Text variant="titleMedium" style={styles.cardTitle}>
          {deck.title}
        </Text>
        <Text variant="bodyMedium" style={styles.cardDescription}>
          {deck.words.length} words
        </Text>
        <Text variant="bodySmall" numberOfLines={2} style={styles.cardDescription}>
          {deck.description}
        </Text>
      </Card.Content>
    </Card>
  );

  return (
    <SafeAreaView style={styleSheet.SAFE_AREA_CONTAINER} edges={['top']}>
      <View style={styleSheet.BACKGROUND_CONTAINER}>
        <FlatList
          data={decks}
          renderItem={renderDeckCard}
          keyExtractor={(item) => item.id}
          numColumns={GRID_COLUMN_COUNT}
          columnWrapperStyle={styles.row}
          contentContainerStyle={styles.grid}
          style={styles.flatList}
          ListHeaderComponent={
            <Text variant="headlineLarge" style={styles.title}>
              {APP_NAME}
            </Text>
          }
        />
        <FAB
          icon="play"
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

const styles = StyleSheet.create({
  flatList: {
    paddingHorizontal: GRID_SPACING * GRID_SPACING_MULTIPLIER.SMALL,
  },
  title: {
    textAlign: 'center',
    marginBottom: GRID_SPACING * GRID_SPACING_MULTIPLIER.MEDIUM,
    marginTop: GRID_SPACING * GRID_SPACING_MULTIPLIER.SMALL,
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
    borderWidth: 2,
  },
  selectedCard: {
    borderColor: YELLOW,
    borderWidth: SELECTED_CARD_STYLES.BORDER_WIDTH,
  },
  cardTitle: {
    marginBottom: 4,
    ...styleSheet.DECK_CARD_TEXT,
  },
  cardDescription: {
    marginBottom: 4,
    ...styleSheet.DECK_CARD_TEXT,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    alignSelf: 'center',
    bottom: 0,
  },
});
