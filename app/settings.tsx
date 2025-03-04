import { StyleSheet, View } from 'react-native';
import { Button, Text, TextInput, Portal, Modal } from 'react-native-paper';
import { Stack, router } from 'expo-router';
import { useGameStore } from '../src/zustand_state_store/gameStore';
import { useState } from 'react';

export default function SettingsScreen() {
  const gameDuration = useGameStore((state) => state.gameDuration);
  const setGameDuration = useGameStore((state) => state.setGameDuration);
  const [durationInput, setDurationInput] = useState(gameDuration.toString());

  const handleSave = () => {
    const duration = parseInt(durationInput, 10);
    if (!isNaN(duration) && duration > 0) {
      setGameDuration(duration);
    }
    router.back();
  };

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: 'Game Settings' }} />
      
      <View style={styles.section}>
        <Text variant="titleMedium" style={styles.sectionTitle}>
          Game Duration
        </Text>
        <TextInput
          label="Seconds"
          value={durationInput}
          onChangeText={setDurationInput}
          keyboardType="number-pad"
          style={styles.input}
        />
        <Text variant="bodySmall" style={styles.hint}>
          Enter the number of seconds for each round (minimum: 1s)
        </Text>
      </View>

      <View style={styles.buttonContainer}>
        <Button
          mode="contained"
          onPress={handleSave}
          style={styles.button}
          disabled={
            isNaN(parseInt(durationInput, 10)) ||
            parseInt(durationInput, 10) <= 1
          }
        >
          Save Settings
        </Button>
        <Button
          mode="outlined"
          onPress={() => router.back()}
          style={styles.button}
        >
          Cancel
        </Button>
      </View>
    </View>
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
    color: '#666',
  },
  buttonContainer: {
    marginTop: 'auto',
    gap: 8,
  },
  button: {
    width: '100%',
  },
}); 