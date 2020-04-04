import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import AuthInput from 'components/Auth/AuthInput'
import PropTypes from 'prop-types'

export default function Login({ message, sendAuthData, addMessage, device }) {
    const [account, setAccount] = useState({
        email: '',
        password: ''
    })

    useEffect(() => {
        return () => addMessage()
    }, [addMessage])

    function hdSubmit(e) {
        e.preventDefault()
        sendAuthData('login', account)
    }

    function hdChange(e) {
        const { value, name } = e.target
        setAccount(prev => ({ ...prev, [name]: value }))
    }

    return (
        <div className='content'>
            {
                device.isMobile
                    ? <h1>What a nice day,</h1>
                    : <h1>Welcome to Staywell,</h1>
            }
            <h4>Please enter your account to continue.</h4>
            {
                message || <div className='notify'>
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
            {device.isMobile || <Link to='/forgot'>Forgot your password?</Link>}
        </div>
    )
}

Login.propsTypes = {
    message: PropTypes.string,
    negative: PropTypes.bool,
    addMessage: PropTypes.func
}

Login.defaultProps = {
    message: '',
    negative: false
}
