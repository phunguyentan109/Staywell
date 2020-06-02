import React, { useState, useCallback, useEffect } from 'react'
import TableTransferConfig from '../index'
import { TABLE_COLS } from '../../const'
import { Modal } from 'antd'
import { apiUser } from 'constants/api'

export default function TableTransfer({ notify }) {
  const [assignPeople, setAssignPeople] = useState([])

  const load = useCallback(async() => {
    try {
      let people = await apiUser.getAssign()
      setAssignPeople(people)
    } catch (e) {
      notify('error')
    }
  }, [notify])

  useEffect(() => { load() }, [load])
  
  return (
    <Modal
      title='People Assignment'
      visible={assign}
      onOk={hdOk}
      confirmLoading={processing}
      onCancel={toggleVisible}
    >
      <TableTransferConfig
        showSearch
        dataSource={mockData}
        targetKeys={targetKeys}
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
