import React, { useCallback } from 'react'
import { Form, Input, Button } from 'antd'
import PropTypes from 'prop-types'

import useInitState from 'hooks/useInitState'
import { DEFAULT_PROFILE, PASSWORD_INPUT } from '../../const'

const FormItem = Form.Item

export default function ProfileForm({ changePassword }) {
  const [profile, setProfile, clearProfile] = useInitState(DEFAULT_PROFILE)
	
  const hdChange = useCallback((e) => {
    const { name, value } = e.target
    setProfile(prev => ({ ...prev, [name]: value }))
  }, [setProfile])
	
  return (
    <>
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
          <Button type='primary' onClick={() => changePassword({ profile, clearProfile })}>Save changes</Button>
        </FormItem>
      </Form>
    </>
  )
}

ProfileForm.propTypes = {
  changePassword: PropTypes.func,
}