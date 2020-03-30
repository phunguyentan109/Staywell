import Reset from '../components/Reset'
import { connect } from 'react-redux';
import { addMessage } from 'appRedux/actions/message';

function mapState({ message }) {
    return {
        message: message.text,
        negative: message.isNegative
    }
}

export default connect(mapState, { addMessage })(Reset);
