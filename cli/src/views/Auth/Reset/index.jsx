import React, {useState} from "react";
// import api, {apiCall} from "constants/api";
import {Link} from "react-router-dom";
import AuthInput from "components/Auth/AuthInput.jsx";
import {connect} from "react-redux";
import {sendResetPassword} from "appRedux/actions/user";
import withResize from "hocs/withResize";

function TimeOut() {
    return (
        <div className="activate">
            <h1>Reset password link has been timeout,</h1>
            <hr/>
            <h3>Your reset password link has been timeout. Please take a new link to reset your account password. We wish you to have a good day!</h3>
            <Link to="/forgot">
                <button>
                    Resend forgot password
                </button>
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
                <button>
                    Login your account
                </button>
            </Link>
        </div>
    )
}

const DEFAULT_ACCOUNT = {
    password: "",
    cpassword: "",
}

function ResetPassword({message, negative, sendResetPassword, match, history}) {
    const [account, setAccount] = useState(DEFAULT_ACCOUNT);
    const [loading, setLoading] = useState(false);

    async function hdSubmit(e) {
        e.preventDefault();
        setLoading(true);
        try {
            sendResetPassword(match.params.token, account);
            // await apiCall(...api.user.resetPassword(match.params.token), {account});

            setAccount(DEFAULT_ACCOUNT);
        } catch (e) {
            console.error(e);
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
                        {message ? message : ""}
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
        message: message.message,
        negative: message.negative
    }
}

const Reset = connect(mapState, {sendResetPassword})(withResize(ResetPassword));

export { Reset, TimeOut, Reseted }
