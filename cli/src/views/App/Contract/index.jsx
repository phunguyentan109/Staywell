import React, {useState, useEffect, useCallback} from "react";
import {Row, Col, Card, Spin, Table, Divider} from "antd";
import withNoti from "hocs/withNoti";
import PopConfirm from "components/App/Pop/PopConfirm";
import moment from "moment";
import api, {apiCall} from "constants/api";

function Contract({notify, match}) {
    const [contracts, setContracts] = useState([]);
    const [bills, setBills] = useState([]);
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

    function hdViewBills(bills) {
        setBills(bills);
    }

    return (
        <Row>
            <Col md={12}>
                <Card title="List of contracts">
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
                                    title: "Progress",
                                    render: (record) => <span className="contract-progress"><span></span> {getProgress(record.bill_id)}%</span>
                                },
                                {
                                    title: 'Action',
                                    key: 'action',
                                    render: (text, record) => record.room_id ? <span>None</span> : (
                                        <span>
                                            <span className="gx-link" onClick={hdViewBills.bind(this, record.bill_id)}>
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
            <Col md={12}>
                <Card title="List of bills" className="gx-card">
                    <Spin spinning={loading}>
                        <Table
                            className="gx-table-responsive"
                            dataSource={bills}
                            rowKey="_id"
                            columns={[
                                {
                                    title: 'House',
                                    dataIndex: 'house_id',
                                    render: text => <span>{text.length} calculation(s)</span>
                                },
                                {
                                    title: "Electric",
                                    dataIndex: 'electric_id',
                                    render: text => <span>{text.length} calculation(s)</span>
                                },
                                {
                                    title: "Wifi",
                                    dataIndex: 'wifi',
                                    render: text => <span>$ {text.toFixed(2)}</span>
                                },
                                {
                                    title: 'Water',
                                    dataIndex: 'water',
                                    render: text => <span>$ {text.toFixed(2)}</span>
                                },
                                {
                                    title: 'Action',
                                    key: 'action',
                                    render: (text, record) => record.room_id ? <span>None</span> : (
                                        <span>
                                            <span className="gx-link">Detail</span>
                                        </span>
                                    )
                                }
                            ]}
                        />
                    </Spin>
                </Card>
            </Col>
        </Row>
    )
}

export default withNoti(Contract);
