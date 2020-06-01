import React, { useState, useCallback, useEffect } from 'react'
import TableTransferConfig from '../index'
import { LEFT_TABLE } from '../../const'
import { Modal } from 'antd'

export default function TableTransfer({ notify }) {
  const [assignPeople, setAssignPeople] = useState([])

  const load = useCallback(() => {
    try {

    } catch (e) {
      notify('error')
    }
  }, [notify])

  useEffect(() => {
    load()
  }, [load])
  
  return (
    <Modal
      title={room._id ? 'Update Price Information' : 'Create New Price'}
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
        leftTableColumns={LEFT_TABLE}
        rightTableColumns={rightTableColumns}
      />
    </Modal>
  )
}
