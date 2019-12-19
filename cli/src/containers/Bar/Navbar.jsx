import React, {useEffect, useCallback, useState} from "react";
import {Link} from "react-router-dom";
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import {clearAuthData} from "appRedux/actions/user";

function AuthNavbar({location, clearAuthData}) {
    const [isRegister, setRegister] = useState(false);

    const load = useCallback(() => {
        if(location.pathname !== "/")  return setRegister(true);
        setRegister(false);
    }, [location.pathname])

    useEffect(() => {
        load();
    }, [load])

    return (
        <div className="auth-navbar">
            <Link to="/">Staywell</Link>
            {
                isRegister
                ? <Link to="/" onClick={clearAuthData}><i className="fas fa-door-open"/> Try with different account?</Link>
                : <Link to="/register"><i className="fas fa-user-plus"/> Create an account</Link>
            }
        </div>
    )
};

export default withRouter(connect(null, {clearAuthData})(AuthNavbar));
