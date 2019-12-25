import React, {useState, useEffect, useCallback} from "react";
import {Card, Spin, Table, Button, Divider, Form, Input, Select} from "antd";
import withNoti from "hocs/withNoti";
import PopConfirm from "components/App/Pop/PopConfirm";
import api, {apiCall} from "constants/api";

const FormItem = Form.Item;
const Option = Select.Option;

const DEFAULT_ROOM = {
    name: "",
    user_id: []
}

function Room({notify}) {
    const [rooms, setRooms] = useState([]);
    const [room, setRoom] = useState(DEFAULT_ROOM);
    const [price, setPrice] = useState([]);
    const [loading, setLoading] = useState(true);
    const [form, toggleForm] = useState(false);

    const load = useCallback(async() => {
        try {
            let roomData = await apiCall(...api.room.get());
            let priceData = await apiCall(...api.price.get());
            setPrice(priceData);
            setRooms(roomData);
            setLoading(false);
        } catch (e) {
            notify("error", "The data cannot be loaded!");
        }
    }, [notify])

    useEffect(() => {
        load();
    }, [load])

    async function hdRemove(room_id) {
        setLoading(true);
        try {
            await apiCall(...api.room.remove(room_id));
            let newRooms = rooms.filter(r => r._id !== room_id);
            setRooms(newRooms);
            notify("success", "The process is completed", "The room information is removed successfully!");
        } catch (e) {
            notify("error", "The process is not completed");
        }
        setLoading(false);
    }

    function hdEdit(room) {
        toggleForm(true);
        setRoom(prev => ({...prev, ...room, price_id: room.price_id._id}));
    }

    function hdSelectPrice(price_id) {
        setRoom(prev => ({...prev, price_id}));
    }

    async function hdSubmit() {
        setLoading(true);
        try {
            if(!room._id) {
                // Create new room
                let createdRoom = await apiCall(...api.room.create(), room);
                let newRooms = [...rooms, createdRoom];
                setRooms(newRooms);
                setRoom(DEFAULT_ROOM);
                notify("success", "Add new room successfully!");
            } else {
                // Update available room data
                let updatedRoom = await apiCall(...api.room.edit(room._id), room);
                let newRooms = rooms.map(r => r._id === room._id ? updatedRoom : r);
                setRooms(newRooms);
            }
            setRoom(DEFAULT_ROOM);
        } catch (e) {
            notify("error", "Process is not completed", "The data is not submitted successfully!")
        }
        setLoading(false);
    }

    function hdCancel() {
        toggleForm(false);
    }

    function hdChange(e) {
        const {name, value} = e.target;
        setRoom(prev => ({...prev, [name]: value}))
    }

    return (
        <div>
            {form && <Card className="gx-card" title={!room._id ? "Add New Price" : "Edit Price Information"}>
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
                            <Button type="primary" onClick={hdSubmit}>{room._id ? "Save changes" : "Submit"}</Button>
                            <Button onClick={hdCancel}>Cancel</Button>
                        </FormItem>
                    </Form>
                </Spin>
            </Card>}
            <Card title="List of available room">
                <Spin spinning={loading}>
                    {
                        form || <Button type="primary" onClick={() => toggleForm(true)}>Add new room information</Button>
                    }
                    <Table
                        className="gx-table-responsive"
                        dataSource={rooms}
                        rowKey="_id"
                        columns={[
                            {
                                title: "Room Name",
                                dataIndex: 'name',
                            },
                            {
                                title: "People",
                                dataIndex: 'user_id',
                                render: text => <span>{text.length} people</span>
                            },
                            {
                                title: 'Price Type',
                                dataIndex: 'price_id.type'
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
