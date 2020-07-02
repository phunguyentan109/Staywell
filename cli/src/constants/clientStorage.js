import jwtDecode from 'jwt-decode'
import { clearAuthData, addUser } from 'appRedux/actions/user'
import { apiUser } from 'constants/api'
import { setTokenHeader } from 'constants/api/call'

export default function extractStorage(store) {
  // Check authentication data
  if (localStorage.swtoken) {
    setTokenHeader(localStorage.swtoken)
    if (sessionStorage.auth) {
      const user = JSON.parse(sessionStorage.auth)
      return store.dispatch(addUser(user))
    }
    setTimeout(async() => {
      try {
        let params = { user_id: jwtDecode(localStorage.swtoken)._id }
        let { token, ...user } = await apiUser('get', { params }, true)
        sessionStorage.setItem('auth', JSON.stringify(user))
        store.dispatch(addUser(user))
      } catch (err) {
        localStorage.removeItem('swToken')
        store.dispatch(clearAuthData())
      }
    }, 2000)
  }
}
