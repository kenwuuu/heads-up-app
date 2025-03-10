import React, {useCallback, useEffect, useState} from 'react';
import {View} from 'react-native';
import {Button, Text} from 'react-native-paper';
import {router, Stack, useFocusEffect} from 'expo-router';
import {Audio} from 'expo-av';
import * as Haptics from 'expo-haptics';
import {DeviceMotion} from 'expo-sensors';
import {useGameStore} from '@/src/zustand_state_store/gameStore';
import {AUDIO_CONFIG, DEFAULT_READY_TEXT,} from '@/src/constants/constants';
import {styles, styleSheet} from '@/src/constants/stylingConstants';


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

  const [lastActionTime, setLastActionTime] = useState(0);

  // load sounds. there has got to be a better way to do this lol
  const tickSoundObject = new Audio.Sound();
  const correctAnswerSoundObject = new Audio.Sound();
  const incorrectAnswerSoundObject = new Audio.Sound();
  const tickSoundFile = require('../assets/sounds/tick.wav');
  const correctAnswerSoundFile = require('../assets/sounds/correct.mp3');
  const incorrectAnswerSoundFile = require('../assets/sounds/incorrect.mp3');
  tickSoundObject.loadAsync(tickSoundFile);
  correctAnswerSoundObject.loadAsync(correctAnswerSoundFile);
  incorrectAnswerSoundObject.loadAsync(incorrectAnswerSoundFile);

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
        if (now - lastActionTime < DEBOUNCE_TIME) return;

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
          handleAnswer(true, correctAnswerSoundObject, incorrectAnswerSoundObject);
          setLastActionTime(now);
        } else if (isValidDownTilt()) {
          handleAnswer(false, correctAnswerSoundObject, incorrectAnswerSoundObject);
          setLastActionTime(now);
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
            tickSoundObject.playAsync();
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

  // Countdown effect
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
  const handleAnswer = (isCorrect: boolean, correctSound: Audio.Sound, incorrectSound: Audio.Sound) => {
    if (isCorrect) {
      if (!MUTE) {
        correctSound.playAsync()
      }
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success)
      markCorrect();
    } else {
      if (!MUTE) {
        incorrectSound.playAsync()
      }
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error)
      markIncorrect();
    }
  };

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: 'Play' }} />
      {showCountdown ? (
        <View style={styles.countdownContainer}>
          <Text variant="displayLarge" style={[styles.countdown, styleSheet.GAME_TEXT]}>{countdownTime}</Text>
        </View>
      ) : (
        <>
          <Text variant="headlineMedium" style={[styles.gameTimer, styleSheet.GAME_TEXT]}>
            {gameTimeLeft}s
          </Text>
          <Text variant="headlineLarge" style={[styles.word, styleSheet.GAME_TEXT]}>
            {currentWord?.text || DEFAULT_READY_TEXT}
          </Text>
          <Text variant="titleLarge" style={[styles.score, styleSheet.GAME_TEXT]}>
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
