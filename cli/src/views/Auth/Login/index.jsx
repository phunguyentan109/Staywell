import React, {useState} from "react";
import {Link} from "react-router-dom";
import AuthInput from "components/Auth/AuthInput.jsx";
import {connect} from "react-redux";
import {sendAuthData} from "appRedux/actions/user";
import withResize from "hocs/withResize";
import { message } from 'antd';


const DEFAULT_ACCOUNT = {
    email: "",
    password: ""
}

function Login({message, negative, sendAuthData, history, device}) {
    const [account, setAccount] = useState(DEFAULT_ACCOUNT);

    function hdSubmit(e) {
        e.preventDefault();
        sendAuthData("login", account);
    }

    function hdChange(e) {
        const {value, name} = e.target;
        setAccount(prev => ({...prev, [name]: value}));
    }

    function showNoti(noti, negative) {
        if(negative === true && noti !=="") {
            message.error(noti)
        }
    }

    return (
        <div className="content">
            {
                device.isMobile
                ? <h1>What a nice day,</h1>
                : <h1>Welcome to Staywell,</h1>
            }
            <h4>Please enter your account to continue.</h4>
            <div className={`${negative ? "notify" : "no-notify"}`}>
                <span>
                    {message ? message : ""}
                </span>
            </div>
            <form className="auth-form" onSubmit={hdSubmit}>
                <AuthInput
                    placeholder="Email"
                    name="email"
                    icon="far fa-envelope"
                    value={account.email}
                    onChange={hdChange}
                />
                <AuthInput
                    type="password"
                    placeholder="Password"
                    name="password"
                    icon="fas fa-key"
                    value={account.password}
                    onChange={hdChange}
                />
                <button className="signin">Get access</button>
            </form>
            {device.isMobile || <Link to="/forgot">Forgot your password?</Link>}
        </div>
    )
}

function mapState({message}) {
    return {
<<<<<<< HEAD
        message: message.message,
=======
        noti: message.message,
>>>>>>> Implement message login
        negative: message.negative
    }
}

export default connect(mapState, {sendAuthData})(withResize(Login));
