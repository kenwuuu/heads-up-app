import {Dimensions, FlatList, View} from 'react-native';
import {Card, FAB, Text} from 'react-native-paper';
import {useDeckStore} from '@/src/zustand_state_store/deckStore';
import {useGameStore} from '@/src/zustand_state_store/gameStore';
import {Deck} from '@/decks/decks';
import {SafeAreaView} from 'react-native-safe-area-context';
import {APP_NAME, GRID_COLUMN_COUNT, GRID_SPACING} from '@/src/constants/constants';
import {handleStartGame} from "@/app/gameUtils";
import {homescreenStyles, styleSheet} from "@/src/constants/stylingConstants";
import {
  Montserrat_100Thin,
  Montserrat_100Thin_Italic,
  Montserrat_200ExtraLight,
  Montserrat_200ExtraLight_Italic,
  Montserrat_300Light,
  Montserrat_300Light_Italic,
  Montserrat_400Regular,
  Montserrat_400Regular_Italic,
  Montserrat_500Medium,
  Montserrat_500Medium_Italic,
  Montserrat_600SemiBold,
  Montserrat_600SemiBold_Italic,
  Montserrat_700Bold,
  Montserrat_700Bold_Italic,
  Montserrat_800ExtraBold,
  Montserrat_800ExtraBold_Italic,
  Montserrat_900Black,
  Montserrat_900Black_Italic,
  useFonts,
} from '@expo-google-fonts/montserrat';

const screenWidth = Dimensions.get('window').width;
export const cardWidth = (screenWidth - (GRID_COLUMN_COUNT + 1) * GRID_SPACING * 2) / GRID_COLUMN_COUNT;

export default function HomeScreen() {
  const decks = useDeckStore((state) => state.decks);
  const selectedDeck = useGameStore((state) => state.selectedDeck);
  const setSelectedDeck = useGameStore((state) => state.setSelectedDeck);
  const startGame = useGameStore((state) => state.startGame);
  let [fontsLoaded] = useFonts({
    Montserrat_100Thin,
    Montserrat_200ExtraLight,
    Montserrat_300Light,
    Montserrat_400Regular,
    Montserrat_500Medium,
    Montserrat_600SemiBold,
    Montserrat_700Bold,
    Montserrat_800ExtraBold,
    Montserrat_900Black,
    Montserrat_100Thin_Italic,
    Montserrat_200ExtraLight_Italic,
    Montserrat_300Light_Italic,
    Montserrat_400Regular_Italic,
    Montserrat_500Medium_Italic,
    Montserrat_600SemiBold_Italic,
    Montserrat_700Bold_Italic,
    Montserrat_800ExtraBold_Italic,
    Montserrat_900Black_Italic,
  });

  const renderDeckCard = ({ item: deck }: { item: Deck }) => (
    <Card
      style={[
        homescreenStyles.card,
        selectedDeck?.id === deck.id && homescreenStyles.selectedCard,
      ]}
      onPress={() => setSelectedDeck(deck)}
    >
      <Card.Content style={homescreenStyles.cardContent}>
        <Text style={homescreenStyles.cardTitle}>
          {deck.title}
        </Text>
        <Text style={homescreenStyles.cardDeckLength}>
          {deck.words.length} words
        </Text>
        <Text variant="bodySmall" numberOfLines={2} style={homescreenStyles.cardDeckDescription}>
          {deck.description}
        </Text>
      </Card.Content>
    </Card>
  );

  return (
    <SafeAreaView style={styleSheet.SAFE_AREA_CONTAINER} edges={['top']}>
      <View style={styleSheet.BACKGROUND_CONTAINER}>
        <FlatList
          data={decks}
          renderItem={renderDeckCard}
          keyExtractor={(item) => item.id}
          numColumns={GRID_COLUMN_COUNT}
          columnWrapperStyle={homescreenStyles.row}
          contentContainerStyle={homescreenStyles.grid}
          style={homescreenStyles.flatList}
          ListHeaderComponent={
            <Text variant="headlineLarge" style={homescreenStyles.appTitle}>
              {APP_NAME}
            </Text>
          }
        />
        <FAB
          icon="play"
          style={homescreenStyles.fab}
          onPress={() => {
            handleStartGame(selectedDeck, startGame)
          }}
          disabled={!selectedDeck}
          label="Start Game"
        />
      </View>
    </SafeAreaView>
  );
}

