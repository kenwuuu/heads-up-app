import { StyleSheet, View, FlatList } from 'react-native';
import { Button, Text, List, FAB } from 'react-native-paper';
import { Stack, router } from 'expo-router';
import { useDeckStore } from '../src/zustand_state_store/deckStore';

export default function DecksScreen() {
  const decks = useDeckStore((state) => state.decks);
  const deleteDeck = useDeckStore((state) => state.deleteDeck);

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: 'Manage Decks' }} />
      <FlatList
        data={decks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <List.Item
            title={item.title}
            description={`${item.words.length} words • ${item.description}`}
            right={(props) => (
              <View style={{ flexDirection: 'row' }}>
                <Button
                  {...props}
                  onPress={() => router.push(`/edit-deck?deckId=${item.id}`)}
                  style={{ marginRight: 8 }}
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
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
}); 