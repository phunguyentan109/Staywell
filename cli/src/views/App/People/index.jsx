import React, {useEffect, useCallback, useState} from "react";
import {Card, Table, Spin} from "antd";
import api, {apiCall} from "constants/api";
import withNoti from "hocs/withNoti";
import PopConfirm from "components/App/Pop/PopConfirm";
import * as permissions from "constants/credentialControl";

const {isPeople, isUnactive} = permissions;

function People({notify}) {
    const [people, setPeople] = useState([]);
    const [loading, setLoading] = useState(true);

    const load = useCallback(async() => {
        try {
            let peopleData = await apiCall(...api.user.get());
            setPeople(peopleData);
            setLoading(false);
        } catch (e) {
            return notify("error", "Data is not loaded");
        }
    }, [notify])

    useEffect(() => {
        load();
    }, [load])

    async function hdRemove(user_id) {
        try {
            await apiCall(...api.user.remove(user_id));
            setPeople(prev => prev.filter(p => p.user_id._id !== user_id));
            return notify("success", "Process is completed successfully!", "People data is removed successfully.")
        } catch (e) {
            return notify("error", "Process is not completed", "People data cannot be removed properly")
        }
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
                            render: text => <span>{text ? text : "Not Assigned"}</span>
                        },
                        {
                            title: 'Email',
                            dataIndex: 'email'
                        },
                        {
                            title: "Contract",
                            dataIndex: "contract_id",
                            render: (text, record) => text.length === 0 ? <span>None</span> : (
                                <span>
                                    <a href={`/app/people/${record._id}/contract`} className="gx-link">{text.length} contract(s)</a>
                                </span>
                            )
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
