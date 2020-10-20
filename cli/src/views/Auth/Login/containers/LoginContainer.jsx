import React, { useState, useEffect, useCallback, memo } from 'react'
import Login from '../components/Login'
import { connect } from 'react-redux'
import { sendAuthData } from 'appRedux/actions/user'
import { addMessage } from 'appRedux/actions/message'
import PropTypes from 'prop-types'

function LoginContainer({ sendAuthData, addMessage, message }) {
  const [account, setAccount] = useState({
    email: '',
    password: ''
  })

  useEffect(() => { return () => addMessage() }, [addMessage])

  const hdSubmit = useCallback((e) => {
    e.preventDefault()
    sendAuthData('login', account)
  },[account, sendAuthData])

  const hdChange = useCallback((e) => {
    const { value, name } = e.target
    setAccount(prev => ({ ...prev, [name]: value }))
  }, [])

  return <Login
    hdSubmit={hdSubmit}
    hdChange={hdChange}
    account={account}
    message={message}
  />
}

function mapState({ message }) {
  return {
    message: message.text,
    negative: message.isNegative
  }
}

export default connect(mapState, { sendAuthData, addMessage })(memo(LoginContainer))

LoginContainer.propTypes = {
  negative: PropTypes.bool,
  message: PropTypes.string,
  sendAuthData: PropTypes.func,
  addMessage: PropTypes.func
}

LoginContainer.defaultProps = {
  negative: false,
  message: ''
}