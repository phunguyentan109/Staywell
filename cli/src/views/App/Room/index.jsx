import React, {useState, useEffect, useCallback} from "react";
import {Card, Spin, Table, Button, Divider} from "antd";
import withNoti from "hocs/withNoti";
import PopConfirm from "components/App/Pop/PopConfirm";

function Room({notify}) {
    const [rooms, setRooms] = useState([]);
    const [loading, setLoading] = useState(true);
    const [form, toggleForm] = useState(false);

    const load = useCallback(async() => {
        try {
            setLoading(false);
        } catch (e) {
            notify("error", "The data cannot be loaded!");
        }
    }, [notify])

    useEffect(() => {
        load();
    }, [load])

    function hdRemove() {

    }

    function hdEdit() {

    }

    return (
        <div>
            <Card title="List of available price">
                <Spin spinning={loading}>
                    {form || <Button type="primary" onClick={() => toggleForm(true)}>Add new price</Button>}
                    <Table
                        className="gx-table-responsive"
                        dataSource={rooms}
                        rowKey="_id"
                        columns={[
                            {
                                title: "Price type",
                                dataIndex: 'type',
                            },
                            {
                                title: "Electric",
                                dataIndex: 'electric'
                            },
                            {
                                title: "Wifi",
                                dataIndex: 'wifi',
                            },
                            {
                                title: 'Water',
                                dataIndex: 'water'
                            },
                            {
                                title: 'House',
                                dataIndex: 'house'
                            },
                            {
                                title: 'Extra',
                                dataIndex: 'extra'
                            },
                            {
                                title: 'Duration',
                                dataIndex: 'duration'
                            },
                            {
                                title: 'Action',
                                key: 'action',
                                render: (text, record) => record.room_id ? <span>None</span> : (
                                    <span>
                                        <PopConfirm
                                            title="Are you sure to delete this genre?"
                                            task={hdRemove.bind(this, record._id)}
                                            okText="Sure, remove it"
                                            cancelText="Not now"
                                        >
                                            <span className="gx-link">Delete</span>
                                        </PopConfirm>
                                        <Divider type="vertical"/>
                                        <span className="gx-link" onClick={hdEdit.bind(this, record)}>Edit</span>
                                    </span>
                                )
                            }
                        ]}
                    />
                </Spin>
            </Card>
        </div>
    )
}

export default withNoti(Room);
