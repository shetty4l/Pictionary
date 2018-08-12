import _ from 'lodash'
import { TEAMS_UPDATED, TEAM_CHANGE } from '../actions/types'

const INITIAL_STATE = { teamA: [], teamB: [] }

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case TEAMS_UPDATED: {
      const playersList = _.map(action.payload, (val, name) => (val))

      let teamA = []
      let teamB = []

      _.map(playersList, (player) => {
        if (player.team) teamA.push(player)
        else teamB.push(player)
      })

      return { ...state, teamA, teamB }
    }
    case TEAM_CHANGE: {
      let { teamA, teamB } = { ...state }

      let playerInTeamA = _.head(_.remove(teamA, (player) => (player.name === action.payload.name)))
      let playerInTeamB = _.head(_.remove(teamB, (player) => (player.name === action.payload.name)))

      if (playerInTeamA) {
        playerInTeamA.team = +(!playerInTeamA.team)
        teamB.push(playerInTeamA)
      }
      if (playerInTeamB) {
        playerInTeamB.team = +(!playerInTeamB.team)
        teamA.push(playerInTeamB)
      }

      return { teamA, teamB }
    }
    default:
      return state
  }
}
