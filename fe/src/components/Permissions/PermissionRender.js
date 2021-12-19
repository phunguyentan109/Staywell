import { useSelector } from 'react-redux'
import { verifyPm } from './const'

function PermissionRender({ children, access, inAccess, renderNoAccess }) {
  const verifyAccess = useSelector(({ user }) => verifyPm(user?.data?.role))

  return verifyAccess(access, inAccess) ? children : renderNoAccess
}

PermissionRender.defaultProps = {
  renderNoAccess: null
}

export default PermissionRender
