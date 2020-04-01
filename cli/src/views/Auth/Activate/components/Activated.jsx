import React, { useEffect, useCallback, useState } from "react";
import { apiUser } from 'constants/api';

export default function Activated({ match, activateUser, history }) {
    const [loading, setLoading] = useState(true);

    const load = useCallback(async() => {
        try {
            await apiUser.activate(match.params.user_id);
            activateUser();
            setLoading(false);
            setTimeout(() =>  history.push("/"), 3000)
        } catch (e) {
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
                    <i className='fas fa-circle-notch fa-spin'/>
                </div>
                : <div className='activate'>
                    <h1>Your Staywell account has been activated,</h1>
                    <hr/>
                    <h3>You are now a part of Staywell community, no more actions required.
                        Redirect in several seconds...</h3>
                    <button>Get access now</button>
                </div>
            }
        </div>
    )
}
