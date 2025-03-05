import { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { Text, Surface, Button } from 'react-native-paper';
import { Stack, router } from 'expo-router';
import { Audio, AVPlaybackStatus } from 'expo-av';
import { useGameStore } from '../src/zustand_state_store/gameStore';
import { 
  BUTTON_COLORS, 
  DEFAULT_READY_TEXT, 
  AUDIO_CONFIG
} from '../src/constants/constants';

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

  // Initialize audio
  useEffect(() => {
    Audio.setAudioModeAsync({
      playsInSilentModeIOS: AUDIO_CONFIG.PLAYS_IN_SILENT_MODE_IOS,
      staysActiveInBackground: AUDIO_CONFIG.STAYS_ACTIVE_IN_BACKGROUND,
    });
  }, []);

  // Sound feedback function
  const playSound = async (isCorrect: boolean) => {
    try {
      const soundObject = new Audio.Sound();
      const soundFile = isCorrect
        ? require('../assets/sounds/correct.mp3')
        : require('../assets/sounds/incorrect.mp3');
        
      await soundObject.loadAsync(soundFile);
      await soundObject.playAsync();
      // Unload sound after playing
      soundObject.setOnPlaybackStatusUpdate(async (status: AVPlaybackStatus) => {
        if ('didJustFinish' in status && status.didJustFinish) {
          await soundObject.unloadAsync();
        }
      });
    } catch (error) {
      console.log('Error playing sound:', error);
    }
  };

  // Timer effect
  useEffect(() => {
    if (timeLeft > 0 && isPlaying) {
      const timer = setInterval(() => {
        useGameStore.setState((state) => ({ timeLeft: state.timeLeft - 1 }));
      }, 1000);
      return () => clearInterval(timer);
    } else if (timeLeft === 0) {
      endGame();
      router.navigate({
        pathname: '/results',
        params: { score }
      });
    }
  }, [timeLeft, isPlaying, score]);

  // Handle correct/incorrect with sound
  const handleCorrect = async () => {
    await playSound(true);
    markCorrect();
  };

  const handleIncorrect = async () => {
    await playSound(false);
    markIncorrect();
  };

  // Temporary buttons for testing (will be replaced with gyroscope controls)
  const renderControls = () => (
    <View style={styles.controls}>
      <Button
        mode="contained"
        onPress={handleCorrect}
        style={[styles.controlButton, { backgroundColor: BUTTON_COLORS.CORRECT }]}
      >
        Correct
      </Button>
      <Button
        mode="contained"
        onPress={handleIncorrect}
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