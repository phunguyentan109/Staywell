import React, {useEffect, useCallback, useState} from "react";
import {Card, Table, Spin} from "antd";
import api, {apiCall} from "constants/api";
import withNoti from "hocs/withNoti";
import PopConfirm from "components/App/Pop/PopConfirm";
import * as permissions from "constants/credentialControl";

const {isPeople, isUnactive} = permissions;

function People() {
    const [people, setPeople] = useState([]);
    const [loading, setLoading] = useState(true);

    const load = useCallback(async() => {
        let peopleData = await apiCall(...api.user.get());
        setPeople(peopleData);
        setLoading(false);
    }, [])

    useEffect(() => {
        load();
    }, [load])

    function hdRemove(user_id) {
        console.log(user_id);
    }

    function getUnactive() {
        return people.filter(p => isUnactive(p.role_id.code));
    }

    function getActive() {
        return people.filter(p => isPeople(p.role_id.code));
    }

    return (
        <div>
            {
                getUnactive().length > 0 && <PeopleTable
                    title="List of Unactive People"
                    dataSource={getUnactive()}
                    loading={loading}
                    hdRemove={hdRemove}
                />
            }
            <PeopleTable
                title="List of People"
                dataSource={getActive()}
                loading={loading}
                hdRemove={hdRemove}
            />
        </div>
    )
}

function PeopleTable({title, dataSource, loading, hdRemove}) {
    return (
        <Card title={title}>
            <Spin spinning={loading}>
                <Table
                    className="gx-table-responsive"
                    dataSource={dataSource.map(p => p.user_id)}
                    rowKey="_id"
                    columns={[
                        {
                            title: "Avatar",
                            dataIndex: 'avatar.link',
                            render: text => <span>{text.substring(0, 80)}</span>
                        },
                        {
                            title: "Username",
                            dataIndex: 'username'
                        },
                        {
                            title: "Room",
                            dataIndex: 'room_id.name',
                            render: text => <span>{text ? text.name : "Not Assigned"}</span>
                        },
                        {
                            title: 'Email',
                            dataIndex: 'email'
                        },
                        {
                            title: 'Action',
                            key: 'action',
                            render: (text, record) => (
                                <span>
                                    <PopConfirm
                                        title="Are you sure to delete this genre?"
                                        task={hdRemove.bind(this, record._id)}
                                        okText="Sure, remove it"
                                        cancelText="Not now"
                                    >
                                        <span className="gx-link">Delete</span>
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

export default withNoti(People);
