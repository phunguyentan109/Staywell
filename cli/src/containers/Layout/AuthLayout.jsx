import React from "react";
import bg from "assets/img/loginBg.jpg"
import {Switch, Route, withRouter, Redirect} from "react-router-dom";

import AuthNavbar from "containers/Bar/Navbar";
import Login from "views/Auth/Login";
import Register from "views/Auth/Register";
import Forgot from "views/Auth/Forgot";
import {TimeOut, Reseted, Reset} from "views/Auth/Reset";

import {Activate, ActivatedView} from "views/Auth/Activate";
import RouteControl from "containers/Route/RouteControl";

function AuthLayout({location}) {
    return (
        <div className="auth-bg" style={{backgroundImage: `url(${bg})`}}>
            <div style={{backgroundColor: "rgba(0, 0, 0, 0.5)"}}>
                <AuthNavbar/>
                <Switch>
                    <Route path="/activate/:user_id" component={ActivatedView}/>
                    <Route path="/reset/:token" component={Reset}/>
                    <RouteControl 
                        path="/timeout" 
                        redirectPath="/forgot"
                        component={TimeOut}
                        access={[
                            "GUEST_PERMISSION"
                        ]}
                    />
                    <RouteControl 
                        path="/reseted" 
                        redirectPath="/"
                        component={Reseted}
                        access={[
                            "GUEST_PERMISSION"
                        ]}
                    />
                    <RouteControl
                        path="/activate"
                        redirectPath="/app"
                        component={Activate}
                        access={[
                            "UNACTIVE_PERMISSION"
                        ]}
                    />
                    <RouteControl
                        path="/register"
                        redirectPath="/activate"
                        component={Register}
                        access={[
                            "GUEST_PERMISSION"
                        ]}
                    />
                    <RouteControl
                        path="/forgot"
                        redirectPath="/"
                        component={Forgot}
                        access={[
                            "GUEST_PERMISSION"
                        ]}
                    />
                    <RouteControl
                        path="/"
                        redirectPath="/activate"
                        component={Login}
                        access={[
                            "GUEST_PERMISSION"
                        ]}
                    />
                    <Redirect from={location.pathname} to="/"/>
                </Switch>
                <div className="auth-credit">
                    <p>©2019, designed and coded with all my <i className="fas fa-heartbeat"/> and <i className="fas fa-coffee"/> | Phu Nguyen</p>
                </div>
            </div>
        </div>
    )
};

export default withRouter(AuthLayout);
