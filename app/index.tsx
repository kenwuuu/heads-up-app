import {Dimensions, FlatList, StyleSheet, View} from 'react-native';
import {Card, FAB, Text} from 'react-native-paper';
import {router} from 'expo-router';
import {useDeckStore} from '@/src/zustand_state_store/deckStore';
import {useGameStore} from '@/src/zustand_state_store/gameStore';
import {Deck} from '@/decks/decks';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  GRID_COLUMN_COUNT,
  GRID_SPACING,
  GRID_SPACING_MULTIPLIER,
  SELECTED_CARD_STYLES
} from '@/src/constants/constants';

const screenWidth = Dimensions.get('window').width;
const cardWidth = (screenWidth - (GRID_COLUMN_COUNT + 1) * GRID_SPACING * 2) / GRID_COLUMN_COUNT;

export default function HomeScreen() {
  const decks = useDeckStore((state) => state.decks);
  const selectedDeck = useGameStore((state) => state.selectedDeck);
  const setSelectedDeck = useGameStore((state) => state.setSelectedDeck);
  const startGame = useGameStore((state) => state.startGame);

  const handleStartGame = () => {
    if (selectedDeck) {
      startGame(selectedDeck);
      router.push('/game');
    }
  };

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
    <SafeAreaView style={styles.safeAreaContainer} edges={['top']}>
      <View style={styles.container}>
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
              Heads Up!
            </Text>
          }
        />
        <FAB
          icon="play"
          style={styles.fab}
          onPress={handleStartGame}
          disabled={!selectedDeck}
          label="Start Game"
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
  },
  safeAreaContainer: {
    flex: 1,
  },
  flatList: {
    paddingHorizontal: GRID_SPACING * GRID_SPACING_MULTIPLIER.SMALL,
  },
  title: {
    textAlign: 'center',
    marginBottom: GRID_SPACING * GRID_SPACING_MULTIPLIER.MEDIUM,
    marginTop: GRID_SPACING * GRID_SPACING_MULTIPLIER.SMALL,
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
  },
  selectedCard: {
    backgroundColor: SELECTED_CARD_STYLES.BACKGROUND_COLOR,
    borderColor: SELECTED_CARD_STYLES.BORDER_COLOR,
    borderWidth: SELECTED_CARD_STYLES.BORDER_WIDTH,
  },
  cardTitle: {
    marginBottom: 4,
  },
  cardDescription: {
    marginBottom: 4,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    alignSelf: 'center',
    bottom: 0,
  },
});
