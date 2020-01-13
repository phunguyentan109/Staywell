import React from "react";
import {Card} from "antd";
import moment from "moment";
import {formatVND} from "util/helper";

function HouseItem({no, begin, end, otherPeople, money, length}) {
    function format(time) {
        return typeof time === "string" ? end : moment(time).format("MMM Do, YYYY");
    }

    return (
        <Card title={`House Calculation #${no}`} className="gx-card">
            <div>
                <p>{format(begin)} - {end} | {length} day(s)</p>
                <p>Live with: {otherPeople > 0 ? `${otherPeople}` : "Only himself"}</p>
                <p>Money paid: {money}</p>
            </div>
        </Card>
    )
}

function HouseCalc({timePoints, currentPeople, endTime, price}) {

    console.log("time points", timePoints);

    function getLength(begin, lastTimePointIndex) {
        let beginDate = moment(begin).dayOfYear();
        let endDate = moment(timePoints[lastTimePointIndex].time).dayOfYear();
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

    function getBegin(index) {
        let lastPointTime = timePoints[index - 1];
        return moment(lastPointTime).add(1, "days");
    }

    function arrangeTimeline() {
        // create timeline boxes with all the time points
        let timeline = timePoints.reduce((a, n, i) => {
            if(i > 0) {
                a.push({
                    no: i,
                    begin: getBegin(i),
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
            no: timeline.length + 1,
            begin: getBegin(lastIndexTillPresent),
            end: "Present",
            length: getLength(latestTimePoint.time, lastIndexTillPresent),
            otherPeople: latestTimePoint.people - 1,
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
