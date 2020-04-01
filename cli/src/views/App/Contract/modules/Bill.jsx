import React from 'react';
import moment from 'moment';

const Bill = () => {
    return (
        <div className='gx-card bill-record'>
            <i className='icon icon-datepicker gx-fs-xl gx-mr-2'/>
            <h3 className='gx-text'>{moment().format("MMM Do, YYYY")}</h3>
        </div>
    );
};

function PaidBill() {
    return (
        <div className='gx-card gx-blue-cyan-gradient gx-text-white paid-bill-record'>
            <div className='header'>
                <i className='icon icon-tag-o gx-fs-xl gx-mr-2'/>
                <h3 className='gx-text'>{moment().format("MMM Do, YYYY")}</h3>
            </div>
            <div className='body'>
                <div>
                    <h3>Electric*</h3>
                    <p>VND 80,000</p>
                </div>
                <div>
                    <h3>Wifi</h3>
                    <p>VND 60,000</p>
                </div>
                <div>
                    <h3>House</h3>
                    <p>VND 1,500,000</p>
                </div>
                <div>
                    <h3>Water</h3>
                    <p>VND 60,000</p>
                </div>
                <div>
                    <h3>Extra**</h3>
                    <p>VND 400,000</p>
                </div>
            </div>
            <div className='footer'>
                <div>
                    <span>(*) 85 KW used this month</span>
                    <span>(**) More than one people live in the room</span>
                </div>
                <h1>
                    <span>Total Money</span>
                    <span>VND 2,900,000</span>
                </h1>
            </div>
        </div>
    )
}

export { Bill, PaidBill };
