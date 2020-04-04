import Activated from '../components/Activated'
import { connect } from 'react-redux'
import { activateUser } from 'appRedux/actions/user'

export default connect(null, { activateUser })(Activated)
