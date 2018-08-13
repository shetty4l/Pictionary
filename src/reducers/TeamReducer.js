import { TEAM_A_NAME_CHANGED, TEAM_B_NAME_CHANGED, RESET_TEAM_NAMES } from '../actions/types'

const INITIAL_STATE = { teamAName: 'Team A', teamBName: 'Team B' }

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case TEAM_A_NAME_CHANGED:
      return { ...state, teamAName: action.payload }
    case TEAM_B_NAME_CHANGED:
      return { ...state, teamBName: action.payload }
    case RESET_TEAM_NAMES:
      return INITIAL_STATE
    default:
      return state
  }
}
