import {FlatList, StyleSheet, View} from 'react-native';
import {Button, FAB, List} from 'react-native-paper';
import {router, Stack} from 'expo-router';
import {useDeckStore} from '../src/zustand_state_store/deckStore';
import {SafeAreaView} from "react-native-safe-area-context";

export default function DecksScreen() {
  const decks = useDeckStore((state) => state.decks);
  const deleteDeck = useDeckStore((state) => state.deleteDeck);

  return (
    <SafeAreaView style={styles.safeAreaContainer} edges={['top']}>
      <View style={styles.container}>
        <Stack.Screen options={{title: 'Manage Decks'}}/>
        <FlatList
          data={decks}
          keyExtractor={(item) => item.id}
          renderItem={({item}) => (
            <List.Item
              title={item.title}
              description={`${item.words.length} words • ${item.description}`}
              right={(props) => (
                <View style={{flexDirection: 'row'}}>
                  <Button
                    {...props}
                    onPress={() => router.push(`/edit-deck?deckId=${item.id}`)}
                    style={{marginRight: 8}}
                  >
                    Edit
                  </Button>
                  <Button {...props} onPress={() => deleteDeck(item.id)}>
                    Delete
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
  },
  safeAreaContainer: {
    flex: 1,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
}); 