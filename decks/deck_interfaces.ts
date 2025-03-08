// deck_interfaces.tsx
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