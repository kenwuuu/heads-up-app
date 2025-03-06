import {useRef, useState} from 'react';
import {KeyboardAvoidingView, Platform, ScrollView, StyleSheet, View} from 'react-native';
import {Button, IconButton, Text, TextInput} from 'react-native-paper';
import {router, Stack, useLocalSearchParams} from 'expo-router';
import {useDeckStore} from '../src/zustand_state_store/deckStore';
import {Deck, Word} from '../src/mock/decks';
import {SafeAreaView} from "react-native-safe-area-context";
import * as Haptics from 'expo-haptics';

export default function EditDeckScreen() {
  const { deckId } = useLocalSearchParams<{ deckId: string }>();
  const decks = useDeckStore((state) => state.decks);
  const addDeck = useDeckStore((state) => state.addDeck);
  const updateDeck = useDeckStore((state) => state.updateDeck);
  const scrollViewRef = useRef<ScrollView>(null);

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
    <SafeAreaView style={styles.safeAreaContainer} edges={['top']}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.container}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}  // provide different offsets between iOS and Android
      >
        <Stack.Screen
          options={{
            title: existingDeck ? 'Edit Deck' : 'New Deck',
          }}
        />
        <ScrollView
          ref={scrollViewRef}
          style={styles.scrollView}
          contentContainerStyle={styles.scrollViewContent}
          keyboardShouldPersistTaps="handled"
        >
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
            <Button onPress={() => {
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
              addWord();
            }} mode="contained">
              Add
            </Button>
          </View>

          <Text variant="titleMedium" style={styles.sectionTitle}>
            Words
          </Text>

          {words.map((word) => (
            <View key={word.id} style={styles.wordItem}>
              <Text variant="bodyLarge">{word.text}</Text>
              <IconButton
                icon="delete"
                onPress={() => {
                  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
                  removeWord(word.id);
                }}
              />
            </View>
          ))}
        </ScrollView>

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
              router.push('/');
            }}
            style={styles.button}
          >
            Cancel
          </Button>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    display: 'flex',
  },
  safeAreaContainer: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollViewContent: {
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
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  button: {
    width: '100%',
  },
}); 