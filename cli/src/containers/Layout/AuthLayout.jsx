import React from "react";
import bg from "assets/img/loginBg.jpg"
<<<<<<< HEAD
import {Switch, Route, withRouter} from "react-router-dom";
=======
import {Switch, Route, withRouter, Redirect} from "react-router-dom";
>>>>>>> Phu

import AuthNavbar from "containers/Bar/Navbar";
import Login from "views/Auth/Login";
import Register from "views/Auth/Register";
import RouteControl from "containers/Route/RouteControl";

<<<<<<< HEAD
function AuthLayout() {
=======
function AuthLayout({location}) {
>>>>>>> Phu
    return (
        <div className="auth-bg" style={{backgroundImage: `url(${bg})`}}>
            <div style={{backgroundColor: "rgba(0, 0, 0, 0.5)"}}>
                <AuthNavbar/>
                <Switch>
<<<<<<< HEAD
                    <RouteControl
                        exact path="/"
=======
                    <Route path="/activate"/>
                    <RouteControl
                        path="/register"
                        redirectPath="/app"
                        component={Register}
                        access={[
                            "GUEST_PERMISSION"
                        ]}
                    />
                    <RouteControl
                        path="/"
>>>>>>> Phu
                        redirectPath="/app"
                        component={Login}
                        access={[
                            "GUEST_PERMISSION"
                        ]}
                    />
<<<<<<< HEAD
                    <Route path="/register" component={Register}/>
=======
                    <Redirect from={location.pathname} to="/"/>
>>>>>>> Phu
                </Switch>
                <div className="auth-credit">
                    <p>©2019, designed and coded with all my <i className="fas fa-heartbeat"/> and <i className="fas fa-coffee"/> | Phu Nguyen</p>
                </div>
            </div>
        </div>
    )
};

export default withRouter(AuthLayout);
