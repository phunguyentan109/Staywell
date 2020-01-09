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

function HouseCalc({houses, currentPeople, endTime, price}) {

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

    return (
        <div>
            {
                houses.map((h, i) => i === houses.length - 1 ? (
                    <HouseItem
                        no={i+1}
                        begin={h.time}
                        end="Present"
                        length={getLength(h.time, moment())}
                        otherPeople={currentPeople - 1}
                        money={getMoney(h.time)}
                        key={i}
                    />
                ) : (
                    <Card title={`House Calculation #${i+1}`} className="gx-card" key={i}>
                        <div>
                            <p>{format(h.time.begin)} - {format(h.time.end)} ({h.time.length} day(s))</p>
                            <p>House: ${h.money} for {h.time.length} day(s) | ${h.money / (h.time.length > 0 ? h.time.length : 1)}/day</p>
                            <p>Room {h.room.name} | {h.room.numberOfPeople} people</p>
                            <hr/>
                        </div>
                    </Card>
                ))
            }
        </div>
    )
}

export default HouseCalc;
