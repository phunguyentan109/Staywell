import React from "react";
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import {Avatar, Popover} from "antd";
import {clearAuthData} from "appRedux/actions/user";

function UserInfo({clearAuthData, user}) {
    let userMenuOptions = (
        <ul className="gx-user-popover">
            <li><Link to="/app/profile">My Account</Link></li>
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
                src={user.avatar.link}
                className="gx-avatar gx-pointer"
                alt=""
            />
        </Popover>
    )
}

function mapState({user}) {
    return {
        user: user.data
    }
}

export default connect(mapState, {clearAuthData})(UserInfo);
