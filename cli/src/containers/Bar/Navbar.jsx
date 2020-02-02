import React, {useEffect, useCallback, useState} from "react";
import {Link} from "react-router-dom";
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import {clearAuthData} from "appRedux/actions/user";
import withResize from "hocs/withResize";
import { message } from 'antd';

function AuthNavbar({noti, negative, location, clearAuthData, device}) {
    const [isRegister, setRegister] = useState(false);

    const load = useCallback(() => {
        if(location.pathname !== "/")  return setRegister(true);
        setRegister(false);
    }, [location.pathname])

    useEffect(() => {
        load();
    }, [load])

    function getTitle() {
        if(!device.isMobile) {
            if(isRegister) return " Create an account";
            return " Try with different account?"
        }
    }

    function showNoti(noti, negative) {
        if(negative === true && noti !=="") {
            message.error(noti)
        }
    }

    return (
        <div className="auth-navbar">
            <Link to="/">Staywell</Link>
            {
                showNoti(noti, negative)
            }
            <div>
                {
                    isRegister
                    ? <Link to="/" onClick={clearAuthData}><i className="fas fa-door-open"/>{getTitle()}</Link>
                    : <Link to="/register"><i className="fas fa-user-plus"/>{getTitle()}</Link>
                }
                {
                    device.isMobile && <Link to="/forgot"><i className="fas fa-key"/></Link>
                }
            </div>
        </div>
    )
};

function mapState({message}) {
    return {
        noti: message.message,
        negative: message.negative
    }
}

export default withRouter(connect(mapState, {clearAuthData})(withResize(AuthNavbar)));
