import React, { useState, useEffect } from 'react'
import _ from 'lodash'
import PropTypes from 'prop-types'

import { DEFAULT_ACCOUNT } from '../modules/const'
import bg from 'assets/img/loginBg.jpg'
import PublicNavbar from 'containers/Bar/Navbar'

export default function Register() {
  const [account, setAccount] = useState(_.cloneDeep(DEFAULT_ACCOUNT))
  const [loading, setLoading] = useState(false)

  function hdSubmit(e) {
    setLoading(true)
    try {
      e.preventDefault()
      let isValidPassword = account.password === account.cpassword
      let isNotEmpty = account.email.length > 0 && account.password.length > 0
      if (isNotEmpty && isValidPassword) {
        setAccount(DEFAULT_ACCOUNT)
        // addMessage('An email has been sent, please check and follow to activate your account', false)
      } else {
        // addMessage('The entered information is not valid. Please try again')
        setLoading(false)
      }
    } catch (err) {
      console.log(err)
      // addMessage(err)
    }
    setLoading(false)
  }

  function hdChange(e) {
    const { value, name } = e.target
    setAccount(prev => ({ ...prev, [name]: value }))
  }

  return (
    <div className='auth-bg' style={{ backgroundImage: `url(${bg})` }}>
      <div style={{ backgroundColor: 'rgba(0, 0, 0, 0.3)' }}>
        <PublicNavbar/>
        <div className='content'>
          <h1>Sign up</h1>
          <h4>Please fill in below to complete registration.</h4>
          {/*{*/}
          {/*  message.length > 0 && <div className={`${negative ? 'notify' : 'great-notify'}`}>*/}
          {/*    <span>{message}</span>*/}
          {/*  </div>*/}
          {/*}*/}
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
            <div className='auth-input'>
              <i className='fas fa-key'/>
              <input
                type='password'
                placeholder='Confirm Password'
                name='cpassword'
                value={account.cpassword}
                onChange={hdChange}
              />
            </div>
            <button className='signup' disabled={loading}>
              {
                loading
                  ? <i className='fas fa-circle-notch fa-spin'/>
                  : 'Create account'
              }
            </button>
          </form>
        </div>
        <div className='auth-credit'>
          <p>©2019, designed and coded by Phu Nguyen</p>
          <p>
            ©2019, designed and coded with all my
            <i className='fas fa-heartbeat'/> and <i className='fas fa-coffee'/> | Phu Nguyen
          </p>
        </div>
      </div>
    </div>
  )
}

Register.propTypes = {
  message: PropTypes.string,
  allow: PropTypes.bool,
  addMessage: PropTypes.func,
  sendAuthData: PropTypes.func
}

Register.defaultProps = {
  message: '',
  allow: false
}
