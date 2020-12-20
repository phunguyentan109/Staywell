import React, { memo, useCallback, useEffect } from 'react'
import PropTypes from 'prop-types'
import { useStore } from 'hooks'

function Login({ message, addMessage, sendAuthData }) {
  const [account, repAccount] = useStore({ email: '', password: '' })

  useEffect(() => { return () => addMessage() }, [addMessage])

  const hdChange = useCallback((e) => {
    const { value, name } = e.target
    repAccount({ [name]: value })
  }, [repAccount])

  const hdSubmit = useCallback((e) => {
    e.preventDefault()
    sendAuthData('login', account)
  },[account, sendAuthData])

  return (
    <div className='content'>
      <h1>Welcome to Staywell,</h1>
      <h1>What a nice day,</h1>
      <h4>Please enter your account to continue.</h4>
      {
        message && <div className='notify'>
          <span>{message}</span>
        </div>
      }
      <form className='auth-form' onSubmit={hdSubmit}>
        <div className='auth-input'>
          <i className='far fa-envelope'/>
          <input
            placeholder='Email'
            name='email'
            value={account.email}
            onChange={hdChange}
          />
        </div>
        <div className='auth-input'>
          <i className='fas fa-key'/>
          <input
            type='password'
            placeholder='Password'
            name='password'
            value={account.password}
            onChange={hdChange}
          />
        </div>
        <button className='signin'>Get access</button>
      </form>
    </div>
  )
}

export default memo(Login)

Login.propTypes = {
  message: PropTypes.string,
  hdSubmit: PropTypes.func,
  hdChange: PropTypes.func,
  addMessage: PropTypes.func,
  sendAuthData: PropTypes.func,
  account: PropTypes.object,
}
