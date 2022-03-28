import { EDIT_PRICE_ACTION, FETCH_PRICE_ACTION, FETCH_PRICE_SUCCESS_ACTION, REMOVE_PRICE_ACTION } from '../const'

export const DEFAULT_PRICE = {
  price: [],
  loading: false
}

export default (state = DEFAULT_PRICE, action) => {
  switch (action.type){
    case FETCH_PRICE_ACTION:
    case REMOVE_PRICE_ACTION:
    case EDIT_PRICE_ACTION:
      return {
        ...state,
        loading: true
      }

    case FETCH_PRICE_SUCCESS_ACTION:
      return {
        ...state,
        price: action.data?.price || DEFAULT_PRICE.price,
        loading: false
      }

    default:
      return state
  }
}
