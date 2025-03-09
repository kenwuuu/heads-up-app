import {router} from "expo-router";
import {Deck} from "@/decks/decks";


export function handleStartGame(selectedDeck: Deck | null, startGame: (deck: Deck) => void) {
  if (selectedDeck) {
    startGame(selectedDeck);
    router.replace('/game');
  }
}