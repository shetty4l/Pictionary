import { START_TIMER, RESET_TIMER } from '../actions/types'

const INITIAL_STATE = '01:00'

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case START_TIMER: {
      let [ minute, seconds ] = state.split(':')
      minute = Number.parseInt(minute)
      seconds = Number.parseInt(seconds)

      if (minute === 0 && seconds === 0) clearTimeout(action.payload)
      else {
        if (minute !== 0) minute = minute - 1
        if (seconds === 0) seconds = 60
        seconds = seconds - 1
      }

      return `${minute.toString().padStart(2, 0)}:${seconds.toString().padStart(2, 0)}`
    }
    case RESET_TIMER: {
      return INITIAL_STATE
    }
    default:
      return state
  }
}
