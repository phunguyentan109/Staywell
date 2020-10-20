import React, { memo } from 'react'
import AuthInput from 'components/Auth/AuthInput'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

function Login({ message, hdSubmit, hdChange, account }) {
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
        <AuthInput
          placeholder='Email'
          name='email'
          icon='far fa-envelope'
          value={account.email}
          onChange={hdChange}
        />
        <AuthInput
          type='password'
          placeholder='Password'
          name='password'
          icon='fas fa-key'
          value={account.password}
          onChange={hdChange}
        />
        <button className='signin'>Get access</button>
      </form>
      <Link to='/forgot'>Forgot your password?</Link>
    </div>
  )
}

export default memo(Login)

Login.propTypes = {
  message: PropTypes.string,
  hdSubmit: PropTypes.func,
  hdChange: PropTypes.func,
  account: PropTypes.object,
}
