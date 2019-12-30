import React, {useState, useEffect, useCallback} from "react";
import {Card, Spin, Table} from "antd";
import withNoti from "hocs/withNoti";
import PopConfirm from "components/App/Pop/PopConfirm";
import moment from "moment";
import api, {apiCall} from "constants/api";

function Contract({notify, match}) {
    const [contracts, setContracts] = useState([]);
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

    function hdRemove(contract_id) {
        setLoading(true);
        try {
            setContracts(prev => prev.filter(c => c._id !== contract_id));
            return notify("success", "Process is completed successfully!", "Contract data is removed successfully.")
        } catch (e) {
            notify("error", "The data is not removed");
        }
        setLoading(false);
    }

    return (
        <Card title="List of contracts">
            <Spin spinning={loading}>
                <Table
                    className="gx-table-responsive"
                    dataSource={contracts}
                    rowKey="_id"
                    columns={[
                        {
                            title: "Timeline",
                            dataIndex: 'timeline',
                            render: text => <span>{text.map(time => moment(time).format("MMM DDDo, YYYY")).join(" - ")}</span>
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
                                </span>
                            )
                        }
                    ]}
                />
            </Spin>
        </Card>
    )
}

export default withNoti(Contract);
