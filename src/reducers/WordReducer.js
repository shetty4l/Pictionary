import { NEW_WORD, UPDATE_WORD } from '../actions/types'

const INITIAL_STATE = { category: '', word: '', stylizedWord: '' }

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case NEW_WORD: {
      const { word, category } = action.payload
      return { ...state, word, category }
    }
    case UPDATE_WORD: {
      const { word, category } = action.payload
      const stylizedWord = word.charAt(0).toUpperCase() + word.slice(1)
      return { ...state, stylizedWord, stylizedCategory: category }
    }
    default:
      return state
  }
}
