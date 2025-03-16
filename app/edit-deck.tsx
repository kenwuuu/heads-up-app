import {useCallback, useState} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {Button, IconButton, Text, TextInput} from 'react-native-paper';
import {router, useLocalSearchParams} from 'expo-router';
import {useDeckStore} from '../src/zustand_state_store/deckStore';
import {Deck, Word} from '../decks/decks';
import * as Haptics from 'expo-haptics';
import {useFocusEffect} from '@react-navigation/native';

export default function EditDeckScreen() {
  const {deckId} = useLocalSearchParams<{ deckId: string }>();
  const decks = useDeckStore((state) => state.decks);
  const addDeck = useDeckStore((state) => state.addDeck);
  const updateDeck = useDeckStore((state) => state.updateDeck);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [words, setWords] = useState<Word[]>([]);
  const [newWord, setNewWord] = useState('');

  // Use useFocusEffect to reset state when the screen loses focus
  useFocusEffect(
    useCallback(() => {
      const existingDeck = decks.find((d) => d.id === deckId);
      if (existingDeck) {
        setTitle(existingDeck.title);
        setDescription(existingDeck.description);
        setWords(existingDeck.words);
      } else {
        setTitle('');
        setDescription('');
        setWords([]);
      }

      // Cleanup function
      return () => {
        setTitle('');
        setDescription('');
        setWords([]);
      };
    }, [deckId, decks])
  );

  const handleSave = () => {
    if (!title.trim()) {
      // TODO: Show error message
      return;
    }

    const deck: Deck = {
      id: deckId || Date.now().toString(), // Use deckId if it exists, otherwise generate a new one
      title: title.trim(),
      description: description.trim(),
      words: words,
    };

    if (deckId) {
      updateDeck(deck);
    } else {
      addDeck(deck);
    }

    router.push('/');
  };

  const addWord = () => {
    if (newWord.trim()) {
      setWords([...words, {id: Date.now().toString(), text: newWord.trim()}]);
      setNewWord('');
    }
  };

  const removeWord = (wordId: string) => {
    setWords(words.filter((w) => w.id !== wordId));
  };

  return (
    <FlatList
      data={words}
      keyExtractor={(item) => item.id}
      renderItem={({item}) => (
        <View style={styles.wordItem}>
          <Text variant="bodyLarge">{item.text}</Text>
          <IconButton
            icon="delete"
            onPress={() => {
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
              removeWord(item.id);
            }}
          />
        </View>
      )}
      ListHeaderComponent={
        <>
          <Text variant="titleMedium" style={styles.sectionTitle}>
            Deck Info
          </Text>

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
            Add a Word
          </Text>

          <View style={styles.addWordContainer}>
            <TextInput
              label="New Word"
              value={newWord}
              onChangeText={setNewWord}
              style={styles.wordInput}
            />
            <Button
              onPress={() => {
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
                addWord();
              }}
              mode="contained"
            >
              Add
            </Button>
          </View>

          <Text variant="titleMedium" style={styles.sectionTitle}>
            Words
          </Text>
        </>
      }
      ListFooterComponent={
        <View style={styles.buttonContainer}>
          <Button
            mode="contained"
            onPress={() => {
              handleSave();
            }}
            style={styles.button}
            disabled={!title.trim() || words.length === 0}
          >
            Save Deck
          </Button>
          <Button
            mode="outlined"
            onPress={() => {
              router.push('/decks');
            }}
            style={styles.button}
          >
            Cancel
          </Button>
        </View>
      }
      contentContainerStyle={styles.scrollViewContent}
    />

  );
}

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
  },
  scrollView: {
    flex: 1,
  },
  scrollViewContent: {
    padding: 16,
  },
  deckTitleSize: {
    fontSize: 18,
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
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  button: {
    width: '100%',
  },
});