import React, { useState, useEffect } from 'react'
import { apiUser } from 'constants/api'
import { Link } from 'react-router-dom'
import AuthInput from 'components/Auth/AuthInput'
import PropTypes from 'prop-types'

import { DEFAULT_ACCOUNT } from '../modules/const'

export default function ResetPassword({ message, negative, addMessage, match }) {
  const [account, setAccount] = useState(DEFAULT_ACCOUNT)
  const [loading, setLoading] = useState(false)

  useEffect(() => { return () => addMessage() }, [addMessage])

  async function hdSubmit(e) {
    e.preventDefault()
    setLoading(true)
    try {
      const { password, cpassword } = account
      const { token } = match.params
      if (!password || !cpassword) {
        addMessage('Please complete form to reset password')
      } else if (password !== cpassword) {
        addMessage('Your entered password is invalid. Please try again')
      } else {
        await apiUser.reset({ token, data: { password } }, true)
        setAccount(DEFAULT_ACCOUNT)
        addMessage('Your reset link has been sent to your mail.', false)
      }
    } catch (err) {
      addMessage(err.errorMsg)
    }
    setLoading(false)
  }

  function hdChange(e) {
    const { value, name } = e.target
    setAccount(prev => ({ ...prev, [name]: value }))
  }

  return (
    <div className='content'>
      <h1>Reset password</h1>
      <h4>Please enter your new password and confirm password.</h4>
      {
        message && <div className={`${negative ? 'notify' : 'great-notify'}`}>
          <span>{ message || '' }</span>
        </div>
      }
      <form className='auth-form' onSubmit={hdSubmit}>
        <AuthInput
          type='password'
          placeholder='Password'
          name='password'
          icon='fas fa-key'
          value={account.password}
          onChange={hdChange}
        />
        <AuthInput
          type='password'
          placeholder='Confirm Password'
          name='cpassword'
          icon='fas fa-key'
          value={account.cpassword}
          onChange={hdChange}
        />
        <button className='signup' disabled={loading}>
          {
            loading
              ? <i className='fas fa-circle-notch fa-spin'/>
              : 'Reset password'
          }
        </button>
      </form>
      <Link to='/'>Back to login page</Link>
    </div>
  )
}

ResetPassword.propTypes = {
  message: PropTypes.string,
  negative: PropTypes.bool,
  addMessage: PropTypes.func,
  match: PropTypes.object
}

ResetPassword.defaultProps = {
  message: '',
  negative: false
}
