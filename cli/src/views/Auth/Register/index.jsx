import React, {useState, useEffect} from "react";
import {Link} from "react-router-dom";
import AuthInput from "components/Auth/AuthInput.jsx";
import {connect} from "react-redux";
import {sendAuthData} from "appRedux/actions/user";
import {addMessage} from "appRedux/actions/message"
import withResize from "hocs/withResize";

const DEFAULT_ACCOUNT = {
    email: "",
    password: "",
    cpassword: ""
}

function Register({message, negative, sendAuthData, addMessage, device}) {
    const [account, setAccount] = useState(DEFAULT_ACCOUNT);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        return () => addMessage();
    },[addMessage])

    function hdSubmit(e) {
        setLoading(true);
        try {
            e.preventDefault();
            let isValidPassword = account.password === account.cpassword;
            let isNotEmpty = account.email.length > 0 && account.password.length > 0;
            if(isNotEmpty && isValidPassword) {
                sendAuthData("signup", account);
                setAccount(DEFAULT_ACCOUNT);
                addMessage("Your account have been created. Please check your email and click link to active your account!", false);
            } else {
                addMessage("The entered information is not valid. Please try again");
                setLoading(false);
            }
        } catch (err) {
            console.log(err);
            addMessage(err);
        }
        setLoading(false);
    }

    function hdChange(e) {
        const {value, name} = e.target;
        setAccount(prev => ({...prev, [name]: value}));
    }

    return (
        <div className="content">
            <h1>Sign up</h1>
            <h4>Please fill in below to complete registration.</h4>
            {
                message.length > 0 && <div className={`${negative ? "notify" : "great-notify"}`}>
                    <span>{message}</span>
                </div>
            }
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
                    type="password"
                    placeholder="Confirm Password"
                    name="cpassword"
                    icon="fas fa-key"
                    value={account.cpassword}
                    onChange={hdChange}
                />
                <button className="signup" disabled={loading}>
                    {
                        loading
                        ? <i className="fas fa-circle-notch fa-spin"/>
                        : "Create account"
                    }
                </button>
            </form>
            {device.isMobile || <Link to="/forgot">Forgot your password?</Link>}
        </div>
    )
}

function mapState({message}) {
    return {
        message: message.text,
        negative: message.isNegative
    }
}

export default connect(mapState, {sendAuthData, addMessage})(withResize(Register));
