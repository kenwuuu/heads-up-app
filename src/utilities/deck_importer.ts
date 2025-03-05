export interface Word {
  id: string;
  text: string;
}

export interface Deck {
  id: string;
  title: string;
  description: string;
  words: Word[];
}

export function createDeck(words: string[]): Deck {
  if (words.length < 2) {
    throw new Error("The list of words must contain at least two words to create a deck.");
  }

  const deckId = `${words[0]}_${words[1]}`;
  const deckTitle = `${words[0]} ${words[1]}`;

  const deckWords: Word[] = words.map((word, index) => ({
    id: `${deckId}_${index}`,
    text: word,
  }));

  return {
    id: deckId,
    title: deckTitle,
    description: "Lorem ipsum",
    words: deckWords,
  };
}

// Example usage
const wordList = ["apple", "banana", "cherry"];
const deck = createDeck(wordList);
console.log(deck);