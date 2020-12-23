import React, { useCallback, useEffect } from 'react'
import { Form, Input, Button, DatePicker } from 'antd'
import moment from 'moment'
import _ from 'lodash'
import PropTypes from 'prop-types'

import { PermissionRender } from 'containers/Permissions'
import { offLoading, onLoading } from 'constants/func'
import useInitState from 'hooks/useInitState'
import { DEFAULT_PROFILE, PROFILE_INPUT } from '../../const'

const FormItem = Form.Item

export default function ProfileForm({ hdUpdateProfile, user }) {
  const [profile, setProfile, clearProfile] = useInitState(DEFAULT_PROFILE)

  const load = useCallback(() => {
    onLoading()
    setProfile(user)
    offLoading()
  }, [setProfile, user])

  useEffect(() => { load() }, [load])
	
  const hdChange = useCallback((e) => {
    if (_.get(e, '_isAMomentObject')) {
      setProfile(prev => ({ ...prev, birthDate: e }))
    } else {
      const { name, value } = e.target
      setProfile(prev => ({ ...prev, [name]: value }))
    }
  }, [setProfile])
	
  return (
    <>
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
            onChange={hdChange}
            value={moment(profile.birthDate)}
          />
        </FormItem>
        <Button type='primary' onClick={() => hdUpdateProfile({ profile, clearProfile })}>Save changes</Button>
      </Form>
    </>
  )
}

ProfileForm.propTypes = {
  user: PropTypes.object,
  hdUpdateProfile: PropTypes.func,
}