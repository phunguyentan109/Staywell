import Forgot from '../components/Forgot'
import { connect } from "react-redux";
import { addMessage } from "appRedux/actions/message";
import withHelpers from "hocs/withHelpers";

function mapState({ message }) {
    return {
        message: message.text,
        negative: message.isNegative
    }
}

export default connect(mapState, { addMessage })(withHelpers(Forgot))
