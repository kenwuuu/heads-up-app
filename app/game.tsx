import {useCallback, useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {Button, Surface, Text} from 'react-native-paper';
import {router, Stack, useFocusEffect} from 'expo-router';
import {Audio, AVPlaybackStatus} from 'expo-av';
import * as Haptics from 'expo-haptics';
import {DeviceMotion} from 'expo-sensors';
import {useGameStore} from '@/src/zustand_state_store/gameStore';
import {AUDIO_CONFIG, BUTTON_COLORS, DEFAULT_READY_TEXT} from '@/src/constants/constants';

// Constants for tilt detection
const BETA_TILT_THRESHOLD = 20; // degrees
const GAMMA_TILT_THRESHOLD = 50; // degrees
const DEBOUNCE_TIME = 1000; // milliseconds

export default function GameScreen() {
  /**
   *   beta is X axis, if portrait phone were a graph
   *   gamma is Y axis, if portrait phone were a graph
   */
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

  // Initialize audio and motion sensors
  useFocusEffect(
    useCallback(() => {
      if (!isPlaying) {
        return;
      }

      Audio.setAudioModeAsync({
        playsInSilentModeIOS: AUDIO_CONFIG.PLAYS_IN_SILENT_MODE_IOS,
        staysActiveInBackground: AUDIO_CONFIG.STAYS_ACTIVE_IN_BACKGROUND,
      });

      DeviceMotion.setUpdateInterval(100); // Update every 100ms
      const subscription = DeviceMotion.addListener(({ rotation }) => {
        // Convert radians to degrees and get the tilt angle
        const betaTiltDegrees = ((rotation.beta * 180) / Math.PI);
        const gammaTiltDegrees = ((rotation.gamma * 180) / Math.PI) + 90;

        // handle debounce
        const now = Date.now();
        if (now - lastActionTime < DEBOUNCE_TIME) return;

        function isValidDownTilt() { // if statement helper function
          return gammaTiltDegrees <= -GAMMA_TILT_THRESHOLD && -BETA_TILT_THRESHOLD <= betaTiltDegrees && betaTiltDegrees <= BETA_TILT_THRESHOLD;
        }

        function isValidUpTilt() { // if statement helper function
          return gammaTiltDegrees >= GAMMA_TILT_THRESHOLD && -BETA_TILT_THRESHOLD <= betaTiltDegrees && betaTiltDegrees <= BETA_TILT_THRESHOLD;
        }

        // Check for tilt thresholds
        if (isValidUpTilt()) {
          handleCorrect();
          setLastActionTime(now);
        } else if (isValidDownTilt()) {
          handleIncorrect();
          setLastActionTime(now);
        }
      });

      return () => {
        subscription.remove();
        DeviceMotion.removeAllListeners();
        console.log('remove listeners');
      };
    }, [lastActionTime, isPlaying])
  );

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
      <Button
        mode="contained"
        icon="home"
        onPress={() => {
          endGame();
          router.navigate('/');
        }}
        style={styles.homeButton}
      >
        Home
      </Button>
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
    alignSelf: 'center',
    marginBottom: 20,
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
    fontWeight: 'bold',
  },
  correctTilt: {
    color: BUTTON_COLORS.CORRECT,
  },
  incorrectTilt: {
    color: BUTTON_COLORS.INCORRECT,
  },
}); 