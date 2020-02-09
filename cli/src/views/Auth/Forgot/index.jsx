import React, {useState, useCallback, useEffect} from "react";
import AuthInput from "components/Auth/AuthInput.jsx";
// import api, {apiCall} from "constants/api";
import {connect} from "react-redux";
import {sendForgotMail} from "appRedux/actions/user";
import {clearMessage} from "appRedux/actions/message";
import withResize from "hocs/withResize";

function Forgot({message, negative, sendForgotMail, clearMessage, history}) {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);

    const load = useCallback(async() => {
        clearMessage();
    }, [clearMessage])

    useEffect(() => {
        load();
    }, [load])

    async function hdSubmit(e) {
        e.preventDefault();
        setLoading(true);
        try {
            // await apiCall(...api.user.forgotPassword(), {email});
            sendForgotMail(email);
            setEmail("");
        } catch (e) {
            console.error(e);
        }
        setLoading(false);
    }

    function hdChange(e) {
        setEmail(e.target.value);
    }

    return (
        <div className="content">
            <h1>Forgot password?</h1>
            <h4>Please fill in your email below to reset password.</h4>
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
                    placeholder="Email"
                    name="email"
                    icon="far fa-envelope"
                    value={email}
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
        </div>
    )
}

function mapState({message}) {
    return {
        message: message.message,
        negative: message.negative
    }
}

export default connect(mapState, {sendForgotMail, clearMessage})(withResize(Forgot));
