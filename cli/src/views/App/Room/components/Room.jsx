import React, { useState, useEffect, useCallback } from 'react'
import { Row, Col, Card, Table, Button, Divider } from 'antd'
import PropTypes from 'prop-types'

import PopConfirm from 'components/App/Pop/PopConfirm'
import { apiRoom, apiPrice } from 'constants/api'
import RoomForm from '../modules/Form'
import RoomAssign from '../modules/Assign'

import { DEFAULT_ROOM } from '../modules/const'

export default function Room({ notify, setLoading }) {
  const [rooms, setRooms] = useState([])
  const [room, setRoom] = useState(DEFAULT_ROOM)
  const [price, setPrice] = useState([])
  const [form, toggleForm] = useState(false)
  const [assign, toggleAssign] = useState(false)

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
  }, [notify, setLoading])

  useEffect(() => { load() }, [load])

  async function hdRemove(room_id) {
    setLoading(true)
    try {
      await apiRoom.remove(room_id)
      let newRooms = rooms.filter(r => r._id !== room_id)
      setRooms(newRooms)
      notify('success', 'The process is completed', 'The room information is removed successfully!')
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

  async function refreshRoom(record, message, isNewRecord) {
    if(isNewRecord) {
      setRooms(prev => [...prev, record])
    } else {
      let newRooms = rooms.map(r => r._id === record._id ? record : r)
      setRooms(newRooms)
    }
    notify('success', 'Process is completed!', message)
    hdCancel()
    setLoading(false)
  }

  function controlCols() {
    let cols = [
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
    ]

    // If "Assign" or "Form" content is shown, then hide the action
    return assign || form ? cols.filter(c => c.key !== 'action') : cols
  }

  return (
    <Row>
      {
        form && <Col md={10}>
          <RoomForm
            price={price}
            editRoom={room}
            refresh={refreshRoom}
            hdCancel={hdCancel}
          />
        </Col>
      }
      <Col md={(assign || form) ? 14 : 24}>
        <Card title='List of available room'>
          {
            form || <Button
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
            columns={controlCols()}
          />
        </Card>
      </Col>
      {
        assign && <Col md={10}>
          <RoomAssign
            refresh={refreshRoom}
            selectedRoom={room}
            hdCancel={hdCancel}
            notify={notify}
          />
        </Col>
      }
    </Row>
  )
}

Room.propsTypes = {
  notify: PropTypes.func,
  setLoading: PropTypes.func
}
