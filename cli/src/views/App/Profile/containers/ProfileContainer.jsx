import { connect } from 'react-redux'
import Profile from '../components/Profile'
import { sendReloadUser } from 'appRedux/actions/user'
import withHelpers from 'hocs/withHelpers'

function mapState({ user }) {
  return { user: user.data }
}

export default connect(mapState, { sendReloadUser })(withHelpers(Profile))
