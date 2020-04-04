import React from 'react'
import { Card, Spin, Table } from 'antd'
import PropTypes from 'prop-types'
import PopConfirm from 'components/App/Pop/PopConfirm'

export default function PeopleTable({ title, dataSource, loading, hdRemove }) {
    return (
        <Card title={title}>
            <Spin spinning={loading}>
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
                                    <PopConfirm
                                        title='Are you sure to delete this genre?'
                                        task={hdRemove.bind(this, record._id)}
                                        okText='Sure, remove it'
                                        cancelText='Not now'
                                    >
                                        <span className='gx-link'>Delete</span>
                                    </PopConfirm>
                                </span>
                            )
                        }
                    ]}
                />
            </Spin>
        </Card>
    )
}

PeopleTable.propsTypes = {
    title: PropTypes.string,
    dataSource: PropTypes.array,
    loading: PropTypes.bool,
    hdRemove: PropTypes.func
}

PeopleTable.defaultProps = {
    title: '',
    loading: true,
    dataSource: []
}
