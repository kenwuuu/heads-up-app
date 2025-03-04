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

export const mockDecks: Deck[] = [
  {
    id: 'movies',
    title: 'Movies',
    description: 'Popular movies and film characters',
    words: [
      { id: 'm1', text: 'Star Wars' },
      { id: 'm2', text: 'Harry Potter' },
      { id: 'm3', text: 'The Matrix' },
      { id: 'm4', text: 'Jurassic Park' },
      { id: 'm5', text: 'Titanic' },
      { id: 'm6', text: 'Avatar' },
      { id: 'm7', text: 'Spider-Man' },
      { id: 'm8', text: 'The Lion King' },
      { id: 'm9', text: 'Batman' },
      { id: 'm10', text: 'Indiana Jones' },
    ],
  },
  {
    id: 'animals',
    title: 'Animals',
    description: 'Common and exotic animals',
    words: [
      { id: 'a1', text: 'Elephant' },
      { id: 'a2', text: 'Giraffe' },
      { id: 'a3', text: 'Penguin' },
      { id: 'a4', text: 'Kangaroo' },
      { id: 'a5', text: 'Dolphin' },
      { id: 'a6', text: 'Koala' },
      { id: 'a7', text: 'Tiger' },
      { id: 'a8', text: 'Panda' },
      { id: 'a9', text: 'Lion' },
      { id: 'a10', text: 'Zebra' },
    ],
  },
  {
    id: 'countries',
    title: 'Countries',
    description: 'Countries around the world',
    words: [
      { id: 'c1', text: 'Japan' },
      { id: 'c2', text: 'Brazil' },
      { id: 'c3', text: 'Australia' },
      { id: 'c4', text: 'Egypt' },
      { id: 'c5', text: 'France' },
      { id: 'c6', text: 'Italy' },
      { id: 'c7', text: 'Canada' },
      { id: 'c8', text: 'India' },
      { id: 'c9', text: 'Mexico' },
      { id: 'c10', text: 'South Africa' },
    ],
  },
  {
    id: 'food',
    title: 'Food',
    description: 'Foods from around the world',
    words: [
      { id: 'f1', text: 'Pizza' },
      { id: 'f2', text: 'Sushi' },
      { id: 'f3', text: 'Tacos' },
      { id: 'f4', text: 'Pasta' },
      { id: 'f5', text: 'Burger' },
      { id: 'f6', text: 'Ice Cream' },
      { id: 'f7', text: 'Curry' },
      { id: 'f8', text: 'Pancakes' },
      { id: 'f9', text: 'Chocolate' },
      { id: 'f10', text: 'French Fries' },
    ],
  },
]; 