import React from "react";
import {connect} from "react-redux";
import {Avatar, Popover} from "antd";
import {clearAuthData} from "appRedux/actions/user";

function UserInfo({clearAuthData}) {
    let userMenuOptions = (
        <ul className="gx-user-popover">
            <li>My Account</li>
            <li>Connections</li>
            <li onClick={clearAuthData}>Logout</li>
        </ul>
    );
    return (
        <Popover
            overlayClassName="gx-popover-horizantal"
            placement="bottomRight"
            content={userMenuOptions}
            trigger="click"
        >
            <Avatar
                src='https://via.placeholder.com/150x150'
                className="gx-avatar gx-pointer"
                alt=""
            />
        </Popover>
    )
}

export default connect(null, {clearAuthData})(UserInfo);
