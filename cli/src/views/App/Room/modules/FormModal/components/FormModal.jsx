import React, { useState } from 'react'
import { Form, Input, Select, Button, Modal } from 'antd'
import PropTypes from 'prop-types'
import { apiRoom } from 'constants/api'

const FormItem = Form.Item
const Option = Select.Option

function FormModal({ _room, price, visible, toggle, refresh, notify }) {
  const [room, setRoom] = useState(_room)
  const [processing, setProcessing] = useState(false)

  function hdSelectPrice(price_id) {
    setRoom(prev => ({ ...prev, price_id }))
  }

  function hdChange(e) {
    const { name, value } = e.target
    setRoom(prev => ({ ...prev, [name]: value }))
  }

  async function hdOk() {
    setProcessing(true)
    try {
      if(room._id) {
        // run in edit mode
        let updatedRoom = await apiRoom.update(room._id, room)
        let updatedRoomData = await apiRoom.getOne(updatedRoom._id)
        refresh(updatedRoomData, 'Update room successfully!', false)
      } else {
        // run in create mode
        let createdRoom = await apiRoom.create(room)
        let createdRoomData = await apiRoom.getOne(createdRoom._id)
        refresh(createdRoomData, 'Create new room successfully!')
      }
    } catch (e) {
      notify('error')
    }
    setProcessing(false)
  }

  return (
    <Modal
      title={_room._id ? 'Update Price Information' : 'Create New Price'}
      visible={visible}
      onOk={hdOk}
      confirmLoading={processing}
      onCancel={toggle}
    >
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
            { price.map((v, i) => <Option value={v._id} key={i}>{v.type}</Option>) }
          </Select>
        </FormItem>
        <FormItem
          wrapperCol={{
            xs: 24,
            sm: { span: 14, offset: 6 }
          }}
        >
          <Button type='primary' onClick={hdOk}>Submit</Button>
          <Button onClick={toggle}>Cancel</Button>
        </FormItem>
      </Form>
    </Modal>
  )
}

export default FormModal

FormModal.propsTypes = {
  loading: PropTypes.bool,
  setLoading: PropTypes.func,
  hdCancel: PropTypes.func,
  refresh: PropTypes.func,
  notify: PropTypes.func,
  editRoom: PropTypes.object,
  price: PropTypes.array
}
