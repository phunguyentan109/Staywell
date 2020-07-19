import React from 'react'
import { Form, Input } from 'antd'
import { PRICE_INPUTS } from '../../const'
import PropTypes from 'prop-types'

const FormItem = Form.Item

export const FormModal = ({ onChange, price }) => (
  <Form layout='horizontal'>
    {
      PRICE_INPUTS.map((input, i) => (
        <FormItem
          key={i}
          label={input.label}
          labelCol={{ xs: 24, sm: 6 }}
          wrapperCol={{ xs: 24, sm: 16 }}
        >
          <Input
            type={input.type || 'number'}
            placeholder={`Please enter the ${input.name}`}
            name={input.name}
            value={price[input.name]}
            onChange={onChange}
          />
        </FormItem>
      ))
    }
  </Form>
)

FormModal.propTypes = {
  onChange: PropTypes.func,
  price: PropTypes.object
}
