import { StyleSheet, View, FlatList, Dimensions } from 'react-native';
import { Button, Text, Card, Surface } from 'react-native-paper';
import { Stack, router } from 'expo-router';
import { useDeckStore } from '../src/zustand_state_store/deckStore';
import { useGameStore } from '../src/zustand_state_store/gameStore';
import { Deck } from '../src/mock/decks';

const COLUMN_COUNT = 2;
const SPACING = 8;
const screenWidth = Dimensions.get('window').width;
const cardWidth = (screenWidth - (COLUMN_COUNT + 1) * SPACING * 2) / COLUMN_COUNT;

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
    <View style={styles.container}>
      <Stack.Screen options={{ title: 'Heads Up!' }} />
      <Text variant="headlineLarge" style={styles.title}>
        Heads Up!
      </Text>

      <FlatList
        data={decks}
        renderItem={renderDeckCard}
        keyExtractor={(item) => item.id}
        numColumns={COLUMN_COUNT}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.grid}
      />

      <View style={styles.buttonContainer}>
        <Button
          mode="contained"
          onPress={handleStartGame}
          style={styles.button}
          disabled={!selectedDeck}
        >
          Start Game
        </Button>
        <Button
          mode="outlined"
          onPress={() => router.push('/decks')}
          style={styles.button}
        >
          Manage Decks
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: SPACING * 2,
  },
  title: {
    textAlign: 'center',
    marginBottom: SPACING * 4,
  },
  grid: {
    paddingBottom: SPACING * 2,
  },
  row: {
    justifyContent: 'space-between',
    marginBottom: SPACING * 2,
  },
  card: {
    width: cardWidth,
    marginHorizontal: 0,
  },
  selectedCard: {
    backgroundColor: '#e8f0fe',
    borderColor: '#1a73e8',
    borderWidth: 2,
  },
  cardTitle: {
    marginBottom: 4,
  },
  cardDescription: {
    marginBottom: 4,
  },
  buttonContainer: {
    marginTop: 'auto',
    gap: SPACING,
  },
  button: {
    width: '100%',
  },
});
