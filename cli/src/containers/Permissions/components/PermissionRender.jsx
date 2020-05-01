import { connect } from 'react-redux'
import { mapState } from '../modules/func'

function PermissionRender({ children, access, inAccess, verifyAccess, renderNoAccess }) {
  return verifyAccess(access, inAccess) ? children : renderNoAccess
}

PermissionRender.defaultProps = {
  renderNoAccess: null
}

export default connect(mapState, null)(PermissionRender)
