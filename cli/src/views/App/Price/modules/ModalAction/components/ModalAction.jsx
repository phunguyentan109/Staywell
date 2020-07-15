import React from 'react'
import { Button, Form, Input } from 'antd'
import withToggleModal from 'hocs/withToggleModal'
import { PRICE_INPUTS } from '../../const'
import PropTypes from 'prop-types'

const FormItem = Form.Item

export const ButtonCreate = withToggleModal(() => <Button type='primary'>Add new price</Button>)
export const EditAction = withToggleModal(() => <span className='gx-link'>Edit</span>)

export const FormModal = ({ hdChange, price }) => (
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
            onChange={hdChange}
          />
        </FormItem>
      ))
    }
  </Form>
)

FormModal.propTypes = {
  hdChange: PropTypes.func,
  price: PropTypes.object
}
