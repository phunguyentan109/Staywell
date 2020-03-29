import React, {useState, useEffect} from "react";
import AuthInput from "components/Auth/AuthInput.jsx";
import {apiUser} from "constants/api";
import {connect} from "react-redux";
import {addMessage} from "appRedux/actions/message";
import withResize from "hocs/withResize";

function Forgot({message, negative, addMessage, history}) {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        return () => addMessage();
    }, [addMessage]);

    async function hdSubmit(e) {
        e.preventDefault();
        setLoading(true);
        try {
            if(email.length > 0) {
                if(email.indexOf("@") !== -1) {
                    await apiUser.forgot({email});
                    setEmail("");
                    addMessage("Reset password successfully", false);
                } else {
                    addMessage("Your email has incorrect format");
                    setLoading(false);
                }
            } else {
                addMessage("Please enter your email. Please try again!");
                setLoading(false);
            }
        } catch (err) {
            console.error(err);
            addMessage(err);
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
                        { message ? message : "" }
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
        message: message.text,
        negative: message.isNegative
    }
}

export default connect(mapState, {addMessage})(withResize(Forgot));
