import React, {useCallback, useEffect, useRef} from 'react';
import {StyleSheet, View} from 'react-native';
import {Button, Text} from 'react-native-paper';
import {router, Stack, useFocusEffect} from 'expo-router';
import {Audio} from 'expo-av';
import * as Haptics from 'expo-haptics';
import {DeviceMotion} from 'expo-sensors';
import {useGameStore} from '@/src/zustand_state_store/gameStore';
import {AUDIO_CONFIG, DEFAULT_READY_TEXT,} from '@/src/constants/constants';
import {FONT, GLOBAL_STYLES, PURPLE} from '@/src/constants/stylingConstants';


// todo move this to constants file
// Constants for tilt detection
const BETA_TILT_THRESHOLD = 10; // degrees
const GAMMA_TILT_THRESHOLD = 40; // degrees
const DEBOUNCE_TIME = 1000; // milliseconds
const VERTICAL_OFFSET_DEGREES = 90;
const MILLISECONDS_PER_SECOND = 1000;
const MOTION_REFRESH_RATE = 120; // hz/fps
const MOTION_UPDATE_INTERVAL = MILLISECONDS_PER_SECOND / MOTION_REFRESH_RATE;

export default function GameScreen() {
  /**
   *   beta is X axis, if portrait phone were a graph
   *   gamma is Y axis, if portrait phone were a graph
   */
  const {
    gameTimeLeft,
    currentWord,
    score,
    isPlaying,
    markCorrect,
    markIncorrect,
    endGame,
    countdownTime,
    showCountdown,
  } = useGameStore();

  const MUTE = useGameStore((state) => state.isMuted);
  const lastActionTime = useRef(0);

  // Sound references
  const tickSoundRef = useRef(new Audio.Sound());
  const correctAnswerSoundRef = useRef(new Audio.Sound());
  const incorrectAnswerSoundRef = useRef(new Audio.Sound());

  // Load and cleanup sounds
  useEffect(() => {
    const loadSounds = async () => {
      try {
        await tickSoundRef.current.loadAsync(require('../assets/sounds/tick.wav'));
        await correctAnswerSoundRef.current.loadAsync(require('../assets/sounds/correct.mp3'));
        await incorrectAnswerSoundRef.current.loadAsync(require('../assets/sounds/incorrect.mp3'));
      } catch (error) {
        console.error('Failed to load sounds:', error);
      }
    };

    loadSounds();

    // Cleanup function
    return () => {
      const unloadSounds = async () => {
        try {
          await tickSoundRef.current.unloadAsync();
          await correctAnswerSoundRef.current.unloadAsync();
          await incorrectAnswerSoundRef.current.unloadAsync();
        } catch (error) {
          console.error('Failed to unload sounds:', error);
        }
      };
      unloadSounds();
    };
  }, []);

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

      DeviceMotion.setUpdateInterval(MOTION_UPDATE_INTERVAL);
      const subscription = DeviceMotion.addListener(({ rotation }) => {
        // Convert radians to degrees and get the tilt angle
        const degrees = 180;
        const betaTiltDegrees = ((rotation.beta * degrees) / Math.PI);
        const gammaTiltDegrees = ((rotation.gamma * degrees) / Math.PI) + VERTICAL_OFFSET_DEGREES;

        // handle debounce
        const now = Date.now();
        if (now - lastActionTime.current < DEBOUNCE_TIME) return;

        function isValidDownTilt() { // if statement helper function
          return !showCountdown &&
            gammaTiltDegrees <= -GAMMA_TILT_THRESHOLD
            && -BETA_TILT_THRESHOLD <= betaTiltDegrees
            && betaTiltDegrees <= BETA_TILT_THRESHOLD;
        }

        function isValidUpTilt() { // if statement helper function
          return !showCountdown &&
            gammaTiltDegrees >= GAMMA_TILT_THRESHOLD
            && -BETA_TILT_THRESHOLD <= betaTiltDegrees
            && betaTiltDegrees <= BETA_TILT_THRESHOLD;
        }

        // Check for tilt thresholds
        if (isValidUpTilt()) {
          handleAnswer(true, correctAnswerSoundRef.current, incorrectAnswerSoundRef.current);
          lastActionTime.current = now;
        } else if (isValidDownTilt()) {
          handleAnswer(false, correctAnswerSoundRef.current, incorrectAnswerSoundRef.current);
          lastActionTime.current = now;
        }
      });

      return () => {
        subscription.remove();
        DeviceMotion.removeAllListeners();
      };
    }, [lastActionTime, isPlaying, showCountdown])
  );

  // Timer effect
  useEffect(() => {
    if (gameTimeLeft > 0 && isPlaying && !showCountdown) {  // Only start gameTimer after countdown
      const gameTimer = setInterval(async () => {
        if (gameTimeLeft <= 6 && gameTimeLeft >= 0) {  // tick 5, 4, 3, 2, 1, 0
          if (!MUTE) {
            try {
              await tickSoundRef.current.replayAsync();
            } catch (error) {
              console.error('Failed to play tick sound:', error);
            }
          }
        }

        useGameStore.setState((state) => ({gameTimeLeft: state.gameTimeLeft - 1}));
      }, 1000);
      return () => clearInterval(gameTimer);
    } else if (gameTimeLeft === 0) {
      endGame();
      router.replace({
        pathname: '/results',
        params: { score }
      });
    }
  }, [gameTimeLeft, isPlaying, showCountdown, score]);

  // pre-game countdown effect
  useEffect(() => {
    if (showCountdown && countdownTime > 0) {
      const countdownTimer = setInterval(() => {
        useGameStore.setState((state) => ({countdownTime: state.countdownTime - 1}));
      }, 1000);

      return () => clearInterval(countdownTimer);
    } else if (countdownTime === 0) {
      useGameStore.setState(() => ({showCountdown: false}));
    }
  }, [countdownTime, showCountdown]);

  // Handle correct/incorrect with sound and haptics
  const handleAnswer = async (isCorrect: boolean, correctSound: Audio.Sound, incorrectSound: Audio.Sound) => {
    if (isCorrect) {
      if (!MUTE) {
        try {
          await correctSound.replayAsync();
        } catch (error) {
          console.error('Failed to play correct sound:', error);
        }
      }
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      markCorrect();
    } else {
      if (!MUTE) {
        try {
          await incorrectSound.replayAsync();
        } catch (error) {
          console.error('Failed to play incorrect sound:', error);
        }
      }
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
      markIncorrect();
    }
  };

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: 'Play' }} />
      {showCountdown ? (
        <View style={styles.countdownContainer}>
          <Text variant="displayLarge" style={[styles.countdown, GLOBAL_STYLES.GAME_TEXT]}>{countdownTime}</Text>
        </View>
      ) : (
        <>
          <Text variant="headlineMedium" style={[styles.gameTimer, GLOBAL_STYLES.GAME_TEXT]}>
            {gameTimeLeft}s
          </Text>
          <Text variant="headlineLarge" style={[styles.word, GLOBAL_STYLES.GAME_TEXT]}>
            {currentWord?.text || DEFAULT_READY_TEXT}
          </Text>
          <Text variant="titleLarge" style={[styles.score, GLOBAL_STYLES.GAME_TEXT]}>
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
        </>
      )}
    </View>
  );
}

// Stylesheets: Game - game.tsx
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
    backgroundColor: PURPLE,
  },
  countdownContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  countdown: {
    paddingTop: 140,
    fontSize: 180,
    ...FONT.MONTSERRAT_800EXTRABOLD,
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
    ...FONT.MONTSERRAT_700BOLD,
  },
  gameTimer: {
    paddingTop: 36,
    fontSize: 48,
    ...FONT.MONTSERRAT_500MEDIUM
  },
  wordCard: {
    padding: 40,
    width: '90%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
  },
  word: {
    paddingTop: 80,
    textAlign: 'center',
    fontSize: 100,
    ...FONT.MONTSERRAT_900BLACK,
  },
  score: {
    fontSize: 22,
    ...FONT.MONTSERRAT_800EXTRABOLD,
  },
});