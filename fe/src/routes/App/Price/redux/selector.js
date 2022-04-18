import { DEFAULT_PRICE } from './reducer'

export const selectPrice = ({ price }) => price || DEFAULT_PRICE
