import React from 'react'
import { Button, Card, Divider, Popover, Spin, Table } from 'antd'
import PropTypes from 'prop-types'
import DeleteAction from 'components/DeleteAction'
import TableTransfer from './modules/ModalTransfer'
import RoomForm from './modules/RoomForm'
import { useFetch } from 'hooks'
import { roomApi } from 'constants/api'
import { InfoCircleOutlined, PlusOutlined, TagFilled } from '@ant-design/icons'
import './_styles.less'
import Avatar, { genConfig } from 'react-nice-avatar'
import { formatVND } from 'constants/func'

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
    },
    assign: {
      exec: (id, data) => roomApi.assign(id, data),
      successMsg: 'Assign people into room successfully!'
    }
  })

  return (
    <div className='manageRoom'>
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

                    <TableTransfer room={record} onAssign={(id, data) => mutate('assign', id, data)}>
                      <span className='gx-link'>Assign</span>
                    </TableTransfer>
                  </>
                )
              }
            ]}
          />
        </Card>
      </Spin>
    </div>
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
