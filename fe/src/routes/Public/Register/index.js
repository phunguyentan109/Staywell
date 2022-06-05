import React, { useMemo, useState } from 'react'
import _ from 'lodash'
import PropTypes from 'prop-types'
import './_styles.less'
import { DEFAULT_ACCOUNT } from './const'
import { useDispatch, useSelector } from 'react-redux'
import { registerUserAction } from './redux/action'
import { selectRegister } from './redux/selector'

export default function Register(props) {
  const { loading } = useSelector(selectRegister)
  const dp = useDispatch()
  const [account, setAccount] = useState(_.cloneDeep(DEFAULT_ACCOUNT))

  async function hdSubmit(e) {
    e.preventDefault()
    dp(registerUserAction(account, () => {
      setAccount(_.cloneDeep(DEFAULT_ACCOUNT))
    }))
  }

  function hdChange(e) {
    const { value, name } = e.target
    setAccount(prev => ({ ...prev, [name]: value }))
  }

  const isMan = useMemo(() => account.gender === 'man', [account.gender])

  return (
    <div className='register-content'>
      <h1>Sign up</h1>
      <h4>Please fill in below to complete registration</h4>

      <form onSubmit={hdSubmit}>
        <div className='auth-input'>
          <i className='far fa-user'/>
          <input
            placeholder='What should we call you?'
            name='username'
            value={account.username}
            onChange={hdChange}
          />
        </div>

        <div className='auth-input'>
          <i className='far fa-envelope'/>
          <input
            placeholder= 'Email to keep informed'
            name='email'
            onChange={hdChange}
            value={account.email}
          />
        </div>

        <div className='auth-select'>
          <button
            type='button'
            className={isMan ? 'select' : ''}
            onClick={() => setAccount(prev => ({ ...prev, gender: 'man' }))}
          >
            {isMan && <i className='fas fa-male mr-xs'/>} Male
          </button>
          <span>OR</span>
          <button
            type='button'
            className={!isMan ? 'select' : ''}
            onClick={() => setAccount(prev => ({ ...prev, gender: 'woman' }))}
          >
            {isMan || <i className='fas fa-female mr-xs'/>} Female
          </button>
        </div>

        <button type='submit' className='signup' disabled={loading}>
          {
            loading
              ? <i className='fas fa-circle-notch fa-spin'/>
              : 'Confirm'
          }
        </button>
      </form>
    </div>
  )
}

Register.propTypes = {
  register: PropTypes.object,
  addMessage: PropTypes.func,
  registerUserAction: PropTypes.func,
  hdRegister: PropTypes.func
}

Register.defaultProps = {
  message: '',
  allow: false
}
