import {
  TEAM_A_NAME_CHANGED,
  TEAM_B_NAME_CHANGED,
  TEAMS_UPDATED,
  TEAM_CHANGE,
  INIT_PLAYING_QUEUE,
  UPDATE_PLAYER,
  NEW_WORD_FIREBASE_URL
} from './types'

export const teamAUpdate = (name) => {
  return {
    type: TEAM_A_NAME_CHANGED,
    payload: name
  }
}

export const teamBUpdate = (name) => {
  return {
    type: TEAM_B_NAME_CHANGED,
    payload: name
  }
}

export const teamsUpdate = (players) => {
  return {
    type: TEAMS_UPDATED,
    payload: players
  }
}

export const teamChange = (player) => {
  return async (dispatch, getState) => {
    await dispatch({ type: TEAM_CHANGE, payload: player })
    const { players } = getState()
    dispatch(teamsUpdate(players))
  }
}

export const initPlayingQueue = (teamMembers) => {
  return async (dispatch) => {
    let promiseArray = []
    const { teamA, teamB } = teamMembers
    for (let i = 0; i < teamA.length + teamB.length; ++i) {
      const body = { score: [], wordsAlreadyAppeared: [] }
      promiseArray.push(fetch(NEW_WORD_FIREBASE_URL, { // eslint-disable-line no-undef
        method: 'POST',
        body: JSON.stringify(body)
      }).then(response => response.json()))
    }
    const words = await Promise.all(promiseArray)
    const payload = { teamMembers, words }
    dispatch({ type: INIT_PLAYING_QUEUE, payload })
  }
}

export const updatePlayer = (player, wordsAlreadyAppeared, scoreEntry) => {
  return async (dispatch) => {
    const { score } = player
    const body = { score, wordsAlreadyAppeared }
    let response = await fetch(NEW_WORD_FIREBASE_URL, { // eslint-disable-line no-undef
      method: 'POST', body: JSON.stringify(body)
    })
    const word = await response.json()
    dispatch({ type: UPDATE_PLAYER, payload: { scoreEntry, word } })
  }
}
