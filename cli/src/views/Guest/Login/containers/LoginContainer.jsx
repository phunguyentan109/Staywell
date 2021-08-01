import React, { memo } from 'react'
import Login from '../components/Login'
import { connect } from 'react-redux'
import { sendAuthData } from 'appRedux/actions/user'
import { addMessage } from 'appRedux/actions/message'

function LoginContainer(props) {
  return <Login {...props} />
}

function mapState({ message }) {
  return {
    message: message.text,
    negative: message.isNegative
  }
}

export default connect(mapState, { sendAuthData, addMessage })(memo(LoginContainer))
