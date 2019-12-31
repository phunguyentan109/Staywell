import React, {useEffect, useCallback, useState} from "react";
import api, {apiCall} from "constants/api";
import {Link} from "react-router-dom";
import AuthInput from "components/Auth/AuthInput.jsx";
import {connect} from "react-redux";

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
    cpassword: ""
}

function ResetPassword({match, history}) {
    const [account, setAccount] = useState(DEFAULT_ACCOUNT);
    const [loading, setLoading] = useState(true);

    const load = useCallback(async() => {
        try {
            await apiCall(...api.user.checkTokenReset(match.params.token));
            setLoading(false);
        } catch (e) {
            console.log(e);
            history.push("/timeout");
        }
    }, [history, match])

    useEffect(() => {
        load();
    }, [load])

    async function hdSubmit(e) {
        setLoading(true);
        try {
            e.preventDefault();
            let isValidPassword = account.password === account.cpassword;
            let isNotEmpty = account.password.length > 0;
            if(isNotEmpty && isValidPassword) {
                await apiCall(...api.user.resetPassword(match.params.token), {password: account.password});

                setAccount(DEFAULT_ACCOUNT);
                setTimeout(() => {
                    history.push("/reseted");
                }, 2000);
            } else {
                window.alert("The entered information is not valid. Please try again");
                setLoading(false);
            }
        } catch (e) {
            console.log(e);
            history.push("/timeout");
        }
    }

    function hdChange(e) {
        const {value, name} = e.target;
        setAccount(prev => ({...prev, [name]: value}));
    }

    return (
        <div className="content">
            <h1>Reset password</h1>
            <h4>Please enter your new password and confirm password.</h4>
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
                        ? <i class="fas fa-circle-notch fa-spin"/>
                        : "Reset password"
                    }
                </button>
            </form>
            <Link to="/">Back to login page</Link>
        </div>
    )
}

const Reset = connect(null, null)(ResetPassword)

export { Reset, TimeOut, Reseted }
