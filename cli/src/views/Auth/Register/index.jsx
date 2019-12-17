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
<<<<<<< HEAD

    function hdSubmit(e) {
        e.preventDefault();
        sendAuthData("signup", account);
=======
    const [loading, setLoading] = useState(false);

    function hdSubmit(e) {
        setLoading(true);
        try {
            e.preventDefault();
            let isValidPassword = account.password === account.cpassword;
            let isNotEmpty = account.email.length > 0 && account.password.length > 0
            if(isNotEmpty && isValidPassword) {
                sendAuthData("signup", account);
                setAccount(DEFAULT_ACCOUNT);
            } else {
                window.alert("The entered information is not valid. Please try again")
            }
        } catch (e) {
            console.log(e);
        }
        setLoading(false);
>>>>>>> Phu
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
<<<<<<< HEAD
                    type="cpassword"
                    placeholder="Confirm Password"
                    name="password"
=======
                    type="password"
                    placeholder="Confirm Password"
                    name="cpassword"
>>>>>>> Phu
                    icon="fas fa-key"
                    value={account.cpassword}
                    onChange={hdChange}
                />
<<<<<<< HEAD
                <button className="signup">Create account</button>
=======
                <button className="signup" disabled={loading}>
                    {
                        loading
                        ? <i class="fas fa-circle-notch fa-spin"/>
                        : "Create account"
                    }
                </button>
>>>>>>> Phu
            </form>
            <Link to="/reset">Forgot your password?</Link>
        </div>
    )
}

export default connect(null, {sendAuthData})(Register);
