import React from "react";
import {Card} from "antd";
import moment from "moment";
import {formatVND} from "util/helper";

function ElectricItem({no, begin, end, otherPeople, money, length, number}) {
    function format(time) {
        return time === "Present" ? end : moment(time).format("MMM Do, YYYY");
    }

    return (
        <Card title={no ? `Electric Calculation #${no}` : "Current in calculation"} className="gx-card">
            <div>
                <p>{format(begin)} - {format(end)} {length ? `| ${length} day(s)` : ""}</p>
                <p>Live with: {otherPeople > 0 ? `${otherPeople} Other people` : "Only himself"}</p>
                <p>Money paid - {no ? money : <i>[ Unknown electric amount ]</i>}</p>
                {no && <p>Electric used: {number} kw/h - </p>}
            </div>
        </Card>
    )
}

function ElectricCalc({timePoints, price, currentPeople}) {

    function getLength(end, lastTimePointIndex) {
        let beginDate = moment(timePoints[lastTimePointIndex].time).dayOfYear();
        let endDate = moment(end).dayOfYear();
        return endDate - beginDate;
    }

    function getMoney(index, people) {
        if(index !== 0) {
            let electricUsed = timePoints[index].number - timePoints[index - 1].number;
            return formatVND((price * electricUsed) / people);
        }
        return "...";
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
                    money: getMoney(i, n.people),
                    number: n.number
                })
            }
            return a;
        }, []);

        return timeline;
    }

    return (
        <div>
            { arrangeTimeline().map((t, i) => <ElectricItem {...t} key={i}/>) }
            <Card className="gx-card">
                <div>
                    <span style={{"lineHeight": "2"}}>Calculation continues after acquiring new electric number...</span>
                </div>
            </Card>
        </div>
    )
}

export default ElectricCalc;
