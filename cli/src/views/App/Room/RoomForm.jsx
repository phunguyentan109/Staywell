import React, {useState} from "react";
import {Row, Col, Card, Spin, Form, Input, Select, Button, Table} from "antd";
import Widget from "components/Widget/index";

const FormItem = Form.Item;
const Option = Select.Option;

const columns = [
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
        title: 'Last Transfer',
        dataIndex: 'createdDate',
        render: (text, record) => {
            return <span className="gx-text-grey">{record.transfer}</span>
        }
    },
    {
        title: 'Action',
        dataIndex: 'status',
        render: (text) => {
            return <span className="gx-text-primary gx-pointer">
                <i className="icon icon-forward gx-fs-sm gx-mr-2"/>{text}</span>
            },
        },
    ];

function RoomForm({loading, editRoom, price, users, hdCancel, hdSubmit}) {
    const [room, setRoom] = useState(editRoom);

    function hdSelectPrice(price_id) {
        setRoom(prev => ({...prev, price_id}));
    }

    function hdSelectPeople(user_id) {
        setRoom(prev => ({...prev, user_id}));
    }

    function hdChange(e) {
        const {name, value} = e.target;
        setRoom(prev => ({...prev, [name]: value}))
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
                                label="Assign People"
                                labelCol={{xs: 24, sm: 6}}
                                wrapperCol={{xs: 24, sm: 10}}
                            >
                                <Select
                                    mode="multiple"
                                    style={{width: '100%'}}
                                    placeholder="Pick a person"
                                    onChange={hdSelectPeople}
                                    value={room.user_id}
                                >
                                    { users.map((v, i) => <Option value={v._id} key={i}>{v.username}</Option>) }
                                </Select>
                            </FormItem>
                            <FormItem
                                wrapperCol={{
                                    xs: 24,
                                    sm: {span: 14, offset: 6}
                                }}
                            >
                                <Button type="primary" onClick={hdSubmit}>{room._id ? "Save changes" : "Submit"}</Button>
                                <Button onClick={hdCancel}>Cancel</Button>
                            </FormItem>
                        </Form>
                    </Spin>
                </Card>
            </Col>
            <Col xl={9} xs={24}>
                <Widget
                    title={ <h2 className="h4 gx-text-capitalize gx-mb-0">Assign People</h2> }
                >
                    <div className="gx-table-responsive">
                        <Table
                            className="gx-table-no-bordered"
                            columns={columns}
                            dataSource={[]}
                            // pagination={false}
                            size="small"
                        />
                    </div>
                    <p className="gx-text-primary gx-mb-0 gx-pointer gx-d-block gx-d-sm-none gx-mb-0 gx-mt-3">
                        <i className="icon icon-add-circle gx-fs-lg gx-d-inline-flex gx-vertical-align-middle"/> Add New Account
                    </p>
                </Widget>
            </Col>
        </Row>
    )
}

export default RoomForm;
