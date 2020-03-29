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
            This is contract page
        </Row>
    )
}

export default withBreadCrumb(withHelpers(Contract));
