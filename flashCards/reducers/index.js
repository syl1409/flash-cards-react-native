import { RECEIVE_DECKS, ADD_DECKS, ADD_CARD, DELETE_DECK } from '../actions'

function decks (state = {}, action) {
  switch (action.type) {
    case RECEIVE_DECKS :
      return {
        ...state,
        ...action.decks,
      }
    case ADD_DECKS :
      return{
        ...state,
        ...action.deck,
      }
     case ADD_CARD :
     const { title, card} = action
     return{
       ...state,
       [title]:{
         ...state[title],
         questions:state[title].questions.concat([card])

         }
       }
     case DELETE_DECK :
      console.log('delete deck', action, 'state', state)
      return {
        ...action.newState
        
      }
    default :
      return state
  }
}

export default decks