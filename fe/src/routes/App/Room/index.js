import React, { useCallback, useEffect } from 'react'
import { Button, Card, Divider, message, Popover, Table } from 'antd'
import PropTypes from 'prop-types'
import TableTransfer from './components/ModalTransfer'
import RoomForm from './components/RoomForm'
import { InfoCircleOutlined, PlusOutlined, TagFilled } from '@ant-design/icons'
import './_styles.less'
import Avatar, { genConfig } from 'react-nice-avatar'
import { formatVND } from 'constants/func'
import { useDispatch, useSelector } from 'react-redux'
import { createRoomAction, editRoomAction, fetchRoomAction, removeRoomAction } from './redux/action'
import { selectRoom } from './redux/selector'
import DeleteAction from 'components/DeleteAction'

export default function Room() {
  const { rooms, loading } = useSelector(selectRoom)
  const dp = useDispatch()

  const getRooms = useCallback(() => dp(fetchRoomAction()), [dp])

  useEffect(() => {
    getRooms()
  }, [getRooms])

  const removeRoom = (roomId) => {
    dp(removeRoomAction(roomId, rs => {
      if (rs) message.success('Removing room successfully!')
      getRooms()
    }))
  }

  return (
    <div className='manageRoom'>
      <Card className='gx-card' title='Available rooms'>
        <RoomForm title='New Room' onSubmitAction={createRoomAction} getRooms={getRooms}>
          <Button type='primary' icon={<PlusOutlined />}>New Room</Button>
        </RoomForm>

        <Table
          className='gx-table-responsive'
          dataSource={rooms}
          loading={loading}
          rowKey='_id'
          columns={[
            { title: 'Room Name', dataIndex: 'name' },
            {
              title: 'People',
              dataIndex: 'userIds',
              render: userIds => {
                if (userIds.length === 0) return <i style={{ color: '#bfbfbf' }}>Empty</i>
                return (<>
                  <span className='mr-xs'>{userIds.length} people</span>
                  <Popover
                    content={
                      <>
                        {
                          userIds.map(user => (
                            <div className='mb-md' key={user._id} style={{ display: 'flex', alignItems: 'center' }}>
                              <Avatar style={{ width: 40, height: 40 }}
                                className='mr-sm' {...genConfig(user.avatar)} />
                              <div>
                                <div className='mt-xs'>{user.username}</div>
                                <div style={{ color: 'gray' }}><small>{user.gender}</small></div>
                              </div>
                            </div>
                          ))
                        }
                      </>}
                    title='People Detail'
                    trigger='click'
                  >
                    <InfoCircleOutlined className='peopleIcon' />
                  </Popover>
                </>)
              }
            },
            {
              title: 'Price Tags',
              dataIndex: 'price_id',
              render: info => {
                if (!info) return <i style={{ color: '#cdcdcd' }}>No price applied</i>
                return <>
                  <span className='mr-xs'>{info.type}</span>
                  <Popover
                    content={
                      <div className='qv-price'>
                        <div>
                          <span>Electric:</span>
                          <span>{formatVND(info.electric)}</span>
                        </div>
                        <div>
                          <span>Living:</span>
                          <span>{formatVND(info.living)}</span>
                        </div>
                        <div>
                          <span>Water:</span>
                          <span>{formatVND(info.water)}</span>
                        </div>
                        <div>
                          <span>Wifi:</span>
                          <span>{formatVND(info.wifi)}</span>
                        </div>
                      </div>}
                    title='Price Detail'
                    trigger='click'
                  >
                    <TagFilled className='priceIcon' />
                  </Popover>
                </>
              }
            },
            {
              title: 'Action',
              dataIndex: '_id',
              key: 'action',
              render: (v, record) => (
                <>
                  <DeleteAction onConfirm={() => removeRoom(v)}/>

                  <Divider type='vertical'/>

                  <RoomForm
                    value={record}
                    title='Edit room'
                    onSubmitAction={editRoomAction}
                    getRooms={getRooms}
                  >
                    <span className='gx-link'>Edit</span>
                  </RoomForm>
                  <Divider type='vertical'/>

                  <TableTransfer room={record} getRooms={getRooms} />
                </>
              )
            }
          ]}
        />
      </Card>
    </div>
  )
}

Room.propTypes = {
  room: PropTypes.object,
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
