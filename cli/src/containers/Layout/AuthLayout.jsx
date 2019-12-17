import React from "react";
import bg from "assets/img/loginBg.jpg"
import {Switch, Route, withRouter} from "react-router-dom";

import AuthNavbar from "containers/Bar/Navbar";
import Login from "views/Auth/Login";
import Register from "views/Auth/Register";
import RouteControl from "containers/Route/RouteControl";

function AuthLayout() {
    return (
        <div className="auth-bg" style={{backgroundImage: `url(${bg})`}}>
            <div style={{backgroundColor: "rgba(0, 0, 0, 0.5)"}}>
                <AuthNavbar/>
                <Switch>
                    <RouteControl
                        exact path="/"
                        redirectPath="/app"
                        component={Login}
                        access={[
                            "GUEST_PERMISSION"
                        ]}
                    />
                    <Route path="/register" component={Register}/>
                </Switch>
                <div className="auth-credit">
                    <p>©2019, designed and coded with all my <i className="fas fa-heartbeat"/> and <i className="fas fa-coffee"/> | Phu Nguyen</p>
                </div>
            </div>
        </div>
    )
};

export default withRouter(AuthLayout);
