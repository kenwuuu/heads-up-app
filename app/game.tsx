import { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Text, Surface, Button, IconButton } from 'react-native-paper';
import { Stack, router } from 'expo-router';
import { Audio, AVPlaybackStatus } from 'expo-av';
import * as Haptics from 'expo-haptics';
import { DeviceMotion } from 'expo-sensors';
import { useGameStore } from '../src/zustand_state_store/gameStore';
import { 
  BUTTON_COLORS, 
  DEFAULT_READY_TEXT, 
  AUDIO_CONFIG
} from '../src/constants/constants';

// Constants for tilt detection
const TILT_THRESHOLD = 50; // degrees
const DEBOUNCE_TIME = 500; // milliseconds

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

  const [lastActionTime, setLastActionTime] = useState(0);
  const [currentTilt, setCurrentTilt] = useState(0);

  // Initialize audio and motion sensors
  useEffect(() => {
    Audio.setAudioModeAsync({
      staysActiveInBackground: AUDIO_CONFIG.STAYS_ACTIVE_IN_BACKGROUND,
    });

    // Start listening to DeviceMotion updates
    DeviceMotion.setUpdateInterval(100); // Update every 100ms
    const subscription = DeviceMotion.addListener(({ rotation }) => {
      // Convert radians to degrees and get the tilt angle
      // When phone is held on left edge, we use beta rotation (around X-axis)
      const tiltDegrees = ((rotation.gamma * 180) / Math.PI) + 90;
      setCurrentTilt(tiltDegrees);

      const now = Date.now();
      if (now - lastActionTime < DEBOUNCE_TIME) return;

      // Check for tilt thresholds
      if (tiltDegrees >= TILT_THRESHOLD) {
        handleCorrect();
        setLastActionTime(now);
      } else if (tiltDegrees <= -TILT_THRESHOLD) {
        handleIncorrect();
        setLastActionTime(now);
      }
    });

    return () => {
      subscription.remove();
    };
  }, [lastActionTime]);

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
      router.replace({
        pathname: '/results',
        params: { score }
      });
    }
  }, [timeLeft, isPlaying, score]);

  // Handle correct/incorrect with sound and haptics
  const handleCorrect = async () => {
    const isCorrect = true;
    await Promise.all([
      playSound(isCorrect),
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success)
    ]);
    markCorrect();
  };

  const handleIncorrect = async () => {
    const isCorrect = false;
    await Promise.all([
      playSound(isCorrect),
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error)
    ]);
    markIncorrect();
  };


  // Visual tilt indicator
  const getTiltIndicator = () => {
    if (Math.abs(currentTilt) < 10) return "Neutral";
    if (currentTilt >= TILT_THRESHOLD) return "✓ Correct!";
    if (currentTilt <= -TILT_THRESHOLD) return "✗ Pass!";
    return currentTilt > 0 ? "Tilting Up..." : "Tilting Down...";
  };

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: 'Play' }} />
      <IconButton
        icon="home"
        iconColor="#f4511e"
        size={30}
        style={styles.homeButton}
        onPress={() => {
          endGame();
          router.navigate('/');
        }}
      />
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
      <Text 
        variant="titleMedium" 
        style={[
          styles.tiltIndicator,
          currentTilt >= TILT_THRESHOLD && styles.correctTilt,
          currentTilt <= -TILT_THRESHOLD && styles.incorrectTilt
        ]}
      >
        {getTiltIndicator()}
      </Text>
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
  homeButton: {
    position: 'absolute',
    left: 10,
    top: 10,
    backgroundColor: 'white',
    borderRadius: 20,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
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
  tiltIndicator: {
    marginBottom: 40,
    fontWeight: 'bold',
  },
  correctTilt: {
    color: BUTTON_COLORS.CORRECT,
  },
  incorrectTilt: {
    color: BUTTON_COLORS.INCORRECT,
  },
}); 