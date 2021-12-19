import React, { useCallback, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import './_style.less'
import { Modal, Table } from 'antd'
import { useFetch, useToggle } from 'hooks'
import { userApi } from 'constants/api'

export default function ModalTransfer({ room, children }) {
  const [checkedIn, setCheckedIn] = useState([])
  const [pair, togglePair] = useToggle({ modal: false, process: false })
  const { data: people, isLoading, mutate } = useFetch(pair.modal ? userApi.available() : null, {
  })

  useEffect(() => {
    setCheckedIn(_.map(room.user_id, u => u._id))
  }, [room.user_id])

  const toggleModal = useCallback(async() => {
    togglePair(['modal'])
  }, [togglePair])

  const hdOk = useCallback(async() => {
  //   togglePair(['process'])
  //   let rs = await hdAssign({ user_id: checkedIn })
  //   if (rs.status === 200) {
  //     updateRooms(rs.data)
  //     notify('success')
  //     togglePair(['modal'])
  //   }
  //   togglePair(['process'])
  }, [])

  const hdFilter = (value, item) => item.username.includes(value) || item.email.includes(value)

  return (
    <>
      <span onClick={toggleModal}>{children}</span>
      <Modal
        width={800}
        title={'Room\'s people assignment'}
        visible={pair.modal}
        onCancel={() => togglePair(['modal'])}
        onOk={hdOk}
        confirmLoading={pair.process}
      >
        <Table
          className='gx-table-responsive'
          dataSource={people}
          rowKey='_id'
          pagination={false}
          rowSelection={{
            type: 'checkbox',
            onChange: (selectedRowKeys, selectedRows) => console.log(selectedRowKeys, selectedRows)
          }}
          columns={[
            {
              title: 'Name',
              dataIndex: 'username',
            },
            {
              title: 'Gender',
              dataIndex: 'gender',
              render: v => {
                let iconClass = v === 'Male' ? 'fas fa-mars' : 'fas fa-venus'
                return (
                  <span>
                    {v}
                    <i
                      className={`${iconClass} ml-sm`}
                      style={{ fontSize: 17, color: 'cadetblue' }}
                    />
                  </span>
                )
              }
            }
          ]}
        />
      </Modal>
    </>
  )
}

ModalTransfer.propTypes = {
  children: PropTypes.any,
  room: PropTypes.object
}

ModalTransfer.defaultProps = {
  roomId: '',
  people: [],
  visible: false
}
