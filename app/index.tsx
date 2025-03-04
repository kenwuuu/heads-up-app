import { StyleSheet, View } from 'react-native';
import { Button, Text, SegmentedButtons } from 'react-native-paper';
import { Stack, router } from 'expo-router';
import { useDeckStore } from '../src/zustand_state_store/deckStore';
import { useGameStore } from '../src/zustand_state_store/gameStore';

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

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: 'Heads Up!' }} />
      <Text variant="headlineLarge" style={styles.title}>
        Heads Up!
      </Text>
      
      <View style={styles.deckSelection}>
        <Text variant="titleMedium" style={styles.subtitle}>
          Select a Deck
        </Text>
        <SegmentedButtons
          value={selectedDeck?.id || ''}
          onValueChange={(value) => {
            const deck = decks.find((d) => d.id === value);
            if (deck) setSelectedDeck(deck);
          }}
          buttons={decks.map((deck) => ({
            value: deck.id,
            label: deck.title,
          }))}
        />
      </View>

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
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    marginBottom: 40,
  },
  subtitle: {
    marginBottom: 16,
  },
  deckSelection: {
    width: '100%',
    maxWidth: 300,
    marginBottom: 40,
  },
  buttonContainer: {
    width: '100%',
    maxWidth: 300,
  },
  button: {
    marginVertical: 10,
  },
});
