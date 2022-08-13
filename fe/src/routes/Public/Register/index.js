import React, { useMemo, useState } from 'react'
import _ from 'lodash'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import Avatar, { genConfig } from 'react-nice-avatar'
import { Col, Row } from 'antd'
import './_styles.less'
import { AVATAR_CONFIG, DEFAULT_ACCOUNT, DEFAULT_AVATAR } from './const'
import { registerUserAction } from './redux/action'
import { selectRegister } from './redux/selector'
import SelectConfig from './components/SelectConfig'

export default function Register(props) {
  const { loading } = useSelector(selectRegister)
  const dp = useDispatch()
  const [account, setAccount] = useState(_.cloneDeep(DEFAULT_ACCOUNT))
  const [avatar, setAvatar] = useState(_.cloneDeep(DEFAULT_AVATAR))
  const [editAvatar, setEditAvatar] = useState(true)

  async function hdSubmit(e) {
    e.preventDefault()
    dp(
      registerUserAction(
        {
          ...account,
          avatar: JSON.stringify(avatar),
        },
        () => {
          setAccount(_.cloneDeep(DEFAULT_ACCOUNT))
        }
      )
    )
  }

  function hdChange(e) {
    const { value, name } = e.target
    setAccount((prev) => ({ ...prev, [name]: value }))
  }

  const isMan = useMemo(() => avatar.sex === AVATAR_CONFIG.sex[0], [avatar.sex])

  function hdChangeAvatarSelector(value, name) {
    setAvatar((prev) => ({ ...prev, [name]: value }))
  }

  function hdChangeAvatar(e) {
    const { value, name } = e.target
    setAvatar((prev) => ({ ...prev, [name]: value }))
  }

  const hdChangeSelect = () => {}

  return (
    <div className={`register-content ${editAvatar ? 'avatar-config' : ''}`}>
      <Row justify='center' align='middle'>
        <Col>
          <div className='avatar-form'>
            <Row
              className='content'
              align='middle'
              justify='center'
              gutter={[16, 16]}
            >
              <Col span={24}>
                <Row justify='center' gutter={[16, 29]}>
                  <Avatar className='avatar' {...genConfig(avatar)} />

                  <Col span={24}>
                    <Row className='tabs' justify='center' align='middle'>
                      <Col
                        className={`tab ${isMan ? 'active' : ''}`}
                        onClick={() =>
                          setAvatar((prev) => ({
                            ...prev,
                            sex: AVATAR_CONFIG.sex[0],
                          }))
                        }
                      >
                        Male
                      </Col>
                      <Col
                        className={`tab ${!isMan ? 'active' : ''}`}
                        onClick={() =>
                          setAvatar((prev) => ({
                            ...prev,
                            sex: AVATAR_CONFIG.sex[1],
                          }))
                        }
                      >
                        Female
                      </Col>
                    </Row>
                  </Col>

                  <Col span={24}>
                    <SelectConfig
                      label='Hair'
                      options={[]}
                      onChange={hdChangeSelect}
                    />
                  </Col>

                  <Col span={24}>
                    <SelectConfig
                      label='Eyes'
                      options={[]}
                      onChange={hdChangeSelect}
                    />
                  </Col>

                  <Col span={24}>
                    <SelectConfig
                      label='Nose'
                      options={[]}
                      onChange={hdChangeSelect}
                    />
                  </Col>

                  <Col span={24}>
                    <SelectConfig
                      label='Hat'
                      options={[]}
                      onChange={hdChangeSelect}
                    />
                  </Col>
                </Row>
              </Col>
            </Row>
          </div>

          <div className='register-form'>
            <div className='top b1' />
            <div className='top b2' />
            <div className='top b3' />
            <div className='top b4' />
            <div className='bottom round' />

            <div className='avatar-wrapper'>
              <Avatar className='avatar' {...genConfig(avatar)} />
              <div
                data-fas={true}
                className='edit'
                onClick={() => setEditAvatar((prev) => !prev)}
              >
                &#xf4ff;
              </div>
            </div>

            <h1>Welcome,</h1>
            <h4>Please fill in below to complete your registration</h4>

            <form onSubmit={hdSubmit}>
              <Row justify='center' gutter={[0, 18]}>
                <Col span={24}>
                  <Row align='middle' className='input' wrap={false}>
                    <Col>
                      <i className='far fa-user' />
                    </Col>
                    <Col>
                      <input
                        placeholder='What should we call you?'
                        name='username'
                        value={account.username}
                        onChange={hdChange}
                      />
                    </Col>
                  </Row>
                </Col>

                <Col span={24}>
                  <Row align='middle' className='input' wrap={false}>
                    <Col>
                      <i className='far fa-envelope' />
                    </Col>
                    <Col>
                      <input
                        placeholder='Email to keep informed'
                        name='email'
                        onChange={hdChange}
                        value={account.email}
                      />
                    </Col>
                  </Row>
                </Col>

                <Col span={24}>
                  <button className='signup' disabled={loading}>
                    Confirm & Next
                  </button>
                </Col>

                <Col span={24} style={{ marginTop: 5, color: '#8E8E8E' }}>
                  By clicking confirm and next, you have read, understood and
                  agreed with our{' '}
                  <span style={{ color: '#06a3a3' }}>Term of Service</span>
                </Col>
              </Row>
            </form>
          </div>
        </Col>
      </Row>
    </div>
  )
}

Register.propTypes = {
  register: PropTypes.object,
  addMessage: PropTypes.func,
  registerUserAction: PropTypes.func,
  hdRegister: PropTypes.func,
}

Register.defaultProps = {
  message: '',
  allow: false,
}
