import React from "react";

import Widget from "components/Widget/index";
import moment from "moment";

const Bill = () => {
    return (
        <div className="gx-card bill-record">
            <i className="icon icon-datepicker gx-fs-xl gx-mr-2"/>
            <h3 className="gx-text">{moment().format("MMM Do, YYYY")}</h3>
        </div>
    );
};

function PaidBill() {
    return (
        <div className="gx-card gx-blue-cyan-gradient gx-text-white paid-bill-record">
            <i className="icon icon-tag-o gx-fs-xl gx-mr-2"/>
            <h3 className="gx-text">{moment().format("MMM Do, YYYY")}</h3>
        </div>
    )
}

export {Bill, PaidBill};
