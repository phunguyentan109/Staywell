export const DEFAULT_PRICE = {
  type: '',
  electric: 0,
  wifi: 0,
  water: 0,
  living: 0,
  extra: 0
}

export const PRICE_INPUTS = [
  { label: 'Type', name: 'type', type: 'text' },
  { label: 'Electric', name: 'electric' },
  { label: 'Wifi', name: 'wifi' },
  { label: 'Water', name: 'water' },
  { label: 'Living', name: 'living' },
  { label: 'Extra', name: 'extra' }
]

export const FETCH_PRICE_ACTION = 'app/Price/FETCH_PRICE_ACTION'
export const FETCH_PRICE_SUCCESS_ACTION = 'app/Price/FETCH_PRICE_SUCCESS_ACTION'

export const CREATE_PRICE_ACTION = 'app/Price/CREATE_PRICE_ACTION'
export const EDIT_PRICE_ACTION = 'app/Price/EDIT_PRICE_ACTION'
export const REMOVE_PRICE_ACTION = 'app/Price/REMOVE_PRICE_ACTION'

