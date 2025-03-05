import { StyleSheet, View } from 'react-native';
import { Button, Text } from 'react-native-paper';
import { Stack, router, useLocalSearchParams } from 'expo-router';
import { useGameStore } from '../src/zustand_state_store/gameStore';

export default function ResultsScreen() {
  const { score } = useLocalSearchParams<{ score: string }>();
  const scoreNumber = parseInt(score || '0', 10);
  const { selectedDeck, startGame } = useGameStore();

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: 'Round Results' }} />
      <Text variant="headlineLarge" style={styles.title}>
        Round Complete!
      </Text>
      <Text variant="displaySmall" style={styles.score}>
        {scoreNumber} Points
      </Text>
      <View style={styles.buttonContainer}>
        <Button
          mode="contained"
          onPress={() => {
            if (selectedDeck) {
              startGame(selectedDeck);
              router.replace('/game');
            }
          }}
          style={styles.button}
        >
          Play Again
        </Button>
        <Button
          mode="outlined"
          onPress={() => router.replace('/')}
          style={styles.button}
        >
          Main Menu
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
    marginBottom: 20,
  },
  score: {
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