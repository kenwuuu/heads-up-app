import { StyleSheet, View, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { Text, TextInput } from 'react-native-paper';
import { Stack } from 'expo-router';
import { useGameStore } from '../src/zustand_state_store/gameStore';
import { useState, useEffect } from 'react';
import { HINT_TEXT_COLOR, MINIMUM_GAME_DURATION_SECONDS } from '../src/constants/constants';

export default function SettingsScreen() {
  const gameDuration = useGameStore((state) => state.gameDuration);
  const setGameDuration = useGameStore((state) => state.setGameDuration);
  const [durationInput, setDurationInput] = useState(gameDuration.toString());

  const handleDurationChange = (text: string) => {
    setDurationInput(text);
    const duration = parseInt(text, 10);
    if (!isNaN(duration) && duration >= MINIMUM_GAME_DURATION_SECONDS) {
      setGameDuration(duration);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.container}>
        <Stack.Screen options={{ title: 'Game Settings' }} />
        
        <View style={styles.section}>
          <Text variant="titleMedium" style={styles.sectionTitle}>
            Game Duration
          </Text>
          <TextInput
            label="Seconds"
            value={durationInput}
            onChangeText={handleDurationChange}
            keyboardType="number-pad"
            style={styles.input}
            error={
              isNaN(parseInt(durationInput, 10)) ||
              parseInt(durationInput, 10) < MINIMUM_GAME_DURATION_SECONDS
            }
          />
          <Text variant="bodySmall" style={styles.hint}>
            Enter the number of seconds for each round (minimum: {MINIMUM_GAME_DURATION_SECONDS}s)
          </Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    marginBottom: 16,
  },
  input: {
    marginBottom: 8,
  },
  hint: {
    color: HINT_TEXT_COLOR,
  }
}); 