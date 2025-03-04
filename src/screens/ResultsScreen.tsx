import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Text } from 'react-native-paper';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

type RootStackParamList = {
  Home: undefined;
  Game: undefined;
  Results: { score: number };
  CustomDeck: undefined;
};

type Props = NativeStackScreenProps<RootStackParamList, 'Results'>;

export default function ResultsScreen({ navigation, route }: Props) {
  const { score } = route.params;

  return (
    <View style={styles.container}>
      <Text variant="headlineLarge" style={styles.title}>
        Round Complete!
      </Text>
      <Text variant="displaySmall" style={styles.score}>
        {score} Points
      </Text>
      <View style={styles.buttonContainer}>
        <Button
          mode="contained"
          onPress={() => navigation.replace('Game')}
          style={styles.button}
        >
          Play Again
        </Button>
        <Button
          mode="outlined"
          onPress={() => navigation.navigate('Home')}
          style={styles.button}
        >
          Main Menu
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    marginBottom: 20,
  },
  score: {
    marginBottom: 40,
  },
  buttonContainer: {
    width: '100%',
    maxWidth: 300,
  },
  button: {
    marginVertical: 10,
  },
}); 