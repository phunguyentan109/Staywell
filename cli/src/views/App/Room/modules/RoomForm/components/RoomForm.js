import React from 'react'
import { Form, Input, Select } from 'antd'
import PropTypes from 'prop-types'

const FormItem = Form.Item
const Option = Select.Option

export default function RoomForm({ room, onCollect, listPrice }) {
  function hdChange(e) {
    const { name, value } = e.target
    onCollect({ [name]: value })
  }

  const hdSelectPrice = price_id => onCollect({ price_id })

  return (
    <Form layout='horizontal'>
      <FormItem
        label='Type'
        labelCol={{ xs: 24, sm: 6 }}
        wrapperCol={{ xs: 24, sm: 16 }}
      >
        <Input
          placeholder="Enter the room's name here..."
          name='name'
          value={room.name}
          onChange={hdChange}
        />
      </FormItem>
      <FormItem
        label='Select price'
        labelCol={{ xs: 24, sm: 6 }}
        wrapperCol={{ xs: 24, sm: 16 }}
      >
        <Select
          mode='single'
          style={{ width: '100%' }}
          placeholder='Pick a price'
          onChange={hdSelectPrice}
          value={room.price_id}
        >
          { listPrice.map(v => <Option value={v._id} key={v._id}>{v.type}</Option>) }
        </Select>
      </FormItem>
    </Form>
  )
}

RoomForm.propTypes = {
  onCollect: PropTypes.func,
  listPrice: PropTypes.array,
  room: PropTypes.object
}
