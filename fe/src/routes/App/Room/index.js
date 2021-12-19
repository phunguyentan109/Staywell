import React from 'react'
import { Button, Card, Divider, Spin, Table } from 'antd'
import PropTypes from 'prop-types'
import DeleteAction from 'components/DeleteAction'
import TableTransfer from './modules/ModalTransfer'
import RoomForm from './modules/RoomForm'
import { useFetch } from 'hooks'
import { roomApi } from 'constants/api'
import { PlusOutlined } from '@ant-design/icons'

export default function Room() {
  const { data: rooms, isFetching, isMutating, mutate } = useFetch(roomApi.get(), {
    remove: {
      exec: id => roomApi.remove(id),
      successMsg: 'Room is removed successfully!'
    },
    add: {
      exec: data => roomApi.add(data),
      successMsg: 'Add new room successfully!'
    },
    update: {
      exec: (id, data) => roomApi.update(id, data),
      successMsg: 'Update room information successfully!'
    }
  })

  return (
    <Spin spinning={isFetching}>
      <Card className='gx-card' title='List of available rooms'>
        <RoomForm
          title={'Enter room\'s information'}
          mutateRoom={form => mutate('add', form)}
          isProcessing={isMutating}
        >
          <Button type='primary' icon={<PlusOutlined />}>New Room</Button>
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
                { col ? col.type : <i style={{ color: '#cdcdcd' }}>No price applied</i> }
              </span>
            },
            {
              title: 'Action',
              dataIndex: '_id',
              key: 'action',
              render: (v, record) => (
                <>
                  <DeleteAction onConfirm={() => mutate('remove', v)}/>
                  <Divider type='vertical'/>

                  <RoomForm
                    value={record}
                    title={'Edit room\'s information'}
                    mutateRoom={room => mutate('update', v, room)}
                  >
                    <span className='gx-link'>Edit</span>
                  </RoomForm>
                  <Divider type='vertical'/>

                  <TableTransfer room={record}>
                    <span className='gx-link'>Assign</span>
                  </TableTransfer>
                </>
              )
            }
          ]}
        />
      </Card>
    </Spin>
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
