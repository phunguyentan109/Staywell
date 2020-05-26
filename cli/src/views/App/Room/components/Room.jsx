import React, { useState, useEffect, useCallback, Fragment } from 'react'
import { Row, Col, Card, Table, Button, Divider, Form, Input, Select, Modal } from 'antd'
import PropTypes from 'prop-types'

import PopConfirm from 'components/App/Pop/PopConfirm'
import { apiRoom, apiPrice } from 'constants/api'
import FormModal from '../modules/FormModal'
import RoomAssign from '../modules/Assign'
import useList from 'hooks/useList'

import { DEFAULT_ROOM } from '../modules/const'
const FormItem = Form.Item
const Option = Select.Option

export default function Room({ notify, setLoading }) {
  const [rooms, setRooms, updateRooms] = useList([])
  const [room, setRoom] = useState(DEFAULT_ROOM)
  const [price, setPrice] = useState([])
  const [form, toggleForm] = useState(false)
  const [assign, toggleAssign] = useState(false)
  const [processing, setProcessing] = useState(false)

  const load = useCallback(async() => {
    try {
      let roomData = await apiRoom.get()
      let priceData = await apiPrice.get()
      setPrice(priceData)
      setRooms(roomData)
      setLoading(false)
    } catch (e) {
      notify('error', 'The data cannot be loaded!')
    }
  }, [notify, setLoading, setRooms])

  useEffect(() => { load() }, [load])

  async function hdRemove(room_id) {
    setLoading(true)
    try {
      await apiRoom.remove(room_id)
      let newRooms = rooms.filter(r => r._id !== room_id)
      setRooms(newRooms)
      notify('success', 'The room information is removed successfully!')
    } catch (e) {
      notify('error', 'The process is not completed')
    }
    setLoading(false)
  }

  function hdEdit(room) {
    toggleForm(true)
    setRoom(prev => ({ ...prev, ...room, price_id: room.price_id._id }))
  }

  function hdCancel() {
    setRoom(DEFAULT_ROOM)
    toggleForm(false)
    toggleAssign(false)
  }

  function hdAssign(room) {
    setLoading(true)
    setRoom(prev => ({
      ...prev, ...room,
      user_id: [...room.user_id]
    }))
    toggleAssign(true)
  }

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
      let rs = room._id ? await apiRoom.update(room._id, room) : await apiRoom.create(room)
      updateRooms(rs)
    } catch (e) {
      notify('error')
    }
    setProcessing(false)
  }

  return (
    <Fragment>
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
      {
        assign && <Col md={10}>
          <RoomAssign
            refresh={updateRooms}
            selectedRoom={room}
            hdCancel={hdCancel}
            notify={notify}
          />
        </Col>
      }
      <Row>
        <Col md={24}>
          <Card title='List of available room'>
            <Button
              type='primary'
              onClick={() => toggleForm(true)}
            >
              Add new room information
            </Button>
            }
            <Table
              className='gx-table-responsive'
              dataSource={rooms}
              rowKey='_id'
              columns={[
                {
                  title: 'Room Name',
                  dataIndex: 'name',
                },
                {
                  title: 'People',
                  dataIndex: 'user_id',
                  render: text => <span>{text.length} people</span>
                },
                {
                  title: 'Price Type',
                  dataIndex: 'price_id.type'
                },
                {
                  title: 'Action',
                  key: 'action',
                  render: (text, record) => room._id ? <span>None</span> : (
                    <span>
                      <PopConfirm
                        title='Are you sure to delete this genre?'
                        task={hdRemove.bind(this, record._id)}
                        okText='Sure, remove it'
                        cancelText='Not now'
                      >
                        <span className='gx-link'>Delete</span>
                      </PopConfirm>
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
    </Fragment>
  )
}

Room.propsTypes = {
  notify: PropTypes.func,
  setLoading: PropTypes.func
}
