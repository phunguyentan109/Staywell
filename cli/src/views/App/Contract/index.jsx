import React, {useState, useEffect, useCallback} from "react";
import {Row, Col, Card, Spin, Table, Divider} from "antd";
import withNoti from "hocs/withNoti";
import PopConfirm from "components/App/Pop/PopConfirm";
import moment from "moment";
import api, {apiCall} from "constants/api";
import {formatVND} from "util/helper";

import TimePointCalc from "./TimePointCalc";

const DEFAULT_BILL = {
    electric_id: [],
    house_id: []
};

function Contract({notify, match}) {
    const [contracts, setContracts] = useState([]);
    const [currentPeople, setCurrentPeople] = useState(0);
    const [bills, setBills] = useState([]);
    const [bill, setBill] = useState(DEFAULT_BILL);
    const [price, setPrice] = useState({});
    const [loading, setLoading] = useState(true);

    const load = useCallback(async() => {
        try {
            const {user_id} = match.params;
            let contractData = await apiCall(...api.contract.get(user_id));
            setContracts(contractData);
        } catch (e) {
            notify("error", "The data is not loaded");
        }
        setLoading(false);
    }, [notify, match.params])

    useEffect(() => {
        load();
    }, [load])

    async function hdRemove(contract_id) {
        setLoading(true);
        try {
            const {user_id} = match.params;
            await apiCall(...api.contract.remove(user_id, contract_id));
            setContracts(prev => prev.filter(c => c._id !== contract_id));
            notify("success", "Process is completed!", "Contract data is removed successfully.");
        } catch (e) {
            notify("error", "The data is not removed");
        }
        setLoading(false);
    }

    function getProgress(bills) {
        let paidBills = bills.filter(b => b.isPaid).length;
        return (paidBills / bills.length) * 100;
    }

    function hdViewBills(contract) {
        setCurrentPeople(contract.user_id.room_id.user_id.length);
        setBills(contract.bill_id);
        setPrice(contract.user_id.room_id.price_id);
    }

    function hdDetail(bill) {
        setBill(bill);
    }

    function renderMoneyElectric(record) {
        const {electric, house, timePoint_id} = record;
        let total = electric + house;
        if(timePoint_id.length > 1) {
            return (
                <span>
                    { formatVND(total) } { timePoint_id.length > 1
                        ? <span> <span className="gx-link" onClick={hdDetail.bind(this, record)}> <Divider type="vertical"/> +{timePoint_id.length} calculation(s)</span>
                         </span>
                        : null
                    }
                </span>
            )
        }
        return <span>{ formatVND(total) }</span>
    }

    return (
        <Row>
            <Col md={24}>
                <Card title="List of contracts" className="gx-card">
                    <Spin spinning={loading}>
                        <Table
                            className="gx-table-responsive"
                            dataSource={contracts}
                            rowKey="_id"
                            columns={[
                                {
                                    title: "Timeline",
                                    dataIndex: 'bill_id',
                                    render: (text, rec) => <span>{moment(text[0].endTime).format("MMM Do, YYYY")} - {moment(text[text.length - 1].endTime).format("MMM Do, YYYY")} {rec.active ? " | active": ""}</span>
                                },
                                {
                                    title: "Room",
                                    dataIndex: "room"
                                },
                                {
                                    title: "Progress",
                                    render: (record) => <span className="contract-progress"><span></span> {getProgress(record.bill_id)}%</span>
                                },
                                {
                                    title: 'Action',
                                    key: 'action',
                                    render: (text, record) => record.room_id ? <span>None</span> : (
                                        <span>
                                            <span
                                                className="gx-link"
                                                onClick={hdViewBills.bind(this, record)}
                                            >
                                                View bills ({record.bill_id.length})
                                            </span>
                                            <Divider type="vertical"/>
                                            <PopConfirm
                                                title="Are you sure to delete this contract?"
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
            </Col>
            {
                bills.length > 0 && <Col md={14}>
                    <Card title="List of bills" className="gx-card">
                        <Spin spinning={loading}>
                            <Table
                                className="gx-table-responsive"
                                dataSource={bills}
                                rowKey="_id"
                                columns={[
                                    {
                                        title: 'House & Electric',
                                        key: "H&E",
                                        render: renderMoneyElectric
                                    },
                                    {
                                        title: "Wifi",
                                        dataIndex: 'wifi',
                                        render: text => <span>{ formatVND(text) }</span>
                                    },
                                    {
                                        title: 'Water',
                                        dataIndex: 'water',
                                        render: text => <span>{ formatVND(text) }</span>
                                    },
                                    {
                                        title: 'Action',
                                        key: 'action',
                                        render: (text, record) => record.room_id ? <span>None</span> : (
                                            <span>
                                                <span className="gx-link" onClick={() => console.log("reveal")}>Reveal</span>
                                            </span>
                                        )
                                    }
                                ]}
                            />
                        </Spin>
                    </Card>
                </Col>
            }
            <Col md={10}>
                {
                    bill._id && <TimePointCalc
                        timePoints={bill.timePoint_id}
                        currentPeople={currentPeople}
                        endTime={bill.endTime}
                        price={price}
                    />
                }
            </Col>
        </Row>
    )
}

export default withNoti(Contract);
