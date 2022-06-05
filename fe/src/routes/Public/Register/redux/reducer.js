import { REGISTER_USER_ACTION, REGISTER_USER_ACTION_SUCCESS } from '../const'

export const DEFAULT_REGISTER = {
  loading: false
}

export default (state = DEFAULT_REGISTER, action) => {
  switch (action.type){
    case REGISTER_USER_ACTION:
      return {
        ...state,
        loading: true
      }

    case REGISTER_USER_ACTION_SUCCESS:
      return {
        ...state,
        loading: false
      }

    default:
      return state
  }
}
