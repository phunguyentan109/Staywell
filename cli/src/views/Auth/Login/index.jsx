import React, {useState} from "react";
import {Link} from "react-router-dom";
import AuthInput from "components/Auth/AuthInput.jsx";
import {connect} from "react-redux";
import {sendAuthData} from "appRedux/actions/user";

const DEFAULT_ACCOUNT = {
    email: "",
    password: ""
}

function Login({sendAuthData, history}) {
    const [account, setAccount] = useState(DEFAULT_ACCOUNT);

    function hdSubmit(e) {
        e.preventDefault();
        sendAuthData("login", account);
    }

    function hdChange(e) {
        const {value, name} = e.target;
        setAccount(prev => ({...prev, [name]: value}));
    }

    return (
        <div className="content">
            <h1>Welcome to Staywell,</h1>
            <h4>Please enter your account to continue.</h4>
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
            <Link to="/reset">Forgot your password?</Link>
        </div>
    )
}

export default connect(null, {sendAuthData})(Login);
