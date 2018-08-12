import {
  TEAM_A_NAME_CHANGED,
  TEAM_B_NAME_CHANGED,
  TEAMS_UPDATED,
  TEAM_CHANGE,
  INIT_PLAYING_QUEUE,
  UPDATE_PLAYER
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
  return {
    type: INIT_PLAYING_QUEUE,
    payload: teamMembers
  }
}

export const updatePlayer = (category, result) => {
  return {
    type: UPDATE_PLAYER,
    payload: { category, result }
  }
}
