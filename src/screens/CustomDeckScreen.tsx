import React from 'react';
import { StyleSheet, View, FlatList } from 'react-native';
import { Button, Text, List, FAB } from 'react-native-paper';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

type RootStackParamList = {
  Home: undefined;
  Game: undefined;
  Results: { score: number };
  CustomDeck: undefined;
};

type Props = NativeStackScreenProps<RootStackParamList, 'CustomDeck'>;

// Temporary mock data
const mockDecks = [
  { id: '1', title: 'Movies', wordCount: 20 },
  { id: '2', title: 'Animals', wordCount: 15 },
  { id: '3', title: 'Countries', wordCount: 25 },
];

export default function CustomDeckScreen({ navigation }: Props) {
  return (
    <View style={styles.container}>
      <FlatList
        data={mockDecks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <List.Item
            title={item.title}
            description={`${item.wordCount} words`}
            right={(props) => (
              <Button {...props} onPress={() => {}}>
                Edit
              </Button>
            )}
          />
        )}
      />
      <FAB
        icon="plus"
        style={styles.fab}
        onPress={() => {}}
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