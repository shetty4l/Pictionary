import { NEW_WORD, NEW_WORD_FIREBASE_URL, UPDATE_WORD, START_TIMER, RESET_TIMER } from './types'

export const newWord = (currentConfig, wordsAlreadyAppeared) => {
  return async (dispatch, getState) => {
    try {
      const body = { currentConfig, wordsAlreadyAppeared }
      let response = await fetch(NEW_WORD_FIREBASE_URL, { // eslint-disable-line no-undef
        method: 'POST', body: JSON.stringify(body)
      })
      let data = await response.json()
      dispatch({ type: NEW_WORD, payload: data })
    } catch (error) {
      console.log(error)
    }
  }
}

export const updateWord = (word) => {
  return {
    type: UPDATE_WORD,
    payload: word
  }
}

let timer = null
export const startTimer = () => {
  return async (dispatch, getState) => {
    timer = await setInterval(() => dispatch({ type: START_TIMER, payload: timer }), 1000)
  }
}

export const resetTimer = () => {
  clearInterval(timer)
  return {
    type: RESET_TIMER
  }
}
