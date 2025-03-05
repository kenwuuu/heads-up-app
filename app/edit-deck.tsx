import { useState } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { Button, Text, TextInput, IconButton } from 'react-native-paper';
import { Stack, router, useLocalSearchParams } from 'expo-router';
import { useDeckStore } from '../src/zustand_state_store/deckStore';
import { Deck, Word } from '../src/mock/decks';

export default function EditDeckScreen() {
  const { deckId } = useLocalSearchParams<{ deckId: string }>();
  const decks = useDeckStore((state) => state.decks);
  const addDeck = useDeckStore((state) => state.addDeck);
  const updateDeck = useDeckStore((state) => state.updateDeck);

  const existingDeck = decks.find((d) => d.id === deckId);
  const [title, setTitle] = useState(existingDeck?.title || '');
  const [description, setDescription] = useState(existingDeck?.description || '');
  const [words, setWords] = useState<Word[]>(existingDeck?.words || []);
  const [newWord, setNewWord] = useState('');

  const handleSave = () => {
    if (!title.trim()) {
      // TODO: Show error message
      return;
    }

    const deck: Deck = {
      id: existingDeck?.id || Date.now().toString(),
      title: title.trim(),
      description: description.trim(),
      words: words,
    };

    if (existingDeck) {
      updateDeck(deck);
    } else {
      addDeck(deck);
    }

    router.push('/');
  };

  const addWord = () => {
    if (newWord.trim()) {
      setWords([
        ...words,
        { id: Date.now().toString(), text: newWord.trim() },
      ]);
      setNewWord('');
    }
  };

  const removeWord = (wordId: string) => {
    setWords(words.filter((w) => w.id !== wordId));
  };

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: existingDeck ? 'Edit Deck' : 'New Deck',
        }}
      />
      <ScrollView style={styles.scrollView}>
        <TextInput
          label="Deck Title"
          value={title}
          onChangeText={setTitle}
          style={styles.input}
        />
        <TextInput
          label="Description"
          value={description}
          onChangeText={setDescription}
          style={styles.input}
        />

        <Text variant="titleMedium" style={styles.sectionTitle}>
          Words
        </Text>

        {words.map((word) => (
          <View key={word.id} style={styles.wordItem}>
            <Text variant="bodyLarge">{word.text}</Text>
            <IconButton icon="delete" onPress={() => removeWord(word.id)} />
          </View>
        ))}

        <View style={styles.addWordContainer}>
          <TextInput
            label="New Word"
            value={newWord}
            onChangeText={setNewWord}
            style={styles.wordInput}
          />
          <Button onPress={addWord} mode="contained">
            Add
          </Button>
        </View>
      </ScrollView>

      <View style={styles.buttonContainer}>
        <Button
          mode="contained"
          onPress={handleSave}
          style={styles.button}
          disabled={!title.trim() || words.length === 0}
        >
          Save Deck
        </Button>
        <Button
          mode="outlined"
          onPress={() => router.push('/')}
          style={styles.button}
        >
          Cancel
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
    padding: 16,
  },
  input: {
    marginBottom: 16,
  },
  sectionTitle: {
    marginBottom: 16,
  },
  wordItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: '#f5f5f5',
    marginBottom: 8,
    borderRadius: 8,
  },
  addWordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    gap: 8,
  },
  wordInput: {
    flex: 1,
  },
  buttonContainer: {
    padding: 16,
    gap: 8,
  },
  button: {
    width: '100%',
  },
}); 