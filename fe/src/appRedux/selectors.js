import { DEFAULT_USER } from './reducers/user'

// key: user
export const selectUser = ({ user }) => user?.data || DEFAULT_USER.data
