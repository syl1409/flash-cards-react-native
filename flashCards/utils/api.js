import { AsyncStorage } from 'react-native'

export function fetchDecks () {
  return AsyncStorage.getItem('UdaciFlashCard')
  .then(formatResults);
  
  }

  function formatResults (results) {
      console.log('format',JSON.parse(results))
    return results === null
      ? {}
      : JSON.parse(results);
  }

export function submitDeck({ entry, key }){
    console.log('local', entry, key);
    return AsyncStorage.mergeItem('UdaciFlashCard', JSON.stringify({
      [key]: entry
    }))
}

export function addCardDeck (title, newDeck){
  return AsyncStorage.getItem('UdaciFlashCard')
  .then((results) => {
    const data = JSON.parse(results)
    data[title] = newDeck
    AsyncStorage.setItem('UdaciFlashCard', JSON.stringify(data))
  })
}
export function removeDeck(title){
  return AsyncStorage.getItem('UdaciFlashCard')
  .then((results) => {
    const data = JSON.parse(results)
    data[title] = undefined
    delete data[title]
    AsyncStorage.setItem('UdaciFlashCard', JSON.stringify(data))
  })
}