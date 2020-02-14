import React, {useState, useEffect} from "react";
import api, {apiCall} from "constants/api";
import {Link} from "react-router-dom";
import AuthInput from "components/Auth/AuthInput.jsx";
import {connect} from "react-redux";
import {addMessage} from "appRedux/actions/message";
import withResize from "hocs/withResize";

function TimeOut() {
    return (
        <div className="activate">
            <h1>Reset password link has been timeout,</h1>
            <hr/>
            <h3>Your reset password link has been timeout. Please take a new link to reset your account password. We wish you to have a good day!</h3>
            <Link to="/forgot">
                <button>Resend forgot password</button>
            </Link>
        </div>
    )
}

function Reseted() {
    return (
        <div className="activate">
            <h1>Your Staywell password account has been reseted,</h1>
            <hr/>
            <h3>We has sent you confirmed email, what you can check it. We wish you to have a good day!</h3>
            <Link to="/">
                <button>Login your account</button>
            </Link>
        </div>
    )
}

const DEFAULT_ACCOUNT = {
    password: "",
    cpassword: "",
}

function ResetPassword({message, negative, addMessage, match, history}) {
    const [account, setAccount] = useState(DEFAULT_ACCOUNT);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        return () => addMessage();
    }, [addMessage]);

    async function hdSubmit(e) {
        e.preventDefault();
        setLoading(true);
        try {
            let {password, cpassword} = account;
            if(password.length > 0 && cpassword > 0) {
                if(password === cpassword) {
                    await apiCall(...api.user.resetPassword(match.params.token), {password: account.password});

                    setAccount(DEFAULT_ACCOUNT);
                    addMessage("Your resetted link has been sent to your mail successfully!", false);
                } else {
                    addMessage("Your password and confirm password not similar. Please try again");
                    setLoading(false);
                }
            } else {
                addMessage("Please fullfill to reset your password");
                setLoading(false);
            }
        } catch (err) {
            console.error(err);
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
            <h1>Reset password</h1>
            <h4>Please enter your new password and confirm password.</h4>
            {
                message
                ? <div className={`${negative ? "notify" : "great-notify"}`}>
                    <span>
                        {message.length > 0 ? message : ""}
                    </span>
                </div>
                : <span/>
            }
            <form className="auth-form" onSubmit={hdSubmit}>
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
                        : "Reset password"
                    }
                </button>
            </form>
            <Link to="/">Back to login page</Link>
        </div>
    )
}

function mapState({message}) {
    return {
        message: message.text,
        negative: message.isNegative
    }
}

const Reset = connect(mapState, {addMessage})(withResize(ResetPassword));

export { Reset, TimeOut, Reseted }
