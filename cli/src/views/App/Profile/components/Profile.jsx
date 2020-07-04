import React, { useCallback, useState, useEffect } from 'react'
import { Col, Row, Card, Form, Input, Button, DatePicker } from 'antd'
import PropTypes from 'prop-types'
import moment from 'moment'

import About from 'components/profile/About'
import Contact from 'components/profile/Contact'
import ProfileHeader from 'components/profile/ProfileHeader'
import { PermissionRender } from 'containers/Permissions'
import Auxiliary from 'util/Auxiliary'
import { apiUser, notify } from 'constants/api'
import { DEFAULT_PROFILE, DEFAULT_PASSWORD, PROFILE_INPUT, PASSWORD_INPUT } from '../modules/const'

const FormItem = Form.Item

export default function Profile({ loading, user, sendReloadUser }) {
  const [password, setPassword] = useState(DEFAULT_PASSWORD)
  const [profile, setProfile] = useState(DEFAULT_PROFILE)

  const load = useCallback(async () => {
    setProfile(user)
    loading(false)
  }, [user, loading])

  useEffect(() => { load() }, [load])

  async function changePassword() {
    loading(true)
    let { change, confirm, current } = password
    if (change === confirm && current && change && confirm) {
      await apiUser.changePassword(user._id, password)
      setPassword(DEFAULT_PASSWORD)
      notify('success', 'Your password has been changed successfully.')
    } else {
      notify('error', 'Please ensure that all your entered data are valid.')
    }
    loading(false)
  }

  function hdChange(e) {
    // setBirthDate input
    if (e._isAMomentObject) {
      setProfile(prev => ({ ...prev, birthDate: e }))
    } else {
      const { name, value } = e.target

      // setProfile input
      if (DEFAULT_PROFILE.hasOwnProperty(name)) {
        setProfile(prev => ({ ...prev, [name]: value }))
      } else {
        // setPassword input
        setPassword(prev => ({ ...prev, [name]: value }))
      }
    }
  }

  async function hdUpdateProfile(profile) {
    loading(true)
    if (profile.email && profile.job && profile.phone) {
      await apiUser.update(user._id, profile)
      sendReloadUser(user._id)
      setProfile(DEFAULT_PROFILE)
      notify('success', 'Your profile has been updated successfully.')
    } else {
      notify('error', 'Please fill in empty form.')
    }
    loading(false)
  }

  return (
    <Auxiliary>
      <ProfileHeader username={user.username} avatar={user.avatar.link}/>
      <div className='gx-profile-content'>
        <Row>
          <Col xl={16} lg={14} md={14} sm={24} xs={24}>
            <About job={user.job} birthDate={user.birthDate}/>
            <Card className='gx-card' title='Change your profile'>
              <Form layout='horizontal'>
                {/* <PermissionRender access={['PEOPLE_PM']}>
                  <FormItem
                    label='Your email'
                    labelCol={{ xs: 24, sm: 6 }}
                    wrapperCol={{ xs: 24, sm: 16 }}
                  >
                    <Input
                      type='email'
                      placeholder='Enter your email here...'
                      name='email'
                      value={profile.email}
                      onChange={hdChange}
                    />
                  </FormItem>
                </PermissionRender> */}
                {
                  
                  PROFILE_INPUT.map((cur, index) => <PermissionRender 
                    access={cur.access}
                    key={cur.name}
                  >
                    <FormItem
                      label={cur.label}
                      labelCol={{ xs: 24, sm: 6 }}
                      wrapperCol={{ xs: 24, sm: 16 }}    
                    >
                      <Input
                        type={cur.type}
                        placeholder={cur.placeholder}
                        name={cur.name}
                        value={[profile.email, profile.job, profile.phone][index]}
                        onChange={hdChange}
                      />
                    </FormItem>
                  </PermissionRender>
                  )
                }
                <FormItem
                  label='Your birthday'
                  labelCol={{ xs: 24, sm: 6 }}
                  wrapperCol={{ xs: 24, sm: 16 }}
                >
                  <DatePicker
                    className='gx-mb-3 gx-w-100'
                    name='birthDate'
                    onChange={hdChange}
                    value={moment(profile.birthDate)}
                  />
                </FormItem>
                <FormItem
                  wrapperCol={{
                    xs: 24,
                    sm: { span: 14, offset: 6 }
                  }}
                >
                  <Button
                    type='primary'
                    onClick={() => hdUpdateProfile(profile)}>Save changes
                  </Button>
                </FormItem>
              </Form>
            </Card>
          </Col>
          <Col xl={8} lg={10} md={10} sm={24} xs={24}>
            <Contact email={user.email} phone={user.phone}/>
            <Card className='gx-card' title='Change your password'>
              <Form layout='horizontal'>
                {
                  PASSWORD_INPUT.map((cur, index) => <FormItem
                    key={cur.name}
                    label={cur.label}
                    labelCol={{ xs: 24, sm: 7 }}
                    wrapperCol={{ xs: 24, sm: 22 }}
                  >
                    <Input
                      type='password'
                      placeholder={cur.placeholder}
                      name={cur.name}
                      value={[password.current, password.change, password.confirm][index]}
                      onChange={hdChange}
                    />
                  </FormItem>
                  )
                }
                <FormItem
                  wrapperCol={{
                    xs: 24,
                    sm: { span: 14, offset: 6 }
                  }}
                >
                  <Button type='primary' onClick={changePassword}>Save changes</Button>
                </FormItem>
              </Form>
            </Card>
          </Col>
        </Row>
      </div>
    </Auxiliary>
  )
}

Profile.propTypes = {
  user: PropTypes.object,
  role: PropTypes.object,
  loading: PropTypes.func,
  sendReloadUser: PropTypes.func
}

Profile.defaultProps = {
  user: {
    _id: ''
  }
}
