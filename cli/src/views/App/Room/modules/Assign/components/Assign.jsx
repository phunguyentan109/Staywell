import React, {useState, useEffect, useCallback} from "react";
import {Spin, Table, Button, Card, Form, Input} from "antd";
import Widget from "components/Widget/index";
import {apiUser, apiRoom} from "constants/api";
import moment from "moment";

const NOT_FOUND = -1;
const FormItem = Form.Item;

function RoomAssign({loading, selectedRoom, hdCancel, refresh, notify, setLoading}) {
    const [room, setRoom] = useState({
        _id: selectedRoom._id,
        user_id: [...selectedRoom.user_id],
        amount: 0
    });
    const [users, setUsers] = useState([]);

    const load = useCallback(async() => {
        setLoading(true);
        try {
            let userData = await apiUser.getAssign();
            setUsers(userData);
        } catch (e) {
            notify("error", "Data is not loaded");
        }
        setLoading(false);
    }, [notify, setLoading]);

    useEffect(() => {
        load();
    }, [load]);

    function isAssigned(user_id) {
        return room.user_id.map(u => u._id).indexOf(user_id) !== NOT_FOUND;
    }

    function hdAssign(user) {
        if(isAssigned(user._id)) {
            // if already assign, do unassign
            let rmUser = room.user_id.filter(u => user._id !== u._id);
            setRoom(prev => ({...prev, user_id: rmUser}));
            setUsers(prev => ([...prev, user]));
        } else {
            // if is unassigned, do assign
            let rmUser = users.filter(u => user._id !== u._id);
            setUsers(rmUser);
            setRoom(prev => ({ ...prev, user_id: [...prev.user_id, user] }));
        }
    }

    function hdChange(e) {
        const {name, value} = e.target;
        setRoom(prev => ({...prev, [name]: value}));
    }

    async function hdConfirm() {
        try {
            setLoading(true);
            let assignRoom = await apiRoom.assign(room._id, room);
            let assignRoomData = await apiRoom.getOne(assignRoom._id);
            refresh(assignRoomData, "People are assigned to room successfully!", false);
        } catch (e) {
            setLoading(false);
            notify("error", "Process is not completed");
        }
    }

    return (
        <div>
            <Widget title={ <h2 className="h4 gx-text-capitalize gx-mb-0">Assign People For {selectedRoom.name}</h2> }>
            <Spin spinning={loading}>
                <div className="gx-table-responsive">
                    <Table
                        className="gx-table-no-bordered"
                        columns={[
                            {
                                title: 'Username',
                                dataIndex: 'username',
                                render: (text, record) => {
                                    return <div className="gx-flex-row gx-align-items-center">
                                        <img className="gx-rounded-circle gx-size-30 gx-mr-2" src={record.avatar.link} alt=""/>
                                        <p className="gx-mb-0">{text}</p>
                                    </div>
                                }
                            },
                            {
                                title: 'Join At',
                                dataIndex: 'createdAt',
                                render: text => <span className="gx-text-grey">From {moment(text).format("MMM Do, YYYY")}</span>
                            },
                            {
                                title: 'Action',
                                key: "action",
                                render: (text, record) => <span
                                    className={`gx-text-primary gx-pointer ${isAssigned(record._id) ? "app-assign" : ""}`}
                                    onClick={hdAssign.bind(this, record)}
                                    >
                                        {
                                            isAssigned(record._id)
                                            ? <i className="icon icon-frequent gx-fs-sm gx-mr-2"/>
                                            : <i className="icon icon-forward gx-fs-sm gx-mr-2"/>
                                        }
                                        { isAssigned(record._id) ? "Unassign" : "Assign" }
                                    </span>
                                },
                            ]}
                            rowKey="_id"
                            dataSource={[...room.user_id, ...users]}
                            size="small"
                        />
                    </div>
                </Spin>
            </Widget>
            <Card className="gx-card" title="Current electric amount">
                <Spin spinning={loading}>
                    <Form layout="horizontal">
                        <FormItem
                            label="Current amount"
                            labelCol={{xs: 24, sm: 8}}
                            wrapperCol={{xs: 24, sm: 14}}
                        >
                            <Input
                                placeholder="Enter the room's name here..."
                                name="amount"
                                value={room.amount}
                                onChange={hdChange}
                            />
                        </FormItem>
                        <FormItem
                            wrapperCol={{
                                xs: 24,
                                sm: {span: 14, offset: 6}
                            }}
                        >
                            <Button type="primary" onClick={hdConfirm}>Confirm</Button>
                            <Button onClick={hdCancel}>Cancel</Button>
                        </FormItem>
                    </Form>
                </Spin>
            </Card>
        </div>
    )
}

export default RoomAssign;
