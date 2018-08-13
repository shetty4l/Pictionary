import { NAME_CHANGED, CURRENT_PLAYER_CHANGED, RESET_PLAYER } from '../actions/types'

const INITIAL_STATE = {
  name: '',
  score: [],
  word: null
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case NAME_CHANGED:
      return { ...state, name: action.payload }
    case CURRENT_PLAYER_CHANGED:
      return action.payload
    case RESET_PLAYER:
      return INITIAL_STATE
    default:
      return state
  }
}
