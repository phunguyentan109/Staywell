import {
  FETCH_PEOPLE_ACTION,
  FETCH_PEOPLE_SUCCESS_ACTION,
  GET_REGISTRATION_TOKEN, NEW_REGISTRATION_TOKEN, GET_REGISTRATION_TOKEN_SUCCESS,
  REMOVE_PEOPLE_ACTION,
  REMOVE_REGISTRATION_TOKEN
} from '../const'

export const DEFAULT_PEOPLE = {
  people: [],
  loading: false,
  tokens: [],
  loadingTokens: false,
}

export default (state = DEFAULT_PEOPLE, action) => {
  switch (action.type){
    case FETCH_PEOPLE_ACTION:
    case REMOVE_PEOPLE_ACTION:
      return {
        ...state,
        loading: true
      }

    case GET_REGISTRATION_TOKEN:
    case REMOVE_REGISTRATION_TOKEN:
    case NEW_REGISTRATION_TOKEN:
      return {
        ...state,
        loadingTokens: true
      }

    case GET_REGISTRATION_TOKEN_SUCCESS:
      return {
        ...state,
        loadingTokens: false,
        tokens: action.data || DEFAULT_PEOPLE.tokens
      }

    case FETCH_PEOPLE_SUCCESS_ACTION:
      return {
        ...state,
        people: action.data || DEFAULT_PEOPLE.people,
        loading: false
      }

    default:
      return state
  }
}
