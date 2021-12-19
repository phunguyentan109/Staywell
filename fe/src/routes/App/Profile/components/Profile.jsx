import React, { memo } from 'react'
import { Col, Row, Card } from 'antd'
import PropTypes from 'prop-types'

import About from 'components/profile/About'
import Contact from 'components/profile/Contact'
import ProfileHeader from 'components/profile/ProfileHeader'
import Auxiliary from 'util/Auxiliary'
import ProfileForm from '../modules/ProfileForm'
import ChangePasswordForm from '../modules/ChangePassForm'

function Profile({ user }) {
  return (
    <Auxiliary>
      <ProfileHeader username={user.username} avatar={user.avatar.link}/>
      <div className='gx-profile-content'>
        <Row>
          <Col xl={16} lg={14} md={14} sm={24} xs={24}>
            <About job={user.job} birthDate={user.birthDate}/>
            <Card className='gx-card' title='Edit your information'>
              <ProfileForm/>
            </Card>
          </Col>
          <Col xl={8} lg={10} md={10} sm={24} xs={24}>
            <Contact email={user.email} phone={user.phone}/>
            <Card className='gx-card' title='Change your password'>
              <ChangePasswordForm/>
            </Card>
          </Col>
        </Row>
      </div>
    </Auxiliary>
  )
}

export default memo(Profile)

Profile.propTypes = {
  user: PropTypes.object,
  profile: PropTypes.object, 
  setProfile: PropTypes.func, 
  clearProfile: PropTypes.func, 
}

Profile.defaultProps = {
  user: { 
    _id: '',
    username: '',
    avatar: {
      link: ''
    },
    job: '',
    birthDate: '',
    phone:'',
    email: ''
  }
}
