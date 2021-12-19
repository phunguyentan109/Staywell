import { ADD_MESSAGE } from 'constants/ActionTypes'

const DEFAULT_STATE = { text: '', isNegative: false }

export default (state = DEFAULT_STATE, action) => {
  const { type, value } = action
  switch (type){
    case ADD_MESSAGE:
      return { ...state, ...value }
    default:
      return state
  }
}
