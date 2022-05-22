import React, { useEffect, useMemo, useState } from 'react'
import PropTypes from 'prop-types'
import './_style.less'
import { Modal, Table, Tag } from 'antd'
import { assignRoomAction, fetchAvailablePeopleAction } from '../../redux/action'
import { useDispatch } from 'react-redux'

export default function ModalTransfer({ room, getRooms }) {
  const [changes, setChanges] = useState([])
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [people, setPeople] = useState([])

  const dp = useDispatch()

  const peopleIds = useMemo(() => people.map(p => p._id), [people])

  useEffect(() => {
    setChanges(room.userIds)
  }, [room.userIds])

  const selectedIds = useMemo(
    () => changes.filter(u => !u._remove).map(u => u._id),
    [changes]
  )

  const hdOpen = () => {
    if (!open) {
      setLoading(true)
      setOpen(true)

      dp(fetchAvailablePeopleAction(data => {
        if (data) {
          setLoading(false)
          setPeople(data)
        }
      }))
    }
  }

  const hdOk = () => {
    setLoading(true)

    dp(assignRoomAction(room._id, { changes }, rs => {
      if (rs) {
        setOpen(false)
        getRooms()
      }

      setLoading(false)
    }))
  }

  const isUnSaved = r => {
    let foundUser = changes.find(u => u._id === r._id)
    if (!foundUser) return false

    return foundUser._remove || peopleIds.includes(r._id)
  }

  const hdSelect = (r, select) => {
    let isSavedRecord = room.userIds.map(u => u._id).includes(r._id)

    if (isSavedRecord) {
      setChanges(prev => {
        let currentChanges = prev.filter(u => u._id !== r._id)
        return select ? [...currentChanges, r] : [...currentChanges, { ...r, _remove: true }]
      })
    } else {
      setChanges(prev => select ? [...prev, r] : prev.filter(u => u._id !== r._id))
    }
  }

  const hdCancel = () => {
    if (!loading) setOpen(false)
  }

  return (
    <>
      <span onClick={hdOpen} className='gx-link'>Assign</span>

      <Modal
        width={800}
        title='Assign people'
        visible={open}
        onCancel={hdCancel}
        onOk={hdOk}
      >
        <Table
          loading={loading}
          tableLayout='fixed'
          className='gx-table-responsive'
          dataSource={[...room.userIds, ...people]}
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
  getRooms: PropTypes.func,
  room: PropTypes.object
}

ModalTransfer.defaultProps = {
  room: {
    userIds: []
  }
}
