import {StyleSheet, View} from 'react-native';
import {Button, Text} from 'react-native-paper';
import {router, Stack, useLocalSearchParams} from 'expo-router';
import {useGameStore} from '@/src/zustand_state_store/gameStore';
import {handleStartGame} from "@/app/gameUtils";
import {SafeAreaView} from "react-native-safe-area-context";
import {FONT, GLOBAL_STYLES, PURPLE, YELLOW} from "@/src/constants/stylingConstants";

export default function ResultsScreen() {
  const { score } = useLocalSearchParams<{ score: string }>();
  const scoreNumber = parseInt(score || '0', 10);
  const { selectedDeck, startGame } = useGameStore();

  return (
    <SafeAreaView style={GLOBAL_STYLES.SAFE_AREA_CONTAINER} edges={['top']}>
      <View style={[GLOBAL_STYLES.BACKGROUND_CONTAINER, styles.container]}>
        <Stack.Screen options={{ title: 'Round Results' }} />
        <Text variant="headlineLarge" style={[styles.title, GLOBAL_STYLES.GAME_TEXT, FONT.MONTSERRAT_800EXTRABOLD]}>
          Round Complete!
        </Text>
        <Text variant="displaySmall" style={[styles.score, GLOBAL_STYLES.GAME_TEXT, FONT.MONTSERRAT_900BLACK]}>
          {scoreNumber} Points
        </Text>
        <View style={styles.buttonContainer}>
          <Button
            mode="contained"
            onPress={() => {
              handleStartGame(selectedDeck, startGame);
            }}
            style={styles.button}
            buttonColor={PURPLE}
            textColor={YELLOW}
            labelStyle={[FONT.MONTSERRAT_800EXTRABOLD, {fontSize: 18}]}
          >
            Play Again
          </Button>
          <Button
            mode="outlined"
            onPress={() => router.replace('/')}
            style={styles.button}
            textColor={PURPLE}
            labelStyle={[FONT.MONTSERRAT_800EXTRABOLD, {fontSize: 18}]}
          >
            Main Menu
          </Button>
        </View>
      </View>
    </SafeAreaView>
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
    marginBottom: 16,
    fontSize: 36,
  },
  score: {
    paddingTop: 16,
    marginBottom: 40,
    fontSize: 48,
  },
  buttonContainer: {
    width: '100%',
    maxWidth: 300,
    gap: 8,
  },
  button: {
    marginVertical: 10,
  },
}); 