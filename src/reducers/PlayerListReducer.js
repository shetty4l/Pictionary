import { PLAYER_ADDED, PLAYER_DELETED } from '../actions/types'

const INITIAL_STATE = null

var team = false
export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case PLAYER_ADDED:
      const { name } = action.payload
      team = +(!team)
      action.payload.team = team
      return { ...state, [name.toLowerCase()]: action.payload }
    case PLAYER_DELETED:
      let { [action.payload.toLowerCase()]: omit, ...res } = state
      return res
    default:
      return state
  }
}
