import React, {useState, useEffect, useCallback} from "react";
import {Row, Col, Card, Spin, Form, Input, Select, Button, Table} from "antd";
import Widget from "components/Widget/index";
import api, {apiCall} from "constants/api";
import moment from "moment";

const FormItem = Form.Item;
const Option = Select.Option;
const NOT_FOUND = -1;

function RoomForm({loading, editRoom, price, hdCancel, hdSubmit, notify, setLoading}) {
    const [room, setRoom] = useState(editRoom);
    const [users, setUsers] = useState([]);

    const load = useCallback(async() => {
        setLoading(true);
        try {
            let userData = await apiCall(...api.user.getAssign());
            setUsers(userData);
        } catch (e) {
            notify("error", "Data is not loaded");
        }
        setLoading(false);
    }, [notify, setLoading])

    useEffect(() => {
        load();
    }, [load])

    function hdSelectPrice(price_id) {
        setRoom(prev => ({...prev, price_id}));
    }

    function hdChange(e) {
        const {name, value} = e.target;
        setRoom(prev => ({...prev, [name]: value}))
    }

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

    async function hdConfirm() {
        await hdSubmit({...room});
    }

    return (
        <Row>
            <Col xl={15} xs={24}>
                <Card className="gx-card" title={!room._id ? "Add New Price" : "Edit Price Information"}>
                    <Spin spinning={loading}>
                        <Form layout="horizontal">
                            <FormItem
                                label="Type"
                                labelCol={{xs: 24, sm: 6}}
                                wrapperCol={{xs: 24, sm: 10}}
                            >
                                <Input
                                    placeholder="Enter the room's name here..."
                                    name="name"
                                    value={room.name}
                                    onChange={hdChange}
                                />
                            </FormItem>
                            <FormItem
                                label="Select author"
                                labelCol={{xs: 24, sm: 6}}
                                wrapperCol={{xs: 24, sm: 10}}
                            >
                                <Select
                                    mode="single"
                                    style={{width: '100%'}}
                                    placeholder="Pick a price"
                                    onChange={hdSelectPrice}
                                    value={room.price_id}
                                >
                                    { price.map((v, i) => <Option value={v._id} key={i}>{v.type}</Option>) }
                                </Select>
                            </FormItem>
                            <FormItem
                                wrapperCol={{
                                    xs: 24,
                                    sm: {span: 14, offset: 6}
                                }}
                            >
                                <Button type="primary" onClick={hdConfirm}>{room._id ? "Save changes" : "Submit"}</Button>
                                <Button onClick={hdCancel}>Cancel</Button>
                            </FormItem>
                        </Form>
                    </Spin>
                </Card>
            </Col>
            <Col xl={9} xs={24}>
                <Widget title={ <h2 className="h4 gx-text-capitalize gx-mb-0">Assign People</h2> }>
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
            </Col>
        </Row>
    )
}

export default RoomForm;
