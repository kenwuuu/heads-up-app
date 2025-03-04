import { create } from 'zustand';
import { Deck, Word } from '../mock/decks';

interface GameState {
  // Selected deck
  selectedDeck: Deck | null;
  setSelectedDeck: (deck: Deck) => void;

  // Game state
  isPlaying: boolean;
  currentWord: Word | null;
  score: number;
  timeLeft: number;
  roundWords: Word[];

  // Game actions
  startGame: (deck: Deck) => void;
  endGame: () => void;
  markCorrect: () => void;
  markIncorrect: () => void;
  nextWord: () => void;
  resetGame: () => void;
}

export const useGameStore = create<GameState>((set, get) => ({
  // Initial state
  selectedDeck: null,
  isPlaying: false,
  currentWord: null,
  score: 0,
  timeLeft: 60,
  roundWords: [],

  // Deck selection
  setSelectedDeck: (deck) => set({ selectedDeck: deck }),

  // Game actions
  startGame: (deck) => {
    const shuffledWords = [...deck.words].sort(() => Math.random() - 0.5);
    set({
      selectedDeck: deck,
      isPlaying: true,
      currentWord: shuffledWords[0],
      score: 0,
      timeLeft: 60,
      roundWords: shuffledWords,
    });
  },

  endGame: () => {
    set({
      isPlaying: false,
      currentWord: null,
      roundWords: [],
    });
  },

  markCorrect: () => {
    const { score } = get();
    set({ score: score + 1 });
    get().nextWord();
  },

  markIncorrect: () => {
    get().nextWord();
  },

  nextWord: () => {
    const { roundWords, currentWord } = get();
    const currentIndex = roundWords.findIndex(w => w.id === currentWord?.id);
    const nextIndex = currentIndex + 1;

    if (nextIndex < roundWords.length) {
      set({ currentWord: roundWords[nextIndex] });
    } else {
      // If we've gone through all words, shuffle and start over
      const shuffledWords = [...roundWords].sort(() => Math.random() - 0.5);
      set({
        roundWords: shuffledWords,
        currentWord: shuffledWords[0],
      });
    }
  },

  resetGame: () => {
    set({
      isPlaying: false,
      currentWord: null,
      score: 0,
      timeLeft: 60,
      roundWords: [],
    });
  },
})); 