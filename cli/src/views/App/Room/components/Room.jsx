import React, { useState, useEffect, useCallback } from 'react'
import { Row, Col, Card, Table, Button, Divider, Form, Input, Select, Modal } from 'antd'
import PropTypes from 'prop-types'

import DeleteAction from 'components/DeleteAction'
import { apiPrice, apiRoom, notify } from 'constants/api'
import useList from 'hooks/useList'
import { DEFAULT_ROOM } from '../modules/const'
import _ from 'lodash'
import TableTransfer from '../modules/TableTransfer'

const FormItem = Form.Item
const Option = Select.Option

export default function Room ({ setLoading }) {
  const [rooms, setRooms, updateRooms] = useList([])
  const [room, setRoom] = useState(DEFAULT_ROOM)
  const [price, setPrice] = useState([])
  const [modal, setModal] = useState({ form: false, transfer: false })
  const [processing, setProcessing] = useState(false)

  const load = useCallback(async() => {
    let roomData = await apiRoom.get()
    let priceData = await apiPrice.get()
    setPrice(priceData)
    setRooms(roomData)
    setLoading(false)
  }, [setLoading, setRooms])

  useEffect(() => { load() }, [load])
  useEffect(() => {
    !modal.form && !modal.transfer && !_.isEqual(room, DEFAULT_ROOM) && setRoom(DEFAULT_ROOM)
  }, [modal.form, modal.transfer, room])

  const toggle = modal => setModal(prev => ({ ...prev, [modal]: !prev[modal] }))

  async function hdRemove(room_id) {
    setLoading(true)
    await apiRoom.remove(room_id)
    let newRooms = rooms.filter(r => r._id !== room_id)
    setRooms(newRooms)
    notify('success', 'The room information is removed successfully!')
    setLoading(false)
  }

  function hdEdit(room) {
    let price_id = _.get(room, 'price_id._id', '')
    setRoom({ ..._.cloneDeep(room), price_id })
    toggle('form')
  }

  function hdSelectPrice(price_id) {
    setRoom(prev => ({ ...prev, price_id }))
  }

  function hdChange(e) {
    const { name, value } = e.target
    setRoom(prev => ({ ...prev, [name]: value }))
  }

  function hdAssign(room) {
    setRoom(room)
    toggle('transfer')
  }

  async function hdOk() {
    setProcessing(true)
    let rs = room._id ? await apiRoom.update(room._id, room) : await apiRoom.create(room)
    updateRooms(rs)
    toggle('form')
    setProcessing(false)
    notify('success', 'Room\'s list is updated successfully')
  }

  return (
    <>
      <Row>
        <Col md={24}>
          <Card title='List of available room'>
            <Button type='primary' onClick={toggle.bind(this, 'form')}>Add new room</Button>
            <Table
              className='gx-table-responsive'
              dataSource={rooms}
              rowKey='_id'
              columns={[
                { title: 'Room Name', dataIndex: 'name' },
                {
                  title: 'People',
                  dataIndex: 'user_id',
                  render: text => <span>{text.length} people</span>
                },
                {
                  title: 'Price Type',
                  dataIndex: 'price_id',
                  render: col => <span>
                    { col ? col.type : <i>No price applied</i> }
                  </span>
                },
                {
                  title: 'Action',
                  key: 'action',
                  render: (text, record) => (
                    <span>
                      <DeleteAction onConfirm={hdRemove.bind(this, record._id)}/>
                      <Divider type='vertical'/>
                      <span className='gx-link' onClick={hdEdit.bind(this, record)}>Edit</span>
                      <Divider type='vertical'/>
                      <span className='gx-link' onClick={hdAssign.bind(this, record)}>Assign</span>
                    </span>
                  )
                }
              ]}
            />
          </Card>
        </Col>
      </Row>
      <TableTransfer
        roomId={room._id}
        people={room.user_id}
        updateRooms={updateRooms}
        visible={modal.transfer}
        toggleModal={toggle.bind(this, 'transfer')}
      />
      <Modal
        title={room._id ? 'Update Price Information' : 'Create New Price'}
        visible={modal.form}
        onOk={hdOk}
        confirmLoading={processing}
        onCancel={toggle.bind(this, 'form')}
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
              { price.map(v => <Option value={v._id} key={v._id}>{v.type}</Option>) }
            </Select>
          </FormItem>
        </Form>
      </Modal>
    </>
  )
}

Room.propTypes = {
  setLoading: PropTypes.func
}
