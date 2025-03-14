import {FlatList, View} from 'react-native';
import {Button, FAB, List} from 'react-native-paper';
import {router, Stack} from 'expo-router';
import {useDeckStore} from '../src/zustand_state_store/deckStore';
import {SafeAreaView} from "react-native-safe-area-context";
import {editDeckMenuStyles, FONT, homescreenStyles, styleSheet} from "@/src/constants/stylingConstants";

export default function DecksScreen() {
  const decks = useDeckStore((state) => state.decks);
  const deleteDeck = useDeckStore((state) => state.deleteDeck);

  return (
    <SafeAreaView style={styleSheet.SAFE_AREA_CONTAINER} edges={['top']}>
      <View style={styleSheet.BACKGROUND_CONTAINER}>
        <Stack.Screen options={{title: 'Manage Decks'}}/>
        <FlatList
          data={decks}
          keyExtractor={(item) => item.id}
          renderItem={({item}) => (
            <List.Item
              title={item.title}
              titleStyle={[styleSheet.TITLE, editDeckMenuStyles.deckTitleSize]}
              description={`${item.words.length} words • ${item.description}`}
              descriptionStyle={styleSheet.BODY}
              right={(props) => (
                <View style={{flexDirection: 'row'}}>
                  <Button
                    {...props}
                    onPress={() => router.push(`/edit-deck?deckId=${item.id}`)}
                    style={{marginRight: 8}}
                    labelStyle={[FONT.MONTSERRAT_700BOLD, styleSheet.BUTTON_TEXT]}
                  >
                    Edit
                  </Button>
                  <Button
                    {...props}
                    onPress={() => deleteDeck(item.id)}
                    labelStyle={[FONT.MONTSERRAT_700BOLD, styleSheet.BUTTON_TEXT]}
                  >
                    Delete
                  </Button>
                </View>
              )}
            />
          )}
        />
        <FAB
          icon="plus"
          style={homescreenStyles.fab}
          onPress={() => router.push('/edit-deck')}
          label="New Deck"
        />
      </View>
    </SafeAreaView>
  );
}