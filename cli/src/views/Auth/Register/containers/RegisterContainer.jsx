import Register from '../components/Register'
import { connect } from 'react-redux'
import { sendAuthData } from 'appRedux/actions/user'
import { addMessage } from 'appRedux/actions/message'
import withHelpers from 'hocs/withHelpers'

function mapState({ message }) {
    return {
        message: message.text,
        negative: message.isNegative
    }
}

export default connect(mapState, { sendAuthData, addMessage })(withHelpers(Register))
