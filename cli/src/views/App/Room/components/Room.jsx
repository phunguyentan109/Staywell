import React, { useState, useEffect, useCallback } from 'react'
import { Card, Table, Divider, Button } from 'antd'
import PropTypes from 'prop-types'
import _ from 'lodash'

import DeleteAction from 'components/DeleteAction'
// import { apiPrice, apiRoom, notify } from 'constants/api'
import { DEFAULT_ROOM } from '../modules/const'
import TableTransfer from '../modules/TableTransfer'
import { createEditModal, createCreateModal } from 'components/Modal'
import RoomForm from '../modules/RoomForm'

// import useList from 'hooks/useList'
import useInitState from 'hooks/useInitState'

// const CreateModal = createCreateModal('Add new room', 'Enter room\'s information')
const EditModal = createEditModal('Edit', 'Edit room\'s information')

export default function Room ({ rooms, updateRooms }) {
  // const [rooms, setRooms, updateRooms] = useList([])
  const [room, setRoom, clearRoom] = useInitState(DEFAULT_ROOM)
  // const [price, setPrice] = useState([])

  // const load = useCallback(async() => {
  //   let roomData = await apiRoom.get()
  //   let priceData = await apiPrice.get()
  //   setPrice(priceData)
  //   setRooms(roomData)
  //   loading(false)
  // }, [loading, setRooms])

  // useEffect(() => { load() }, [load])
  //
  async function hdRemove(room_id) {
    // loading(true)
    // await apiRoom.remove({ room_id })
    // setRooms(_.filter(rooms, r => r._id !== room_id))
    // notify('success', 'The room information is removed successfully!')
    // loading(false)
  }

  function hdSelect(room) {
    let price_id = _.get(room, 'price_id._id', '')
    setRoom({ ..._.cloneDeep(room), price_id })
  }

  const hdCollect = collect => setRoom(prev => ({ ...prev, ...collect }))

  // async function hdCreate() {
  //   let rs = await apiRoom.create({ data: room })
  //   updateRooms(rs)
  //   notify('success', 'Process\'s completed. Room\'s list is updated successfully')
  // }
  //
  async function hdEdit() {
    // let rs = await apiRoom.update({ room_id: room._id, data: room })
    // updateRooms(rs)
    // notify('success', 'Room\'s list is updated successfully')
  }

  return (
    <Card className='gx-card' title='List of available rooms'>
      {/*<CreateModal onClick={clearRoom} onSubmit={hdCreate}>*/}
      <RoomForm room={room} title={'Enter room\'s information'}>
        <Button type='primary'>Add new room</Button>
      </RoomForm>
      {/*</CreateModal>*/}
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
              <>
                <DeleteAction onConfirm={hdRemove.bind(this, record._id)}/>
                <Divider type='vertical'/>
                {/*<EditModal onSubmit={hdEdit} onClick={hdSelect.bind(this, record)}>*/}
                {/*  <RoomForm onCollect={hdCollect} room={room} listPrice={price}/>*/}
                {/*</EditModal>*/}
                {/*<Divider type='vertical'/>*/}
                <TableTransfer people={record.user_id} roomId={record._id} updateRooms={updateRooms}/>
              </>
            )
          }
        ]}
      />
    </Card>
  )
}

Room.propTypes = {
  rooms: PropTypes.array,
  price: PropTypes.array,
  // loading: PropTypes.func,
  updateRooms: PropTypes.func,
  visible: PropTypes.object,
  setVisible: PropTypes.func,
  toggle: PropTypes.func,
}

Room.defaultProps = {
  visible: {
    form: false, transfer: false
  },
}
