import React, { useCallback } from 'react'
import { Form, Input, Button, DatePicker } from 'antd'
import moment from 'moment'
import _ from 'lodash'
import PropTypes from 'prop-types'

import { PROFILE_INPUT } from '../../const'

const FormItem = Form.Item

export default function ProfileForm({ hdUpdateProfile, profile, repProfile, setProfile }) {
  const hdChange = useCallback((e) => {
    if (_.get(e, '_isAMomentObject')) {
      setProfile(prev => ({ ...prev, birthDate: e }))
    } else {
      const { name, value } = e.target
      repProfile({ [name]: value })
    }
  }, [repProfile, setProfile])
	
  return (
    <Form layout='horizontal'>
      {
        PROFILE_INPUT.map((inp, idx) => <FormItem
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
      <Button type='primary' onClick={() => hdUpdateProfile({ profile })}>Save changes</Button>
    </Form>
  )
}

ProfileForm.propTypes = {
  profile: PropTypes.object,
  repProfile: PropTypes.func,
  setProfile: PropTypes.func,
  hdUpdateProfile: PropTypes.func,
}