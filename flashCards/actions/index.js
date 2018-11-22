export const RECEIVE_DECKS = 'RECEIVE_DECKS'
export const ADD_DECKS = 'ADD_DECKS'
export const ADD_CARD = 'ADD_CARD'
export const DELETE_DECK = 'DELETE_DECK'

export function receiveDecks (decks) {
  return {
    type: RECEIVE_DECKS,
    decks,
  }
}

export function addDeck (deck) {
  return {
    type: ADD_DECKS,
    deck,
  }
}

export function addCard (title, card) {
  return {
    type: ADD_CARD,
    title,
    card,
  }
}

export function deleteDeck (newState) {
  return {
    type: DELETE_DECK,
    newState,
  }
}
