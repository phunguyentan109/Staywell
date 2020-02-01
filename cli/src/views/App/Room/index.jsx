import React, {useState, useEffect, useCallback} from "react";
import {Card, Spin, Table, Button, Divider} from "antd";
import withNoti from "hocs/withNoti";
import PopConfirm from "components/App/Pop/PopConfirm";
import api, {apiCall} from "constants/api";
import RoomForm from "./RoomForm";

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
        setRoom(prev => ({
            ...prev, ...room,
            price_id: room.price_id._id,
            user_id: [...room.user_id]
        }));
    }

    async function hdSubmit(roomData) {
        setLoading(true);
        roomData.user_id = roomData.user_id.map(u => u._id);
        try {
            // Getting the room's user_id instead of the whole object
            if(!roomData._id) {
                // Create new room
                let createdRoom = await apiCall(...api.room.create(), roomData);
                let createdRoomData = await apiCall(...api.room.getOne(createdRoom._id));
                let newRooms = [...rooms, createdRoomData];
                setRooms(newRooms);
                notify("success", "Process is completed!", "Add new room successfully!");
            } else {
                // Update available room data
                let updatedRoom = await apiCall(...api.room.edit(room._id), roomData);
                let updatedRoomData = await apiCall(...api.room.getOne(updatedRoom._id));
                let newRooms = rooms.map(r => r._id === updatedRoom._id ? updatedRoomData : r);
                setRooms(newRooms);
                notify("success", "Process is completed!", "Update room successfully!");
            }
        } catch (e) {
            notify("error", "Process is not completed", "The data is not submitted successfully!")
        }
        hdCancel();
        setLoading(false);
    }

    function hdCancel() {
        setRoom(DEFAULT_ROOM);
        toggleForm(false);
    }

    return (
        <div>
            {
                form && <RoomForm
                    price={price}
                    loading={loading}
                    setLoading={setLoading}
                    hdSubmit={hdSubmit}
                    editRoom={room}
                    hdCancel={hdCancel}
                    notify={notify}
                />
            }
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
                                render: (text, record) => room._id ? <span>None</span> : (
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
