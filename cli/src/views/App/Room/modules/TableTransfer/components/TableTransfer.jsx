import React, { useState, useCallback, useEffect } from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import '../_style.scss'
import TransferConfig from './TransferConfig'
import { TABLE_COLS } from '../../const'
import { Modal } from 'antd'
import { useToggle } from 'hooks'
import { notify } from 'constants/func'

export default function TableTransfer({ room, avails, getAvailable, children, hdAssign, updateRooms }) {
  const [checkedIn, setCheckedIn] = useState([])
  const [pair, togglePair] = useToggle({ modal: false, process: false })

  useEffect(() => {
    setCheckedIn(_.map(room.user_id, u => u._id))
  }, [room.user_id])

  const toggleModal = useCallback(async() => {
    if (!pair.modal) await getAvailable()
    togglePair(['modal'])
  }, [getAvailable, pair.modal, togglePair])

  const hdOk = useCallback(async() => {
    togglePair(['process'])
    let rs = await hdAssign({ user_id: checkedIn })
    if (rs.status === 200) {
      updateRooms(rs.data)
      notify('success')
      togglePair(['modal'])
    }
    togglePair(['process'])
  }, [checkedIn, hdAssign, togglePair, updateRooms])

  const hdFilter = (value, item) => item.username.includes(value) || item.email.includes(value)

  return (
    <>
      <span onClick={toggleModal}>{children}</span>
      <Modal
        width={1200}
        title={'Room\'s people assignment'}
        visible={pair.modal}
        onCancel={() => togglePair(['modal'])}
        onOk={hdOk}
        confirmLoading={pair.process}
      >
        <TransferConfig
          showSearch
          dataSource={[...avails, ...room.user_id]}
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
  getAvailable: PropTypes.func,
  avails: PropTypes.array,
  hdAssign: PropTypes.func,
  children: PropTypes.any,
  updateRooms: PropTypes.func,
  room: PropTypes.object
}

TableTransfer.defaultProps = {
  roomId: '',
  people: [],
  visible: false
}
