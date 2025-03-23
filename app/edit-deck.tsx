import React, {useCallback, useState} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {Button, IconButton, Text, TextInput} from 'react-native-paper';
import {router, useLocalSearchParams} from 'expo-router';
import {useDeckStore} from '../src/zustand_state_store/deckStore';
import {Deck, Word} from '../decks/decks';
import * as Haptics from 'expo-haptics';
import {useFocusEffect} from '@react-navigation/native';
import {FONT, GLOBAL_STYLES, PURPLE, YELLOW} from "@/src/constants/stylingConstants";
import {SafeAreaView} from "react-native-safe-area-context";

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
        setNewWord('');
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
    <SafeAreaView style={GLOBAL_STYLES.SAFE_AREA_CONTAINER} edges={['top']}>
      <View style={GLOBAL_STYLES.BACKGROUND_CONTAINER}>
        <FlatList
          data={words}
          keyExtractor={(item) => item.id}
          renderItem={({item}) => (
            <View style={[styles.wordItem]}>
              <Text variant="bodyLarge" style={GLOBAL_STYLES.BODY}>{item.text}</Text>
              <IconButton
                icon="delete"
                iconColor={YELLOW}
                onPress={() => {
                  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
                  removeWord(item.id);
                }}
              />
            </View>
          )}
          ListHeaderComponent={
            <>
              <Text variant="titleMedium" style={[GLOBAL_STYLES.TITLE, styles.sectionTitle]}>
                Deck Info
              </Text>

              <TextInput
                label="Deck Title"
                value={title}
                onChangeText={setTitle}
                style={[styles.wordInput]}
                textColor={'#ffffff'}
                theme={{colors: {primary: '#ffffff', onSurfaceVariant: '#ffffff'}}}
              />
              <TextInput
                label="Description"
                value={description}
                onChangeText={setDescription}
                style={styles.wordInput}
                textColor={'#ffffff'}
                theme={{colors: {primary: '#ffffff', onSurfaceVariant: '#ffffff'}}}
              />

              <Text variant="titleMedium" style={[GLOBAL_STYLES.TITLE, styles.sectionTitle]}>
                Add a Word
              </Text>

              <View style={styles.addWordContainer}>
                <TextInput
                  label="New Word"
                  value={newWord}
                  onChangeText={setNewWord}
                  style={styles.wordInput}
                  textColor={'#ffffff'}
                  theme={{colors: {primary: '#ffffff', onSurfaceVariant: '#ffffff'}}}
                />
                <Button
                  onPress={() => {
                    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
                    addWord();
                  }}
                  mode="contained"
                  buttonColor={PURPLE}
                  textColor={YELLOW}
                  labelStyle={FONT.MONTSERRAT_700BOLD}
                >
                  Add
                </Button>
              </View>

              <Text variant="titleMedium" style={[GLOBAL_STYLES.TITLE, styles.sectionTitle]}>
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
                buttonColor={PURPLE}
                textColor={YELLOW}
                labelStyle={FONT.MONTSERRAT_700BOLD}
              >
                Save Deck
              </Button>
              <Button
                mode="outlined"
                onPress={() => {
                  router.push('/decks');
                }}
                style={styles.button}
                textColor={PURPLE}
                labelStyle={FONT.MONTSERRAT_700BOLD}
              >
                Cancel
              </Button>
            </View>
          }
          contentContainerStyle={styles.scrollViewContent}
        />
      </View>
    </SafeAreaView>
  );
}

export const styles = StyleSheet.create({
  scrollViewContent: {
    padding: 16,
  },
  input: {
    marginBottom: 16,
    backgroundColor: 'white',
  },
  sectionTitle: {
    marginTop: 16,
    marginBottom: 16,
  },
  wordItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginBottom: 8,
    borderRadius: 8,
    ...GLOBAL_STYLES.CONTAINER,
  },
  addWordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  wordInput: {
    paddingBottom: 0,
    marginBottom: 16,
    flex: 1,
    ...GLOBAL_STYLES.TEXT_INPUT,
  },
  buttonContainer: {
    padding: 16,
    gap: 8,
  },
  button: {
    width: '100%',
  },
});