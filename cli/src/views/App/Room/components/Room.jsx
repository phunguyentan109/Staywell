import React from 'react'
import { Card, Table, Divider, Button } from 'antd'
import PropTypes from 'prop-types'
import DeleteAction from 'components/DeleteAction'
// import TableTransfer from '../modules/TableTransfer'
import RoomForm from '../modules/RoomForm'

import { roomApi, call } from 'constants/api'
import { offLoading, onLoading, notify } from 'constants/func'

export default function Room ({ rooms, updateRooms }) {

  async function hdRemove(room) {
    onLoading()
    await call(...roomApi.remove(room._id))
    updateRooms(room, true)
    notify('success', 'The room information is removed successfully!')
    offLoading()
  }

  return (
    <Card className='gx-card' title='List of available rooms'>
      <RoomForm
        title={'Enter room\'s information'}
        api={roomApi.create()}
        updateRooms={updateRooms}
      >
        <Button type='primary'>Add new room</Button>
      </RoomForm>
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
                <DeleteAction onConfirm={() => hdRemove(record)}/>
                <Divider type='vertical'/>
                <RoomForm
                  value={record}
                  title={'Edit room\'s information'}
                  api={roomApi.update(record._id)}
                  updateRooms={updateRooms}
                >
                  <span className='gx-link'>Edit</span>
                </RoomForm>
                <Divider type='vertical'/>
                {/*<TableTransfer people={record.user_id} roomId={record._id} updateRooms={updateRooms}/>*/}
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
