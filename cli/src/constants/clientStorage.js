import jwtDecode from 'jwt-decode'
import { clearAuthData, addUser } from 'appRedux/actions/user'
import { apiUser } from 'constants/api'
import { setTokenHeader } from 'constants/api/call'

export default async function extractStorage(store) {
  try {
    // Check authentication data
    if(localStorage.swtoken) {
      setTokenHeader(localStorage.swtoken)

      if(sessionStorage.auth) {
        const user = JSON.parse(sessionStorage.auth)
        store.dispatch(addUser(user))
      } else {
        let userData

        setTimeout(() => {
          // Using setTimeout on Promise chain
          return new Promise(async (resolve, reject) => {
            // disable promise chain after 2s
            setTimeout(() => {
              if(!userData) {
                // return promise to catch
                reject()
              }
            }, 2000)

            let tokenData = jwtDecode(localStorage.swtoken)
            let { token, ...user } = await apiUser.getOne(tokenData._id)
            sessionStorage.setItem('auth', JSON.stringify(user))
            userData = user
            // return promise to then
            resolve()
          }).then(() => store.dispatch(addUser(userData)))
            .catch(() => store.dispatch(clearAuthData()))
        }, 2000)
      }
    }
  } catch(err) {
    store.dispatch(clearAuthData())
  }
}
