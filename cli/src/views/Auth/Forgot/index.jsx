import React, {useState} from "react";
import AuthInput from "components/Auth/AuthInput.jsx";
import api, {apiCall} from "constants/api";

function Forgot({history}) {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);

    async function hdSubmit(e) {
        e.preventDefault();
        setLoading(true);
        try {
            if(email.length > 0) {
                if(email.indexOf("@") !== -1) {
                    await apiCall(...api.user.forgotPassword(), {email});
                    setEmail("");
                    window.alert("Reset password successfully");
                    history.push("/");
                } else {
                    window.alert("Your email has incorrect format");
                }
            } else {
                window.alert("The entered information is not valid. Please try again");
                setLoading(false);
            }
        } catch (e) {
            console.error(e);
        }
        setLoading(false);
    }

    function hdChange(e) {
        const {value} = e.target;
        setEmail(value);
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

export default Forgot;
