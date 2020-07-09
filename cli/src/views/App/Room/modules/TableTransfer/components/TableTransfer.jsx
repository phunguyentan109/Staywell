import React, { useState, useCallback, useEffect } from 'react'
import PropTypes from 'prop-types'

import TransferConfig from './TransferConfig'
import { TABLE_COLS } from '../../const'
import { Modal } from 'antd'
import { apiUser, apiRoom, notify } from 'constants/api'

export default function TableTransfer({ roomId, visible, people, toggleModal, updateRooms }) {
  const [available, setAvailable] = useState([])
  const [checkedIn, setCheckedIn] = useState([])
  const [processing, setProcessing] = useState(false)

  const load = useCallback(async() => {
    let availablePeople = await apiUser.available()
    setAvailable(availablePeople)
  }, [])

  useEffect(() => {
    load()
    setCheckedIn(people.map(u => u._id))
  }, [load, roomId, people])

  const toggleProcess = () => setProcessing(prev => !prev)

  async function hdOk() {
    toggleProcess()
    let room = await apiRoom.assign({ room_id: roomId, data: { user_id: checkedIn } })
    updateRooms(room)
    toggleModal()
    toggleProcess()
    notify('success', 'Room\'s list is updated successfully')
  }

  const hdFilter = (value, item) => item.username.includes(value) || item.email.includes(value)

  return (
    <Modal
      title='People Assignment'
      visible={visible}
      onOk={hdOk}
      confirmLoading={processing}
      onCancel={toggleModal}
      width={1200}
    >
      <TransferConfig
        showSearch
        dataSource={[...available, ...people]}
        targetKeys={checkedIn}
        onChange={ts => setCheckedIn(ts)}
        filterOption={hdFilter}
        leftTableColumns={TABLE_COLS}
        rightTableColumns={TABLE_COLS}
        rowKey={rec => rec._id}
      />
    </Modal>
  )
}

TableTransfer.propTypes = {
  roomId: PropTypes.string,
  notify: PropTypes.func,
  visible: PropTypes.bool,
  toggleModal: PropTypes.func,
  updateRooms: PropTypes.func,
  people: PropTypes.array
}

TableTransfer.defaultProps = {
  roomId: '',
  people: [],
  visible: false
}
