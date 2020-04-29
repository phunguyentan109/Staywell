import { connect } from 'react-redux'
import mapState from '../modules/func'

function PermissionRender({ children, isPeople, noAccess }) {
  return isPeople ? children : noAccess
}

PermissionRender.defaultProps = {
  noAccess: null
}

export default connect(mapState, null)(PermissionRender)
