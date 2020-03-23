import React, {useEffect, useCallback, useState} from "react";
import {apiUser} from "constants/api";
import {connect} from "react-redux";
import {activateUser} from "appRedux/actions/user";

function Activate() {
    return (
        <div className="activate">
            <h1>An email has been sent from Staywell,</h1>
            <hr/>
            <h3>We has sent you an email. Please check it and follows instructions to activate your account and start using our system. We wish you to have a good day!</h3>
            <button>Resend email</button>
        </div>
    )
}

function Activated({match, activateUser, history}) {
    const [loading, setLoading] = useState(true);

    const load = useCallback(async() => {
        try {
            await apiUser.activate(match.params.user_id);
            activateUser();
            setLoading(false);
            setTimeout(() => {
                history.push("/");
            }, 3000)
        } catch (e) {
            console.log(e);
            history.push("/");
        }
    }, [activateUser, history, match]);

    useEffect(() => {
        load();
    }, [load]);

    return (
        <div>
            {
                loading
                ? <div className='activating'>
                    <h1>Activating your account...</h1>
                    <i className="fas fa-circle-notch fa-spin"/>
                </div>
                : <div className="activate">
                    <h1>Your Staywell account has been activated,</h1>
                    <hr/>
                    <h3>You are now a part of Staywell community, no more actions required. Redirect in several seconds...</h3>
                    <button>Get access now</button>
                </div>
            }
        </div>
    )
}

const ActivatedView = connect(null, {activateUser})(Activated);

export { ActivatedView, Activate }
