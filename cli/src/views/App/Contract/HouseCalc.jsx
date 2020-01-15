import React from "react";
import {Card} from "antd";
import moment from "moment";
import {formatVND} from "util/helper";

function HouseItem({no, begin, end, otherPeople, money, length}) {
    function format(time) {
        return time === "Present" ? end : moment(time).format("MMM Do, YYYY");
    }

    return (
        <Card title={no ? `House Calculation #${no}` : "Curent in calculation"} className="gx-card">
            <div>
                <p>{format(begin)} - {format(end)} | {length} day(s)</p>
                <p>Live with: {otherPeople > 0 ? `${otherPeople} Other people` : "Only himself"}</p>
                <p>Money paid - {money}</p>
            </div>
        </Card>
    )
}

function HouseCalc({timePoints, endTime, price, currentPeople}) {

    function getLength(end, lastTimePointIndex) {
        let beginDate = moment(timePoints[lastTimePointIndex].time).dayOfYear();
        let endDate = moment(end).dayOfYear();
        return endDate - beginDate;
    }

    function getBillLength() {
        let beginDate = moment(timePoints[0].time).dayOfYear();
        let endDate = moment(endTime).dayOfYear();
        return endDate - beginDate;
    }

    function getMoney(beginTime, lastTimePointIndex) {
        let lengthToCurrent = getLength(beginTime, lastTimePointIndex);
        let lengthToEnd = getBillLength();
        return formatVND(price * (lengthToCurrent / lengthToEnd * 100));
    }

    function getBegin(lastIndex) {
        let lastPointTime = timePoints[lastIndex].time;
        return moment(lastPointTime).add(1, "days");
    }

    function arrangeTimeline() {
        // create timeline boxes with all the time points
        let timeline = timePoints.reduce((a, n, i) => {
            if(i > 0) {
                a.push({
                    no: i,
                    begin: getBegin(i - 1),
                    end: n.time,
                    length: getLength(n.time, i - 1),
                    otherPeople: n.people - 1,
                    money: getMoney(n.time, i - 1)
                })
            }
            return a;
        }, []);

        // add timeline box from last time point to present
        let lastIndexTillPresent = timePoints.length - 1;
        let latestTimePoint = timePoints[lastIndexTillPresent];
        timeline.push({
            begin: getBegin(lastIndexTillPresent),
            end: "Present",
            length: getLength(moment(), lastIndexTillPresent),
            otherPeople: currentPeople - 1,
            money: getMoney(latestTimePoint.time, lastIndexTillPresent)
        })

        return timeline;
    }

    return (
        <div>
            { arrangeTimeline().map((t, i) => <HouseItem {...t} key={i}/>) }
        </div>
    )
}

export default HouseCalc;
