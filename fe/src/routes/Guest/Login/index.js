import React, { useState } from 'react'
import PropTypes from 'prop-types'
import './_styles.less'
import { useDispatch } from 'react-redux'
import { loginAction } from 'appRedux/actions/user'

function Login() {
  const dispatch = useDispatch()

  const [account, setAccount] = useState({ email: '', password: '' })

  const hdChange = e => {
    const { value, name } = e.target
    setAccount(prev => ({ ...prev, [name]: value }))
  }

  const hdSubmit = e => {
    e.preventDefault()
    dispatch(loginAction(account))
  }

  return (
    <div className='login-content'>
      <h1>Welcome to Staywell,</h1>
      <h4>Please enter your account to continue.</h4>

      <form onSubmit={hdSubmit}>
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


