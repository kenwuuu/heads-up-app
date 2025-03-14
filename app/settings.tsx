import React, {useState} from 'react';
import {Keyboard, Switch, TouchableWithoutFeedback, View,} from 'react-native';
import {Text, TextInput} from 'react-native-paper';
import {Stack} from 'expo-router';
import {useGameStore} from '../src/zustand_state_store/gameStore';
import {MINIMUM_GAME_DURATION_SECONDS} from '../src/constants/constants';
import {SafeAreaView} from 'react-native-safe-area-context';
import {settingsStyles, styleSheet} from "@/src/constants/stylingConstants";

export default function SettingsScreen() {
  const gameDuration = useGameStore((state) => state.gameDuration);
  const setGameDuration = useGameStore((state) => state.setGameDuration);
  const isMuted = useGameStore((state) => state.isMuted);
  const toggleMute = useGameStore((state) => state.toggleMute);
  const [durationInput, setDurationInput] = useState(gameDuration.toString());

  const handleDurationChange = (text: string) => {
    setDurationInput(text);
    const duration = parseInt(text, 10);
    if (!isNaN(duration) && duration >= MINIMUM_GAME_DURATION_SECONDS) {
      setGameDuration(duration);
    }
  };

  const handleMuteChange = (value: boolean) => {
    toggleMute();
  }

  return (
    <SafeAreaView style={styleSheet.SAFE_AREA_CONTAINER} edges={['top']}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={[styleSheet.BACKGROUND_CONTAINER, settingsStyles.container]}>
          <Stack.Screen options={{title: 'Game Settings'}}/>

          {/* Game Duration Section */}
          <View style={settingsStyles.section}>
            <Text variant="titleMedium" style={settingsStyles.sectionTitle}>
              Game Duration
            </Text>
            <TextInput
              label="Seconds"
              value={durationInput}
              onChangeText={handleDurationChange}
              keyboardType="number-pad"
              style={settingsStyles.input}
              error={
                isNaN(parseInt(durationInput, 10)) ||
                parseInt(durationInput, 10) < MINIMUM_GAME_DURATION_SECONDS
              }
            />
            <Text variant="bodySmall" style={settingsStyles.hint}>
              Enter the number of seconds for each round (minimum: {MINIMUM_GAME_DURATION_SECONDS}s)
            </Text>
          </View>

          {/* Audio Mute Section */}
          <View style={settingsStyles.section}>
            <Text variant="titleMedium" style={settingsStyles.sectionTitle}>
              Mute Game Audio
            </Text>
            <View style={settingsStyles.toggleContainer}>
              <Text style={settingsStyles.toggleLabel}>
                {isMuted ? 'Muted' : 'Unmuted'}
              </Text>
              <Switch
                value={isMuted}
                onValueChange={handleMuteChange}
              />
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
}

