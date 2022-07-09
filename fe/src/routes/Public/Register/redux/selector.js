import { DEFAULT_REGISTER } from './reducer'

export const selectRegister = ({ register }) => register || DEFAULT_REGISTER
