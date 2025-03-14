import {create} from 'zustand';
import {Deck, mockDecks} from '@/decks/decks';
import codenamesDeck from '@/decks/big_mocks/codenames';
import duetDeck from '@/decks/big_mocks/duet';
import mtgDeck from '@/decks/big_mocks/mtg';
import potterDeck from '@/decks/big_mocks/potter';
import vanillaDeck from '@/decks/big_mocks/vanilla';

interface DeckState {
  // Deck management
  decks: Deck[];
  addDeck: (deck: Deck) => void;
  updateDeck: (deck: Deck) => void;
  deleteDeck: (deckId: string) => void;
}

export const useDeckStore = create<DeckState>((set, get) => ({
  // Initial state with mock decks
  decks: [duetDeck, mtgDeck, codenamesDeck, potterDeck, vanillaDeck, ...mockDecks],

  // Deck management actions
  addDeck: (deck) => {
    const { decks } = get();
    set({ decks: [...decks, deck] });
  },

  updateDeck: (updatedDeck) => {
    const { decks } = get();
    set({
      decks: decks.map((deck) =>
        deck.id === updatedDeck.id ? updatedDeck : deck
      ),
    });
  },

  deleteDeck: (deckId) => {
    const { decks } = get();
    set({
      decks: decks.filter((deck) => deck.id !== deckId),
    });
  },
})); 