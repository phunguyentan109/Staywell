import { LOGIN_SUCCESS_ACTION } from '../const'

export const DEFAULT_USER = {
  data: {
    permissions: {}
  }
}

export default (state = DEFAULT_USER, action) => {
  switch (action.type){
    case LOGIN_SUCCESS_ACTION:
      return {
        ...state,
        data: action.data || DEFAULT_USER.data
      }
    default:
      return state
  }
}
