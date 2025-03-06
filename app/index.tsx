import {Dimensions, FlatList, StyleSheet, View} from 'react-native';
import {Button, Card, IconButton, Text} from 'react-native-paper';
import {router, Stack} from 'expo-router';
import {useDeckStore} from '@/src/zustand_state_store/deckStore';
import {useGameStore} from '@/src/zustand_state_store/gameStore';
import {Deck} from '@/src/mock/decks';
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

      {/* Card List - Scroll View */}
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
    paddingBottom: 0,
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
  buttonContainer: {
    marginTop: 'auto',
    paddingHorizontal: GRID_SPACING * GRID_SPACING_MULTIPLIER.MEDIUM,
    paddingTop: GRID_SPACING * GRID_SPACING_MULTIPLIER.SMALL,
    paddingBottom: GRID_SPACING * GRID_SPACING_MULTIPLIER.MEDIUM, // Adds padding from bottom
    gap: GRID_SPACING,
    backgroundColor: 'transparent',
    borderTopWidth: 1,
    borderTopColor: 'rgba(0, 0, 0, 0.1)',
  },
  button: {
    width: '100%',
  },
});
