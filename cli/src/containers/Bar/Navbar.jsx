import React, {useEffect, useCallback, useState} from "react";
import {Link} from "react-router-dom";
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import {clearAuthData} from "appRedux/actions/user";
import withResize from "hocs/withResize";

function AuthNavbar({location, clearAuthData, device}) {
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

    return (
        <div className="auth-navbar">
            <Link to="/">Staywell</Link>
            {
                isRegister
                ? <Link to="/" onClick={clearAuthData}><i className="fas fa-door-open"/>{getTitle()}</Link>
                : <Link to="/register"><i className="fas fa-user-plus"/>{getTitle()}</Link>
            }
        </div>
    )
};

export default withRouter(connect(null, {clearAuthData})(withResize(AuthNavbar)));
