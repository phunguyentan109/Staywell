import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import './_styles.less'
import { useDispatch, useSelector } from 'react-redux'
import { addMessage, sendAuthData } from 'appRedux/actions'

function Login() {
  const msg = useSelector(({ message }) => message)
  const dispatch = useDispatch()

  const [account, setAccount] = useState({ email: '', password: '' })

  useEffect(() => { return () => addMessage() }, [])

  const hdChange = e => {
    const { value, name } = e.target
    setAccount(prev => ({ ...prev, [name]: value }))
  }

  const hdSubmit = e => {
    e.preventDefault()
    dispatch(sendAuthData('login', account))
  }

  return (
    <div className='login-content'>
      <h1>Welcome to Staywell,</h1>
      <h1>What a nice day,</h1>
      <h4>Please enter your account to continue.</h4>
      {
        msg.text && <div className='notify'><span>{msg.text}</span></div>
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

Login.propTypes = {
  message: PropTypes.string,
  hdSubmit: PropTypes.func,
  hdChange: PropTypes.func,
  addMessage: PropTypes.func,
  sendAuthData: PropTypes.func,
  account: PropTypes.object,
}

export default Login


