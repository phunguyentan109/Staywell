import React from "react";
import moment from "moment";
import {Card} from "antd";
import {formatVND} from "util/helper";

function TimePointItem({no, begin, end, otherPeople, electricMoney, houseMoney, length, number}) {
    function format(time) {
        return time === "Present" ? end : moment(time).format("MMM Do, YYYY");
    }

    return (
        <Card title={no ? `TimePoint-Based Calculation #${no}` : "Current in calculation"} className="gx-card">
            <div>
                <p>{format(begin)} - {format(end)}</p>
                <p>Live in: {length} day(s) - {otherPeople > 0 ? `With ${otherPeople} Other people` : "Single"} - {houseMoney}</p>
                <p>Electric used: {number} kw/h - {electricMoney}</p>
            </div>
        </Card>
    )
}

function TimePointCalc({timePoints, currentPeople, endTime, price}) {
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

    function getHouseMoney(beginTime, lastTimePointIndex) {
        let lengthToCurrent = getLength(beginTime, lastTimePointIndex);
        let lengthToEnd = getBillLength();
        return formatVND(price.house * (lengthToCurrent / lengthToEnd * 100));
    }

    function getElectricMoney(index, people) {
        if(index !== 0) {
            let electricUsed = timePoints[index].number - timePoints[index - 1].number;
            return formatVND((price.electric * electricUsed) / people);
        }
        return "???";
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
                    number: n.number - timePoints[i - 1].number,
                    houseMoney: getHouseMoney(n.time, i - 1),
                    electricMoney: getElectricMoney(i, n.people)
                })
            }
            return a;
        }, []);

        // add timeline box from last time point to present
        // let lastIndexTillPresent = timePoints.length - 1;
        // let latestTimePoint = timePoints[lastIndexTillPresent];
        // timeline.push({
        //     begin: getBegin(lastIndexTillPresent),
        //     end: "Present",
        //     length: getLength(moment(), lastIndexTillPresent),
        //     otherPeople: currentPeople - 1,
        //     money: getHouseMoney(latestTimePoint.time, lastIndexTillPresent)
        // })

        return timeline;
    }

    return (
        <div>
            { arrangeTimeline().map((t, i) => <TimePointItem {...t} key={i}/>) }
        </div>
    )
}

export default TimePointCalc;
