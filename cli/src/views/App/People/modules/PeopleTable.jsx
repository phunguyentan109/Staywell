import React from 'react'
import { Card, Table } from 'antd'
import PropTypes from 'prop-types'
import DeleteAlert from 'components/extraComponents/SweetAlert'

export default function PeopleTable({ title, dataSource, hdRemove }) {

  return (
    <Card title={title}>
      <Table
        className='gx-table-responsive'
        dataSource={dataSource.map(p => p.user_id)}
        rowKey='_id'
        columns={[
          {
            title: 'Avatar',
            dataIndex: 'avatar.link',
            render: (text, rec) => (
              <span className='user-cell'>
                <img src={text} alt=''/>
                <div>
                  <p>{rec.username}</p>
                  <small>{rec.email}</small>
                </div>
              </span>
            )
          },
          {
            title: 'Room',
            dataIndex: 'room_id.name',
            render: text => <span>{text ? text : 'Not Assigned'}</span>
          },
          {
            title: 'Action',
            key: 'action',
            render: (text, record) => record.room_id ? <span>None</span> : (
              <span>
                <DeleteAlert
                  row_id={record._id}
                  onRemove={hdRemove}
                >
                  <span>You will not be able to recover this People</span>
                </DeleteAlert>
              </span>
            )
          }
        ]}
      />
    </Card>
  )
}

PeopleTable.propsTypes = {
  title: PropTypes.string,
  dataSource: PropTypes.array,
  loading: PropTypes.bool,
  hdRemove: PropTypes.func,
  toggle: PropTypes.bool,
  onShowModal: PropTypes.func
}

PeopleTable.defaultProps = {
  title: '',
  loading: true,
  dataSource: []
}
