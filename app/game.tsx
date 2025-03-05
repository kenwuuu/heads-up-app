import { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { Text, Surface, Button } from 'react-native-paper';
import { Stack, router } from 'expo-router';
import { useGameStore } from '../src/zustand_state_store/gameStore';
import { BUTTON_COLORS, DEFAULT_READY_TEXT } from '../src/constants/constants';

export default function GameScreen() {
  const { 
    timeLeft,
    currentWord,
    score,
    isPlaying,
    markCorrect,
    markIncorrect,
    endGame
  } = useGameStore();

  // Timer effect
  useEffect(() => {
    if (timeLeft > 0 && isPlaying) {
      const timer = setInterval(() => {
        useGameStore.setState((state) => ({ timeLeft: state.timeLeft - 1 }));
      }, 1000);
      return () => clearInterval(timer);
    } else if (timeLeft === 0) {
      endGame();
      router.replace({
        pathname: '/results',
        params: { score }
      });
    }
  }, [timeLeft, isPlaying, score]);

  // Temporary buttons for testing (will be replaced with gyroscope controls)
  const renderControls = () => (
    <View style={styles.controls}>
      <Button
        mode="contained"
        onPress={markCorrect}
        style={[styles.controlButton, { backgroundColor: BUTTON_COLORS.CORRECT }]}
      >
        Correct
      </Button>
      <Button
        mode="contained"
        onPress={markIncorrect}
        style={[styles.controlButton, { backgroundColor: BUTTON_COLORS.INCORRECT }]}
      >
        Pass
      </Button>
    </View>
  );

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: 'Play' }} />
      <Text variant="headlineMedium" style={styles.timer}>
        {timeLeft}s
      </Text>
      <Surface style={styles.wordCard} elevation={4}>
        <Text variant="headlineLarge" style={styles.word}>
          {currentWord?.text || DEFAULT_READY_TEXT}
        </Text>
      </Surface>
      <Text variant="titleLarge" style={styles.score}>
        Score: {score}
      </Text>
      {renderControls()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
  },
  timer: {
    marginTop: 20,
  },
  wordCard: {
    padding: 40,
    width: '90%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
  },
  word: {
    textAlign: 'center',
  },
  score: {
    marginBottom: 20,
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 20,
  },
  controlButton: {
    width: '45%',
  },
}); 