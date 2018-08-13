import { INIT_PLAYING_QUEUE, UPDATE_PLAYER } from '../actions/types'

const INITIAL_STATE = { queue: [], wordsAlreadyAppeared: [] }

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case INIT_PLAYING_QUEUE: {
      const { teamMembers, words } = action.payload
      const wordsAlreadyAppeared = words.map(word => word.word)
      let { teamA, teamB } = teamMembers

      let wordIndex = 0
      for (let playerIndex = 0; playerIndex < teamA.length; ++playerIndex) {
        teamA[playerIndex].word = words[wordIndex]
        wordIndex++
      }
      for (let playerIndex = 0; playerIndex < teamB.length; ++playerIndex) {
        teamB[playerIndex].word = words[wordIndex]
        wordIndex++
      }

      const iterLength = (teamA.length > teamB.length) ? teamA.length : teamB.length

      let playingQueue = []
      for (let i = 0; i < iterLength; ++i) {
        if (teamA[i]) playingQueue.push(teamA[i])
        if (teamB[i]) playingQueue.push(teamB[i])
      }
      console.log(playingQueue, wordsAlreadyAppeared)
      return { ...state, queue: playingQueue, wordsAlreadyAppeared }
    }
    case UPDATE_PLAYER: {
      const { scoreEntry, word } = action.payload
      let playingQueue = [ ...state.queue ]
      let player = playingQueue.shift()
      player = { ...player, score: [...player.score, scoreEntry], word }
      const wordsAlreadyAppeared = [ ...state.wordsAlreadyAppeared, word.word ]
      playingQueue.push(player)
      return { ...state, queue: playingQueue, wordsAlreadyAppeared }
    }
    default:
      return state
  }
}
