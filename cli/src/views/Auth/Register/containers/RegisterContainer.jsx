import Register from '../components/Register'
import { connect } from 'react-redux'
import { sendAuthData } from "appRedux/actions/user";
import { addMessage } from "appRedux/actions/message"

function mapState({ message }) {
    return {
        message: message.text,
        negative: message.isNegative
    }
}

export default connect(mapState, { sendAuthData, addMessage })(Register);
