import React, { useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { Text, Surface } from 'react-native-paper';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

type RootStackParamList = {
  Home: undefined;
  Game: undefined;
  Results: { score: number };
  CustomDeck: undefined;
};

type Props = NativeStackScreenProps<RootStackParamList, 'Game'>;

export default function GameScreen({ navigation }: Props) {
  const [timeLeft, setTimeLeft] = useState(60);
  const [currentWord, setCurrentWord] = useState('Ready?');
  const [score, setScore] = useState(0);

  // Timer effect
  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      navigation.replace('Results', { score });
    }
  }, [timeLeft, navigation, score]);

  return (
    <View style={styles.container}>
      <Text variant="headlineMedium" style={styles.timer}>
        {timeLeft}s
      </Text>
      <Surface style={styles.wordCard} elevation={4}>
        <Text variant="headlineLarge" style={styles.word}>
          {currentWord}
        </Text>
      </Surface>
      <Text variant="titleLarge" style={styles.score}>
        Score: {score}
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
    marginBottom: 40,
  },
}); 