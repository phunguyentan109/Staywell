import React, { useCallback } from 'react'
import { Form, Input, Button } from 'antd'
import PropTypes from 'prop-types'

import { PASSWORD_INPUT } from '../../const'

const FormItem = Form.Item

export default function PasswordForm({ password, repPassword, changePassword }) {	
  const hdChange = useCallback((e) => {
    const { name, value } = e.target
    repPassword({ [name]: value })
  }, [repPassword])
	
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
              value={password[cur.name]}
              onChange={hdChange}
            />
          </FormItem>
          )
        }
        <FormItem wrapperCol={{ xs: 24, sm: { span: 14, offset: 6 } }}>
          <Button type='primary' onClick={() => changePassword({ password })}>Save changes</Button>
        </FormItem>
      </Form>
    </>
  )
}

PasswordForm.propTypes = {
  password: PropTypes.object,
  repPassword: PropTypes.func,
  changePassword: PropTypes.func,
}