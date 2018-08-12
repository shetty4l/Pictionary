import { NAME_CHANGED, CURRENT_PLAYER_CHANGED, RESET_PLAYER } from '../actions/types'

const INITIAL_STATE = {
  name: '',
  solved: { easy: 0, medium: 0, hard: 0 },
  failed: { easy: 0, medium: 0, hard: 0 }
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
