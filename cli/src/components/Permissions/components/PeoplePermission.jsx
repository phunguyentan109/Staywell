import { connect } from 'react-redux'
import mapState from '../modules/func'

function PeoplePermission({ children, isPeople, noAccess }) {
  return isPeople ? children : noAccess
}

PeoplePermission.defaultProps = {
  noAccess: null
}

export default connect(mapState, null)(PeoplePermission)
