import React, { useState, useCallback, useEffect } from 'react'
import PropTypes from 'prop-types'

import TransferConfig from './TransferConfig'
import { TABLE_COLS } from '../../const'
import { apiUser, apiRoom, notify } from 'constants/api'
import { Modal } from 'antd'
import { useToggle } from 'hooks'

export default function TableTransfer({ people, roomId, updateRooms }) {
  const [available, setAvailable] = useState([])
  const [checkedIn, setCheckedIn] = useState([])
  const [pair, togglePair] = useToggle({ modal: false, process: false })

  const load = useCallback(async() => {
    let availablePeople = await apiUser.available()
    setAvailable(availablePeople)
  }, [])

  useEffect(() => {
    load()
    setCheckedIn(people.map(u => u._id))
  }, [load, people])

  async function hdAssign() {
    let room = await apiRoom.assign({ room_id: roomId, data: { user_id: checkedIn } })
    updateRooms(room)
    notify('success', 'Room\'s list is updated successfully')
  }

  const hdFilter = (value, item) => item.username.includes(value) || item.email.includes(value)

  return (
    <>
      <span onClick={toggleModal}>{children}</span>
      <Modal
        title={'Room\'s people assignment'}
        visible={pair.modal}
        onCancel={() => togglePair(['modal'])}
        onOk={hdOk}
        confirmLoading={pair.process}
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
    </>
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
