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

  const [subscription, setSubscription] = useState<any>(null);
  const [lastAction, setLastAction] = useState<number | null>(null);
  const TILT_THRESHOLD = 25; // Degrees of tilt required to trigger action
  const COOLDOWN_TIME = 1000; // Milliseconds to wait before allowing another action

  // Initialize sensors and audio
  useEffect(() => {
    DeviceMotion.setUpdateInterval(100); // Update every 100ms
    
    Audio.setAudioModeAsync({
      playsInSilentModeIOS: AUDIO_CONFIG.PLAYS_IN_SILENT_MODE_IOS,
      staysActiveInBackground: AUDIO_CONFIG.STAYS_ACTIVE_IN_BACKGROUND,
    });

    const subscription = DeviceMotion.addListener(({ rotation }) => {
      if (!isPlaying || !rotation) return;
      
      const now = Date.now();
      const beta = (rotation.beta * 180) / Math.PI; // Convert to degrees
      
      // Only allow actions if cooldown has passed
      if (lastAction && now - lastAction < COOLDOWN_TIME) return;

      // Tilting up (negative beta)
      if (beta < -TILT_THRESHOLD) {
        handleCorrect();
        setLastAction(now);
      }
      // Tilting down (positive beta)
      else if (beta > TILT_THRESHOLD) {
        handleIncorrect();
        setLastAction(now);
      }
    });

    setSubscription(subscription);

    return () => {
      subscription.remove();
    };
  }, [isPlaying, lastAction]);

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