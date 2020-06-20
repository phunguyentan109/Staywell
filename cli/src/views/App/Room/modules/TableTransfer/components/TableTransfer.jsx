import React, { useState, useCallback, useEffect } from 'react'
import PropTypes from 'prop-types'

import TransferConfig from './TransferConfig'
import { TABLE_COLS } from '../../const'
import { Modal } from 'antd'
import { apiUser } from 'constants/api'

export default function TableTransfer({ notify, visible, people, toggleModal }) {
  const [noCheckIn, setNoCheckIn] = useState([])
  const [checkedIn, setCheckedIn] = useState(people.length > 0 ? people : [])
  const [processing, setProcessing] = useState(false)

  const load = useCallback(async() => {
    try {
      let noAssignPeople = await apiUser.getNoAssign()
      setNoCheckIn(noAssignPeople)
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

  function hdChange(targets) {
    console.log('target', targets)
    setCheckedIn(targets)
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
        dataSource={noCheckIn}
        targetKeys={checkedIn}
        onChange={hdChange}
        filterOption={hdFilter}
        leftTableColumns={TABLE_COLS}
        rightTableColumns={TABLE_COLS}
      />
    </Modal>
  )
}

TableTransfer.propTypes = {
  notify: PropTypes.func,
  visible: PropTypes.bool,
  toggleModal: PropTypes.func,
  people: PropTypes.array
}

TableTransfer.defaultProps = {
  people: [],
  visible: false
}
