import React, {useState, useEffect, useCallback} from "react";
import {Card, Spin, Form, Input, Button, Table, Row, Col} from "antd";
import withHelpers from "hocs/withHelpers";
import withBreadCrumb from "hocs/withBreadCrumb";
import { apiContract, apiBill, apiRoom } from 'constants/api';
import moment from "moment";
import {PaidBill, Bill} from "./Bill";

const FormItem = Form.Item;

function Contract({notify, hdCancel, room, match, loading, setLoading}) {
    const [contracts, setContracts] = useState([]);
    const [contract, setContract] = useState({});
    const [price, setPrice] = useState({});

    const load = useCallback(async() => {
        try {
            let {room_id} = match.params;
            let contractData = await apiContract.get(room_id);
            let roomData = await apiRoom.getOne(room_id);
            setContracts(contractData);
            setPrice(roomData.price_id);
        } catch (e) {
            notify("error", "The data cannot be loaded!");
        }
        setLoading(false);
    }, [match.params, notify, setLoading]);

    useEffect(() => {
        load();
    }, [load]);

    function hdView(contract) {
        setContract(contract);
    }

    async function hdSubmit() {
        // try {
        //     if(electric > 0) {
        //         let {room_id} = match.params;
        //         // Create contract
        //         let returnData = await apiContract.create(room_id, {electric});
        //
        //         // Initial bill in the contract
        //         await apiBill.create(room_id, returnData.contract_id, price);
        //
        //         // Get contract data to refresh the list
        //         let contractGet = await apiContract.getOne(room_id, returnData.contract_id);
        //
        //         setContract(contractGet);
        //         setContracts(prev => [...prev, contractGet]);
        //         setElectric(0);
        //     }
        // } catch (e) {
        //     notify("error", "The process cannot be done");
        // }
    }

    function displayTimeline(text, rec) {
        let begin = moment(text).format("MMM Do, YYYY");
        let finish = moment(rec.bill_id[rec.bill_id.length - 1].paidDate).format("MMM Do, YYYY");
        return (
            <span>From <b>{begin}</b> To <b>{finish}</b></span>
        )
    }

    return (
        <Row>
            <Col md={10}>
                <Card className="gx-card" title="Begin New Contract">
                    <Spin spinning={loading}>
                        {/*<Form layout="inline">*/}
                        {/*    <FormItem label="Electric Number">*/}
                        {/*        <Input*/}
                        {/*            placeholder="Set the starting electric number"*/}
                        {/*            value={electric}*/}
                        {/*            onChange={hdChange}*/}
                        {/*        />*/}
                        {/*    </FormItem>*/}
                        {/*    <FormItem>*/}
                        {/*        <Button type="primary" onClick={hdSubmit}>New contract</Button>*/}
                        {/*    </FormItem>*/}
                        {/*</Form>*/}
                    </Spin>
                </Card>
                <Card className="gx-card" title="List of contracts">
                    <Table
                        className="gx-table-responsive"
                        dataSource={contracts}
                        rowKey="_id"
                        columns={[
                            {
                                title: "Contract Timeline",
                                dataIndex: "createdAt",
                                render: displayTimeline
                            },
                            {
                                title: 'Actions',
                                key: 'action',
                                render: (text, record) => (
                                    <span>
                                        <span className="gx-link" onClick={hdView.bind(this, record)}>View bills</span>
                                    </span>
                                )
                            }
                        ]}
                    />
                </Card>
            </Col>
            <Col md={14}>
                <Bill />
                <PaidBill />
                {/* <Card className="gx-card" title="Contract's bills">
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
                                render: (text, record) => (
                                    <span>
                                        <span className="gx-link" onClick={console.log}>Checkout</span>
                                    </span>
                                )
                            }
                        ]}
                    />
                </Card> */}
            </Col>
        </Row>
    )
}

export default withBreadCrumb(withHelpers(Contract));
