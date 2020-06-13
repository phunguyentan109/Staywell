import React, { useState, useCallback, useEffect } from 'react'
import PropTypes from 'prop-types'

import TransferConfig from './TransferConfig'
import { TABLE_COLS } from '../../const'
import { Modal } from 'antd'
import { apiUser } from 'constants/api'

export default function TableTransfer({ notify, assign, room, toggleModal }) {
  const [assignPeople, setAssignPeople] = useState([])
  const [processing, setProcessing] = useState(false)

  const load = useCallback(async() => {
    try {
      let noAssignPeople = await apiUser.getNoAssign()
      setAssignPeople(noAssignPeople)
    } catch (e) {
      notify('error')
    }
  }, [notify])

  useEffect(() => { load() }, [load])

  const toggleProcess = () => setProcessing(prev => !prev)

  function hdOk() {
    toggleProcess()

    toggleProcess()
  }

  function handleChange() {}

  function handleFilter(value, item) {}

  return (
    <Modal
      title='People Assignment'
      visible={assign}
      onOk={hdOk}
      confirmLoading={processing}
      onCancel={toggleModal}
      width={1200}
    >
      <TransferConfig
        showSearch
        dataSource={assignPeople}
        targetKeys={room.people_id}
        onChange={handleChange}
        filterOption={handleFilter}
        leftTableColumns={TABLE_COLS}
        rightTableColumns={TABLE_COLS}
      />
    </Modal>
  )
}

TableTransfer.propTypes = {
  notify: PropTypes.func,
  assign: PropTypes.bool,
  toggleModal: PropTypes.func,
  room: PropTypes.object.isRequired
}

TableTransfer.defaultProps = {
  room: {
    people_id: []
  }
}
