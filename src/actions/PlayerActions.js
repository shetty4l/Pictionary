import {
  NAME_CHANGED,
  CURRENT_PLAYER_CHANGED,
  RESET_PLAYER,
  PLAYER_ADDED,
  PLAYER_DELETED,
  RESET_PLAYER_LIST
} from './types'
import { teamsUpdate } from './TeamActions'

export const playerNameUpdate = (name) => {
  return {
    type: NAME_CHANGED,
    payload: name
  }
}

export const currentPlayerChange = (player) => {
  return {
    type: CURRENT_PLAYER_CHANGED,
    payload: player
  }
}

export const resetPlayer = () => {
  return {
    type: RESET_PLAYER
  }
}

export const playerAdd = (player) => {
  return async (dispatch, getState) => {
    await dispatch({ type: PLAYER_ADDED, payload: player })
    const { players } = getState()
    dispatch(teamsUpdate(players))
  }
}

export const playerDelete = (name) => {
  return async (dispatch, getState) => {
    await dispatch({ type: PLAYER_DELETED, payload: name })
    const { players } = getState()
    dispatch(teamsUpdate(players))
  }
}

export const resetPlayerList = () => {
  return {
    type: RESET_PLAYER_LIST
  }
}
