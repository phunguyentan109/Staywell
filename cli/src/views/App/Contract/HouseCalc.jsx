import React from "react";
import {Card} from "antd";
import moment from "moment";
import {formatVND} from "util/helper";

const HouseItem = ({no, begin, end, otherPeople, money, length}) => (
    <Card title={`House Calculation #${no}`} className="gx-card">
        <div>
            <p>{begin} - {end} | {length} day(s)</p>
            <p>Live with: {otherPeople > 0 ? `${otherPeople}` : "Only himself"}</p>
            <p>Money paid: {money}</p>
        </div>
    </Card>
)

function HouseCalc({timePoints, currentPeople, endTime, price}) {

    function format(time) {
        return moment(time).format("MMM Do, YYYY");
    }

    function getLength(begin, end, firstDayCount = 0) {
        let beginDate = moment(begin).dayOfYear();
        let endDate = moment(end).dayOfYear();
        return endDate - beginDate + firstDayCount;
    }

    function getMoney(beginTime) {
        let current = moment();
        let lengthToCurrent = getLength(beginTime, current);
        let lengthToEnd = getLength(beginTime, endTime);
        return formatVND(price.house * (lengthToCurrent / lengthToEnd * 100));
    }

    function getFirstBegin(time) {
        let subtractTime = moment(time).subtract(1, "days");
        return format(subtractTime);
    }

    function getBegin(index, time) {
        let lastPointTime = timePoints[index - 1].time;
        return moment(lastPointTime).add(1, "days");
    }

    return (
        <div>
            {
                timePoints.map((point, i) => i === timePoints.length - 1 ? (
                    <HouseItem
                        no={i+1}
                        begin={getFirstBegin(point.time)}
                        end="Present"
                        length={getLength(point.time, moment(), 1)}
                        otherPeople={currentPeople - 1}
                        money={getMoney(point.time)}
                        key={i}
                    />
                ) : (
                    <HouseItem
                        no={i+1}
                        begin={getBegin(i, point.time)}
                        end={point.time}
                        length={getLength(point.time, moment(), 1)}
                        otherPeople={point.people - 1}
                        money={getMoney(point.time)}
                        key={i}
                    />
                ))
            }
        </div>
    )
}

export default HouseCalc;
