import React, {useState, useEffect, useCallback} from "react";
import {Card, Spin, Form, Input, Button, Table, Row, Col} from "antd";
import withHelpers from "hocs/withHelpers";
import api, {apiCall} from "constants/api";

const FormItem = Form.Item;

function ContractList({notify, hdCancel, room, selectedRoom, loading, setLoading}) {
    const [electric, setElectric] = useState(0);
    const [contracts, setContracts] = useState([]);
    const [contract, setContract] = useState({});

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

    async function hdSubmit() {
        try {
            // Create contract
            let returnContractId = await apiCall(...api.contract.create(selectedRoom._id), {electric});

            // Initial bill in the contract
            await apiCall(...api.contract.create(returnContractId), {
                price: selectedRoom.price_id
            });

            // Get contract data to refresh the list
            let contractGet = await apiCall(...api.contract.getOne(selectedRoom._id, returnContractId));

            setContract(contractGet);
            setContracts(prev => [...prev, contractGet]);
        } catch (e) {
            notify("error", "The process cannot be done");
        }
    }

    return (
        <Row>
            <Col md={10}>
                <Card className="gx-card" title="Begin New Contract">
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
                <Card className="gx-card" title="Contract Management">
                    <Table
                        className="gx-table-responsive"
                        dataSource={contracts}
                        rowKey="_id"
                        columns={[
                            {
                                title: "Contract Timeline",
                                dataIndex: 'name'
                            },
                        ]}
                    />
                </Card>
            </Col>
            <Col md={14}>
                <Card className="gx-card" title="Contract's bills">
                    <Table
                        className="gx-table-responsive"
                        dataSource={contract.bill_id}
                        rowKey="_id"
                        columns={[
                            {
                                title: "Electric Fee",
                                dataIndex: 'electric'
                            },
                            {
                                title: "House Fee",
                                dataIndex: 'house'
                            },
                            {
                                title: "Water Fee",
                                dataIndex: 'water'
                            },
                            {
                                title: "Wifi",
                                dataIndex: 'wifi'
                            },
                            {
                                title: "Payment",
                                dataIndex: 'isPaid'
                            },
                            {
                                title: 'Action',
                                key: 'action',
                                render: (text, record) => room._id ? <span>None</span> : (
                                    <span>
                                        <span className="gx-link" onClick={console.log}>Checkout</span>
                                    </span>
                                )
                            }
                        ]}
                    />
                </Card>
            </Col>
        </Row>
    )
}

export default withHelpers(ContractList);
