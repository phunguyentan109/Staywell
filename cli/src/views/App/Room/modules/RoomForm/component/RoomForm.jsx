import React, { useCallback, useEffect } from 'react'
import { Form, Input, Modal, Select } from 'antd'
import PropTypes from 'prop-types'
import _ from 'lodash'
import { useStore, useToggle } from 'hooks'

const FormItem = Form.Item
const Option = Select.Option

export default function RoomForm({ value, price, hdSubmit, title, children, getPrice }) {
  const [room, repRoom] = useStore({ name: '' })
  const [pair, togglePair] = useToggle({ modal: false, process: false })

  useEffect(() => {
    value && repRoom({
      name: value.name,
      price_id: _.get(value, 'price_id._id')
    })
  }, [repRoom, value])

  const hdChange = useCallback(e => {
    const { name, value } = e.target
    repRoom({ [name]: value })
  }, [repRoom])

  const toggleModal = useCallback(async() => {
    if (!pair.modal) await getPrice()
    togglePair(['modal'])
  }, [getPrice, pair.modal, togglePair])

  const hdOk = useCallback(async() => {
    togglePair(['process'])
    let rs = await hdSubmit(room)
    rs.status === 200 && togglePair(['modal'])
    togglePair(['process'])
  }, [hdSubmit, room, togglePair])

  return (
    <>
      <span onClick={toggleModal}>{children}</span>
      <Modal
        title={title}
        visible={pair.modal}
        onCancel={() => togglePair(['modal'])}
        onOk={hdOk}
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
              onChange={price_id => repRoom({ price_id })}
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
  getPrice: PropTypes.func,
  title: PropTypes.string,
  onCollect: PropTypes.func,
  hdSubmit: PropTypes.func,
  price: PropTypes.array,
  loadRef: PropTypes.object,
  value: PropTypes.object
}
