import React, { useCallback, useEffect, useMemo, useState } from 'react'
import PropTypes from 'prop-types'
import './_style.less'
import { Modal, Table, Tag } from 'antd'
import { useFetch, useToggle } from 'hooks'
import { userApi } from 'constants/api'

export default function ModalTransfer({ room, children, onAssign }) {
  const [changes, setChanges] = useState([])
  const [pair, togglePair] = useToggle({ modal: false, process: false })
  const { data: people = [] } = useFetch(pair.modal ? userApi.available() : null, {})

  useEffect(() => {
    setChanges(room.user_id)
  }, [room.user_id])

  const selectedIds = useMemo(
    () => changes.filter(u => !u._remove).map(u => u._id),
    [changes]
  )

  const hdOk = async() => {
    togglePair(['process'])
    await onAssign(room._id, { changes })
    togglePair()
  }

  const isUnSaved = r => {
    let foundUser = changes.find(u => u._id === r._id)
    if (!foundUser) return false

    return foundUser._remove || people.map(u => u._id).includes(r._id)
  }

  const hdSelect = (r, select) => {
    let isSavedRecord = room.user_id.map(u => u._id).includes(r._id)

    if (isSavedRecord) {
      setChanges(prev => {
        let currentChanges = prev.filter(u => u._id !== r._id)
        return select ? [...currentChanges, r] : [...currentChanges, { ...r, _remove: true }]
      })
    } else {
      setChanges(prev => select ? [...prev, r] : prev.filter(u => u._id !== r._id))
    }
  }

  return (
    <>
      <span onClick={() => togglePair(['modal'])}>{children}</span>
      <Modal
        width={800}
        title={'Room\'s people assignment'}
        visible={pair.modal}
        onCancel={() => togglePair(['modal'])}
        onOk={hdOk}
        confirmLoading={pair.process}
      >
        <Table
          tableLayout='fixed'
          className='gx-table-responsive'
          dataSource={[...room.user_id, ...people]}
          rowKey='_id'
          pagination={false}
          rowSelection={{
            type: 'checkbox',
            selectedRowKeys: selectedIds,
            onSelect: hdSelect
          }}
          columns={[
            {
              title: 'Name',
              dataIndex: 'username',
              render: (v, r) => <>
                {v}
                {isUnSaved(r) && <Tag style={{ marginBottom: 0 }} color='red' className='ml-sm'>unsaved</Tag>}
              </>
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
  onAssign: PropTypes.func,
  room: PropTypes.object
}

ModalTransfer.defaultProps = {
  room: {
    user_id: []
  }
}
