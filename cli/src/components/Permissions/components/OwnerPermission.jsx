import { connect } from 'react-redux'
import mapState from '../modules/func'

function OwnerPermission({ children, isOwner }) {
  return isOwner ? children : null
}

OwnerPermission.defaultProps = {
  noAccess: null
}

export default connect(mapState, null)(OwnerPermission)
