import React, {useState} from "react";
import {Link} from "react-router-dom";
import AuthInput from "components/Auth/AuthInput.jsx";
import {connect} from "react-redux";
import {sendAuthData} from "appRedux/actions/user";

const DEFAULT_ACCOUNT = {
    email: "",
    password: "",
    cpassword: ""
}

function Register({sendAuthData}) {
    const [account, setAccount] = useState(DEFAULT_ACCOUNT);

    function hdSubmit(e) {
        e.preventDefault();
        sendAuthData("signup", account);
    }

    function hdChange(e) {
        const {value, name} = e.target;
        setAccount(prev => ({...prev, [name]: value}));
    }

    return (
        <div className="content">
            <h1>Sign up</h1>
            <h4>Please enter your account to complete your registration.</h4>
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
                <AuthInput
                    type="cpassword"
                    placeholder="Confirm Password"
                    name="password"
                    icon="fas fa-key"
                    value={account.cpassword}
                    onChange={hdChange}
                />
                <button className="signup">Create account</button>
            </form>
            <Link to="/reset">Forgot your password?</Link>
        </div>
    )
}

export default connect(null, {sendAuthData})(Register);
