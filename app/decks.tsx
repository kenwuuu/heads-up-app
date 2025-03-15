import {FlatList, StyleSheet, View} from 'react-native';
import {Button, FAB, Icon, List} from 'react-native-paper';
import {router, Stack} from 'expo-router';
import {useDeckStore} from '../src/zustand_state_store/deckStore';
import {SafeAreaView} from "react-native-safe-area-context";
import {FONT, styleSheet} from "@/src/constants/stylingConstants";

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
              titleStyle={[styleSheet.TITLE, styles.deckTitleSize]}
              description={`${item.words.length} words • ${item.description}`}
              descriptionStyle={styleSheet.BODY}
              right={(props) => (
                <View style={{flexDirection: 'row', marginRight: -10, alignItems: 'center'}}>
                  <Button
                    {...props}
                    icon={({size, color}) => (
                      <Icon source="playlist-edit" size={size * 1.5} color={color}/>
                    )}
                    onPress={() => router.push(`/edit-deck?deckId=${item.id}`)}
                    style={{marginRight: 0}}
                    labelStyle={[FONT.MONTSERRAT_700BOLD, styleSheet.BUTTON_TEXT]}
                  >
                    {''}
                  </Button>
                  <Button
                    {...props}
                    icon={({size, color}) => (
                      <Icon source="trash-can" size={size * 1.5} color={color}/>
                    )}
                    onPress={() => deleteDeck(item.id)}
                    labelStyle={[FONT.MONTSERRAT_700BOLD, styleSheet.BUTTON_TEXT]}
                    style={{marginRight: 0}}
                  >
                    {''}
                  </Button>
                </View>
              )}
            />
          )}
        />
        <FAB
          icon="plus"
          style={styles.fab}
          onPress={() => router.push('/edit-deck')}
          label="New Deck"
        />
      </View>
    </SafeAreaView>
  );
}

export const styles = StyleSheet.create({
  deckTitleSize: {
    fontSize: 18,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    alignSelf: 'center',
    bottom: 0,
  },
});