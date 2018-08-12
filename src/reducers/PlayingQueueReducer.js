import { INIT_PLAYING_QUEUE, UPDATE_PLAYER } from '../actions/types'

const INITIAL_STATE = []

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case INIT_PLAYING_QUEUE: {
      const teamMembers = action.payload

      const { teamA, teamB } = teamMembers

      const iterLength = (teamA.length > teamB.length) ? teamA.length : teamB.length

      let playingQueue = INITIAL_STATE
      for (var i = 0; i < iterLength; ++i) {
        if (teamA[i]) playingQueue.push(teamA[i])
        if (teamB[i]) playingQueue.push(teamB[i])
      }

      return playingQueue
    }
    case UPDATE_PLAYER: {
      const { category, result } = action.payload
      let playingQueue = [ ...state ]
      let player = playingQueue.shift()

      if (result) {
        let { solved } = player
        let value = solved[category] + 1
        player = { ...player, solved: { ...solved, [category]: value } }
      } else {
        let { failed } = player
        let value = failed[category] + 1
        player = { ...player, failed: { ...failed, [category]: value } }
      }

      playingQueue.push(player)
      return playingQueue
    }
    default:
      return state
  }
}
