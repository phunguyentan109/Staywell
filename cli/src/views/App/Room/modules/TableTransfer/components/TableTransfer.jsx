import React, { useState, useCallback, useEffect } from 'react'
import PropTypes from 'prop-types'

import TransferConfig from './TransferConfig'
import { TABLE_COLS } from '../../const'
import { Modal } from 'antd'
import { apiUser } from 'constants/api'

export default function TableTransfer({ notify, assign, room }) {
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

  function hdOk() {

  }
  
  return (
    <Modal
      title='People Assignment'
      visible={assign}
      onOk={hdOk}
      confirmLoading={processing}
      onCancel={toggleVisible}
    >
      <TransferConfig
        showSearch
        dataSource={room.people_id}
        targetKeys={assignPeople}
        onChange={this.onChange}
        filterOption={(inputValue, item) =>
          item.title.indexOf(inputValue) !== -1 || item.tag.indexOf(inputValue) !== -1
        }
        leftTableColumns={TABLE_COLS}
        rightTableColumns={TABLE_COLS}
      />
    </Modal>
  )
}

TableTransfer.propTypes = {
  notify: PropTypes.func,
  assign: PropTypes.bool,
  room: PropTypes.object.isRequired
}
