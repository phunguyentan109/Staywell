import { FETCH_PEOPLE_ACTION, FETCH_PEOPLE_SUCCESS_ACTION, REMOVE_PEOPLE_ACTION } from '../const'

export const DEFAULT_PEOPLE = {
  people: [],
  loading: false
}

export default (state = DEFAULT_PEOPLE, action) => {
  switch (action.type){
    case FETCH_PEOPLE_ACTION:
    case REMOVE_PEOPLE_ACTION:
      return {
        ...state,
        loading: true
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
