import React, {useState} from "react";
import AuthInput from "components/Auth/AuthInput.jsx";
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import {sendAuthData} from "appRedux/actions/user";

function SendForgot() {
    return (
        <div className="activate">
            <h1>An email has been sent from Staywell,</h1>
            <hr/>
            <h3>We has sent you an email. Please check it and follows instructions to reset your account password. We wish you to have a good day!</h3>
            <Link to="/forgot">
                <button>
                    Resend forgot password
                </button>
            </Link>
        </div>
    )
}

const DEFAULT_ACCOUNT = {
    email: ""
}

function ForgetForm({sendAuthData, history}) {
    const [account, setAccount] = useState(DEFAULT_ACCOUNT);
    const [loading, setLoading] = useState(false);

    function hdSubmit(e) {
        setLoading(true);
        try {
            e.preventDefault();
            let isValidEmail = account.email;
            let isNotEmpty = account.email.length > 0;
            if(isNotEmpty && isValidEmail) {
                sendAuthData("forgot", account);
                setAccount(DEFAULT_ACCOUNT);
                setTimeout(() => {
                    history.push("/sendforgot");
                }, 1500);
            } else {
                window.alert("The entered information is not valid. Please try again");
                setLoading(false);
            }
        } catch (e) {
            console.log(e);
        }
    }

    function hdChange(e) {
        const {value, name} = e.target;
        setAccount(prev => ({...prev, [name]: value}));
    }

    return (
        <div className="content">
            <h1>Reset password</h1>
            <h4>Please enter your email to complete reset password form.</h4>
            <form className="auth-form" onSubmit={hdSubmit}>
                <AuthInput
                    placeholder="Email"
                    name="email"
                    icon="far fa-envelope"
                    value={account.email}
                    onChange={hdChange}
                />
                <button className="signup" disabled={loading}>
                    {
                        loading
                        ? <i class="fas fa-circle-notch fa-spin"/>
                        : "Reset password"
                    }
                </button>
            </form>
        </div>
    )
}

const Forgot = connect(null, {sendAuthData})(ForgetForm)

export { Forgot, SendForgot }
