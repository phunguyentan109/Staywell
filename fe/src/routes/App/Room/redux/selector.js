import { DEFAULT_ROOM } from './reducer'

export const selectRoom = ({ room }) => room || DEFAULT_ROOM
