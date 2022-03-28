import { EDIT_ROOM_ACTION, FETCH_ROOM_ACTION, FETCH_ROOM_SUCCESS_ACTION, REMOVE_ROOM_ACTION } from '../const'

export const DEFAULT_ROOM = {
  rooms: [],
  loading: false
}

export default (state = DEFAULT_ROOM, action) => {
  switch (action.type){
    case FETCH_ROOM_ACTION:
    case REMOVE_ROOM_ACTION:
    case EDIT_ROOM_ACTION:
      return {
        ...state,
        loading: true
      }

    case FETCH_ROOM_SUCCESS_ACTION:
      return {
        ...state,
        rooms: action.data?.rooms || DEFAULT_ROOM.rooms,
        loading: false
      }

    default:
      return state
  }
}
