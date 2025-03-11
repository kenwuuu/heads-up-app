import {useCallback, useRef, useState} from 'react';
import {KeyboardAvoidingView, Platform, ScrollView, View} from 'react-native';
import {Button, IconButton, Text, TextInput} from 'react-native-paper';
import {router, useLocalSearchParams} from 'expo-router';
import {useDeckStore} from '../src/zustand_state_store/deckStore';
import {Deck, Word} from '../decks/decks';
import {SafeAreaView} from 'react-native-safe-area-context';
import * as Haptics from 'expo-haptics';
import {useFocusEffect} from '@react-navigation/native';
import {editDeckMenuStyles} from "@/src/constants/stylingConstants";

export default function EditDeckScreen() {
  const { deckId } = useLocalSearchParams<{ deckId: string }>();
  const decks = useDeckStore((state) => state.decks);
  const addDeck = useDeckStore((state) => state.addDeck);
  const updateDeck = useDeckStore((state) => state.updateDeck);
  const scrollViewRef = useRef<ScrollView>(null);

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
    }, [deckId, decks]) // Re-run when deckId or decks change
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
    <SafeAreaView style={editDeckMenuStyles.safeAreaContainer} edges={['top']}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={editDeckMenuStyles.container}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}
      >
        <ScrollView
          ref={scrollViewRef}
          style={editDeckMenuStyles.scrollView}
          contentContainerStyle={editDeckMenuStyles.scrollViewContent}
          keyboardShouldPersistTaps="handled"
        >
          <Text variant="titleMedium" style={editDeckMenuStyles.sectionTitle}>
            Deck Info
          </Text>

          <TextInput
            label="Deck Title"
            value={title}
            onChangeText={setTitle}
            style={editDeckMenuStyles.input}
          />
          <TextInput
            label="Description"
            value={description}
            onChangeText={setDescription}
            style={editDeckMenuStyles.input}
          />

          <Text variant="titleMedium" style={editDeckMenuStyles.sectionTitle}>
            Add a Word
          </Text>

          <View style={editDeckMenuStyles.addWordContainer}>
            <TextInput
              label="New Word"
              value={newWord}
              onChangeText={setNewWord}
              style={editDeckMenuStyles.wordInput}
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

          <Text variant="titleMedium" style={editDeckMenuStyles.sectionTitle}>
            Words
          </Text>

          {words.map((word) => (
            <View key={word.id} style={editDeckMenuStyles.wordItem}>
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

        <View style={editDeckMenuStyles.buttonContainer}>
          <Button
            mode="contained"
            onPress={() => {
              handleSave();
            }}
            style={editDeckMenuStyles.button}
            disabled={!title.trim() || words.length === 0}
          >
            Save Deck
          </Button>
          <Button
            mode="outlined"
            onPress={() => {
              router.push('/decks');
            }}
            style={editDeckMenuStyles.button}
          >
            Cancel
          </Button>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

