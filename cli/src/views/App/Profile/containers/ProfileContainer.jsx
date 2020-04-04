import Profile from '../components/Profile'
import * as credentials from 'constants/credentialControl'
import { sendReloadUser } from 'appRedux/actions/user'
import { connect } from 'react-redux'
import withHelpers from 'hocs/withHelpers'

function mapState({ user }) {
    const { role } = user.data
    const { isPermit } = credentials
    return {
        user: user.data,
        role: {
            isOwner: isPermit(role)(credentials.OWNER_PERMISSION),
            isPeople: isPermit(role)(credentials.PEOPLE_PERMISSION)
        }
    }
}

export default connect(mapState, { sendReloadUser })(withHelpers(Profile))
