import React, { useState, useEffect, useCallback } from 'react'
import { Row, Col, Card, Table, Divider } from 'antd'
import PropTypes from 'prop-types'

import DeleteAction from 'components/DeleteAction'
import { apiPrice, apiRoom, notify } from 'constants/api'
import useList from 'hooks/useList'
import { DEFAULT_ROOM } from '../modules/const'
import _ from 'lodash'
import TableTransfer from '../modules/TableTransfer'
import { ButtonCreate, EditAction, FormModal } from '../../Price/modules/ModalAction'
import useInitState from 'hooks/useInitState'

export default function Room ({ loading, toggle, visible, setVisible }) {
  const [rooms, setRooms, updateRooms] = useList([])
  const [room, setRoom, clearRoom] = useInitState(DEFAULT_ROOM)
  const [price, setPrice] = useState([])

  const load = useCallback(async() => {
    setVisible({ form: false, transfer: false })
    let roomData = await apiRoom.get()
    let priceData = await apiPrice.get()
    setPrice(priceData)
    setRooms(roomData)
    loading(false)
  }, [loading, setRooms, setVisible])

  useEffect(() => { load() }, [load])
  useEffect(() => {
    !visible.form && !visible.transfer && !_.isEqual(room, DEFAULT_ROOM) && setRoom(DEFAULT_ROOM)
  }, [visible.form, visible.transfer, room, setRoom])

  async function hdRemove(room_id) {
    loading(true)
    await apiRoom.remove({ room_id })
    let newRooms = rooms.filter(r => r._id !== room_id)
    setRooms(newRooms)
    notify('success', 'The room information is removed successfully!')
    loading(false)
  }

  function hdSelect(room) {
    let price_id = _.get(room, 'price_id._id', '')
    setRoom({ ..._.cloneDeep(room), price_id })
  }

  const hdCollect = collect => setRoom(prev => ({ ...prev, ...collect }))
  const hdAssign = room => setRoom(room)

  async function hdCreate() {
    let rs = await apiRoom.create({ data: room })
    updateRooms(rs)
    notify('success', 'Room\'s list is updated successfully')
  }

  async function hdEdit() {
    let rs = await apiRoom.create({ room_id: room._id, data: room })
    updateRooms(rs)
    notify('success', 'Room\'s list is updated successfully')
  }

  return (
    <>
      <Row>
        <Col md={24}>
          <Card title='List of available room'>
            <ButtonCreate onClick={clearRoom} onSubmit={hdCreate} title='Add new price'>
              <FormModal onCollect={hdCollect} room={room} listPrice={price}/>
            </ButtonCreate>
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
                      <EditAction title='Edit price information' onSubmit={hdEdit} onClick={hdSelect}>
                        <FormModal onCollect={hdCollect} room={room} listPrice={price}/>
                      </EditAction>
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
        visible={visible.transfer}
        toggleModal={toggle.bind(this, 'transfer')}
      />
    </>
  )
}

Room.propTypes = {
  loading: PropTypes.func,
  visible: PropTypes.object,
  setVisible: PropTypes.func,
  toggle: PropTypes.func,
}

Room.defaultProps = {
  visible: {
    form: false, transfer: false
  },
}
