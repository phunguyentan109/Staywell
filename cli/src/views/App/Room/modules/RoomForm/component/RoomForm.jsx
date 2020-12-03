import React from 'react'
import { Form, Input, Modal, Select } from 'antd'
import PropTypes from 'prop-types'
import { useToggle } from 'hooks'

const FormItem = Form.Item
const Option = Select.Option

export default function RoomForm({ room, price, hdSubmit, title, children }) {
  const [pair, togglePair] = useToggle({ modal: false, process: false })

  function hdChange(e) {
    const { name, value } = e.target
    // onCollect({ [name]: value })
  }

  const hdSelectPrice = price_id => console.log({ price_id })

  return (
    <>
      <span onClick={() => togglePair(['modal'])}>{children}</span>
      <Modal
        title={title}
        visible={pair.modal}
        onCancel={() => togglePair(['modal'])}
        onOk={hdSubmit}
        confirmLoading={pair.process}
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
              {
                price.map(v => (
                  <Option value={v._id} key={v._id}>{v.type}</Option>
                ))
              }
            </Select>
          </FormItem>
        </Form>
      </Modal>
    </>
  )
}

RoomForm.propTypes = {
  show: PropTypes.bool,
  children: PropTypes.any,
  onShow: PropTypes.func,
  title: PropTypes.string,
  onCollect: PropTypes.func,
  hdSubmit: PropTypes.func,
  price: PropTypes.array,
  room: PropTypes.object
}
