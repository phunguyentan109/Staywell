import React, {useState} from "react";
import {Card, Spin, Form, Input, Select, Button} from "antd";
import api, {apiCall} from "constants/api";

const FormItem = Form.Item;
const Option = Select.Option;

function RoomForm({loading, editRoom, price, hdCancel, refresh, setLoading, notify}) {
    const [room, setRoom] = useState(editRoom);

    function hdSelectPrice(price_id) {
        setRoom(prev => ({...prev, price_id}));
    }

    function hdChange(e) {
        const {name, value} = e.target;
        setRoom(prev => ({...prev, [name]: value}));
    }

    async function hdSubmit() {
        setLoading(true);
        try {
            // Prepare data based-on mode
            let usedApi = room._id ? api.room.edit(room._id) : api.room.create();
            let msg = room._id ? "Update room successfully!" : "Create new room successfully!";
            let isNewRecord = room._id === undefined;

            // Send data
            let returnedData = await apiCall(...usedApi, room);
            let roomData = await apiCall(...api.room.getOne(returnedData._id));

            // Update the list data
            refresh(roomData, msg, isNewRecord);
        } catch (e) {
            notify("error", "Process is not completed")
            setLoading(false);
        }
    }

    return (
        <Card className="gx-card" title={!room._id ? "Add New Price" : "Edit Price Information"}>
            <Spin spinning={loading}>
                <Form layout="horizontal">
                    <FormItem
                        label="Type"
                        labelCol={{xs: 24, sm: 6}}
                        wrapperCol={{xs: 24, sm: 16}}
                    >
                        <Input
                            placeholder="Enter the room's name here..."
                            name="name"
                            value={room.name}
                            onChange={hdChange}
                        />
                    </FormItem>
                    <FormItem
                        label="Select price"
                        labelCol={{xs: 24, sm: 6}}
                        wrapperCol={{xs: 24, sm: 16}}
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
                        <Button type="primary" onClick={hdSubmit}>Submit</Button>
                        <Button onClick={hdCancel}>Cancel</Button>
                    </FormItem>
                </Form>
            </Spin>
        </Card>
    )
}

export default RoomForm;
