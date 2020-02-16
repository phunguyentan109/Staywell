import React, {useState, useEffect, useCallback} from "react";
import {Card, Spin, Form, Input, Button, Table} from "antd";
import withHelpers from "hocs/withHelpers";
import api, {apiCall} from "constants/api";

const FormItem = Form.Item;

function ContractList({notify, hdCancel, room, selectedRoom, loading, setLoading}) {
    const [electric, setElectric] = useState(0);
    const [contracts, setContracts] = useState([]);

    const load = useCallback(async() => {
        try {
            let roomData = await apiCall(...api.room.getOne(selectedRoom._id));
            setContracts(roomData.contract_id);
            setLoading(false);
        } catch (e) {
            notify("error", "The data cannot be loaded!");
        }
    }, [notify, selectedRoom._id, setLoading]);

    useEffect(() => {
        load();
    }, [load]);

    function hdChange(e) {
        setElectric(e.target.value);
    }

    function hdSubmit() {
        try {
            let returnContractId = apiCall(...api.contract.create(selectedRoom._id), {electric});
            let contractGet = apiCall(...api.contract.getOne(selectedRoom._id, returnContractId));
            setContracts(prev=> [...prev, contractGet]);
        } catch (e) {
            notify("error", "The process cannot be done");
        }
    }

    return (
        <div>
            <Card className="gx-card" title="Contract Management">
                <Table
                    className="gx-table-responsive"
                    dataSource={contracts}
                    rowKey="_id"
                    columns={[
                        {
                            title: "Contract Timeline",
                            dataIndex: 'name',
                        },
                    ]}
                />
            </Card>
            <Card className="gx-card" title="Contract Management">
                <Spin spinning={loading}>
                    <Form layout="inline">
                        <FormItem label="Electric Number">
                            <Input
                                placeholder="Set the starting electric number"
                                value={electric}
                                onChange={hdChange}
                            />
                        </FormItem>
                        <FormItem>
                            <Button type="primary" onClick={hdSubmit}>New contract</Button>
                            <Button onClick={hdCancel}>Cancel</Button>
                        </FormItem>
                    </Form>
                </Spin>
            </Card>
        </div>
    )
}

export default withHelpers(ContractList);
