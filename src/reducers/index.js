import { combineReducers } from 'redux'
import PlayerReducer from './PlayerReducer'
import PlayerListReducer from './PlayerListReducer'
import TeamReducer from './TeamReducer'
import TeamMembersReducer from './TeamMembersReducer'
import WordReducer from './WordReducer'
import TimerReducer from './TimerReducer'
import PlayingQueueReducer from './PlayingQueueReducer'

export default combineReducers({
  player: PlayerReducer,
  players: PlayerListReducer,
  teamNames: TeamReducer,
  teamMembers: TeamMembersReducer,
  word: WordReducer,
  timer: TimerReducer,
  playingQueue: PlayingQueueReducer
})
