import { useSelector } from 'react-redux'
import { verifyPm } from './const'

function Render({ children, access, inAccess, renderNoAccess }) {
  const verifyAccess = useSelector(({ user }) => verifyPm(user?.data?.role))

  return verifyAccess(access, inAccess) ? children : renderNoAccess
}

Render.defaultProps = {
  renderNoAccess: null
}

export default Render
