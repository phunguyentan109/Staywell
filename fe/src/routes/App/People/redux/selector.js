import { DEFAULT_PEOPLE } from './reducer'

export const selectPeople = ({ people }) => people || DEFAULT_PEOPLE
