import React, { useEffect, useCallback } from 'react'
import { Col, Row, Card, Form, Input, Button, DatePicker } from 'antd'
import PropTypes from 'prop-types'
import moment from 'moment'
import _ from 'lodash'

import About from 'components/profile/About'
import Contact from 'components/profile/Contact'
import ProfileHeader from 'components/profile/ProfileHeader'
import { PermissionRender } from 'containers/Permissions'
import Auxiliary from 'util/Auxiliary'
import { apiUser, notify } from 'constants/api'
import { DEFAULT_PROFILE, PROFILE_INPUT, PASSWORD_INPUT } from '../modules/const'
import useInitState from 'hooks/useInitState'

const FormItem = Form.Item

export default function Profile({ loading, user, sendReloadUser }) {
  const [profile, setProfile, clearProfile] = useInitState(DEFAULT_PROFILE)

  const load = useCallback(() => {
    setProfile(user)
    loading(false)
  }, [setProfile, user, loading])

  useEffect(() => { load() }, [load])

  async function changePassword() {
    loading(true)
    let { change, confirm, current } = profile
    if (current && change && change === confirm) {
      await apiUser.password({ user_id: user._id, data: { password: change } })
      clearProfile('current', 'change', 'confirm')
      notify('success', 'Your password has been updated.')
    } else {
      notify('error', 'Please entered valid information.')
    }
    loading(false)
  }

  function hdChange(e) {
    const { name, value } = e.target
    setProfile(prev => ({ ...prev, [name]: value }))
  }

  async function hdUpdateProfile() {
    loading(true)
    if (profile.email) {
      let keys = ['email', 'job', 'phone', 'birthDay']
      await apiUser.update({ user_id: user._id, data: _.pick(profile, keys) })
      sendReloadUser(user._id)
      clearProfile(...keys)
      notify('success', 'Your profile has been updated successfully.')
    } else {
      notify('error', 'Please entered valid information.')
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
            <Card className='gx-card' title='Edit your information'>
              <Form layout='horizontal'>
                {
                  PROFILE_INPUT.map((inp, idx) => <PermissionRender
                    access={inp.access}
                    key={idx}
                  >
                    <FormItem
                      label={inp.label}
                      labelCol={{ xs: 24, sm: 6 }}
                      wrapperCol={{ xs: 24, sm: 16 }}
                    >
                      <Input
                        type={inp.type || 'text'}
                        placeholder={inp.placeholder}
                        name={inp.name}
                        value={profile[inp.name]}
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
                    onChange={birthDay => setProfile(prev => ({ ...prev, birthDay }))}
                    value={moment(profile.birthDay)}
                  />
                </FormItem>
                <Button type='primary' onClick={hdUpdateProfile}>Save changes</Button>
              </Form>
            </Card>
          </Col>
          <Col xl={8} lg={10} md={10} sm={24} xs={24}>
            <Contact email={user.email} phone={user.phone}/>
            <Card className='gx-card' title='Change your password'>
              <Form layout='horizontal'>
                {
                  PASSWORD_INPUT.map((cur, idx) => <FormItem
                    label={cur.label}
                    key={idx}
                    labelCol={{ xs: 24, sm: 7 }}
                    wrapperCol={{ xs: 24, sm: 22 }}
                  >
                    <Input
                      type='password'
                      placeholder={cur.placeholder}
                      name={cur.name}
                      value={profile[cur.name]}
                      onChange={hdChange}
                    />
                  </FormItem>
                  )
                }
                <FormItem wrapperCol={{ xs: 24, sm: { span: 14, offset: 6 } }}>
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
  user: { _id: '' }
}
