import React, { useState, useEffect } from 'react'
import AuthInput from 'components/Auth/AuthInput'
import { apiUser } from 'constants/api'
import PropTypes from 'prop-types'

export default function Forgot({ message, negative, addMessage }) {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => { return () => addMessage() }, [addMessage])

  async function hdSubmit(e) {
    e.preventDefault()
    setLoading(true)
    try {
      if (email.length > 0) {
        if (email.indexOf('@') !== -1) {
          await apiUser.forgot({ data: { email } }, true)
          setEmail('')
          addMessage('Reset password successfully', false)
        } else {
          addMessage('Your email has incorrect format')
          setLoading(false)
        }
      } else {
        addMessage('Please enter your email before submission.')
        setLoading(false)
      }
    } catch (err) {
      console.error(err)
      addMessage(err)
    }
    setLoading(false)
  }

  return (
    <div className='content'>
      <h1>Forgot password?</h1>
      <h4>Please fill in your email below to reset password.</h4>
      {
        message && <div className={`${negative ? 'notify' : 'great-notify'}`}>
          <span>{ message ? message : '' }</span>
        </div>
      }
      <form className='auth-form' onSubmit={hdSubmit}>
        <AuthInput
          placeholder='Email'
          name='email'
          icon='far fa-envelope'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button className='signup' disabled={loading}>
          {
            loading
              ? <i className='fas fa-circle-notch fa-spin'/>
              : 'Reset password'
          }
        </button>
      </form>
    </div>
  )
}

Forgot.propTypes = {
  message: PropTypes.object,
  addMessage: PropTypes.func,
  negative: PropTypes.bool
}

Forgot.defaultProps = {
  message: {
    text: '',
    isNegative: false
  }
}
