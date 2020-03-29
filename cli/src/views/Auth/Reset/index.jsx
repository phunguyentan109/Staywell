import React, {useState, useEffect} from "react";
import {apiUser} from "constants/api";
import {Link} from "react-router-dom";
import AuthInput from "components/Auth/AuthInput.jsx";
import {connect} from "react-redux";
import {addMessage} from "appRedux/actions/message";
import withHelpers from "hocs/withHelpers";

const DEFAULT_ACCOUNT = {
    password: "",
    cpassword: "",
};

function ResetPassword({message, negative, addMessage, match}) {
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
                    await apiUser.resetPassword(match.params.token, {password: account.password});

                    setAccount(DEFAULT_ACCOUNT);
                    addMessage("Your resetted link has been sent to your mail successfully!", false);
                } else {
                    addMessage("Your password and confirm password not similar. Please try again");
                    setLoading(false);
                }
            } else {
                addMessage("Please fulfill to reset your password");
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

export default connect(mapState, {addMessage})(withHelpers(ResetPassword));
