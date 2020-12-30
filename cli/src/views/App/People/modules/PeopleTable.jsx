import React from 'react'
import { Card, Table } from 'antd'
import PropTypes from 'prop-types'
import DeleteAction from 'components/DeleteAction'

export default function PeopleTable({ title, dataSource, hdRemove }) {
  return (
    <Card className='gx-card' title={title}>
      <Table
        className='gx-table-responsive'
        dataSource={dataSource}
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
            render: (text, record) => <DeleteAction onConfirm={hdRemove.bind(this, record._id)}/>
          }
        ]}
      />
    </Card>
  )
}

PeopleTable.propTypes = {
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
