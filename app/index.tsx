import { StyleSheet, View, FlatList, Dimensions } from 'react-native';
import { Button, Text, Card, Surface, IconButton } from 'react-native-paper';
import { Stack, router } from 'expo-router';
import { useDeckStore } from '../src/zustand_state_store/deckStore';
import { useGameStore } from '../src/zustand_state_store/gameStore';
import { Deck } from '../src/mock/decks';
import { 
  GRID_COLUMN_COUNT, 
  GRID_SPACING, 
  GRID_SPACING_MULTIPLIER,
  SELECTED_CARD_STYLES 
} from '../src/constants/constants';

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
    <View style={styles.container}>
      <Stack.Screen 
        options={{ 
          title: 'Heads Up!',
          headerRight: () => (
            <IconButton
              icon="cog"
              onPress={() => router.push('/settings')}
            />
          ),
        }} 
      />
      <Text variant="headlineLarge" style={styles.title}>
        Heads Up!
      </Text>

      <FlatList
        data={decks}
        renderItem={renderDeckCard}
        keyExtractor={(item) => item.id}
        numColumns={GRID_COLUMN_COUNT}
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
    padding: GRID_SPACING * GRID_SPACING_MULTIPLIER.SMALL,
  },
  title: {
    textAlign: 'center',
    marginBottom: GRID_SPACING * GRID_SPACING_MULTIPLIER.MEDIUM,
  },
  grid: {
    paddingBottom: GRID_SPACING * GRID_SPACING_MULTIPLIER.SMALL,
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
    
    // BACKGROUND_COLOR: '#e8f0fe',
    // BORDER_COLOR: '#1a73e8',
  // BORDER_WIDTH: 2,
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
    gap: GRID_SPACING,
  },
  button: {
    width: '100%',
  },
});
