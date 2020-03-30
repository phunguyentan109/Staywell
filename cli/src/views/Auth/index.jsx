import React from "react";
import { Switch, Route, withRouter, Redirect } from "react-router-dom";

import Login from "views/Auth/Login";
import Register from "views/Auth/Register";
import Forgot from "views/Auth/Forgot";
import Reset from './Reset';

import { Activate, ActivatedView } from './Activate';
import RouteControl from 'containers/Route/RouteControl';

function AuthRoutes({ location }) {
    return (
        <Switch>
            <Route path='/activate/:user_id' component={ActivatedView}/>
            <Route path='/reset/:token' component={Reset}/>
            <RouteControl
                path='/activate'
                redirectPath='/app'
                component={Activate}
                access={[
                    "UNACTIVE_PERMISSION"
                ]}
            />
            <RouteControl
                path='/register'
                redirectPath='/activate'
                component={Register}
                access={[
                    "GUEST_PERMISSION"
                ]}
            />
            <RouteControl
                path='/forgot'
                redirectPath='/'
                component={Forgot}
                access={[
                    "GUEST_PERMISSION"
                ]}
            />
            <RouteControl
                path='/'
                redirectPath='/activate'
                component={Login}
                access={[
                    "GUEST_PERMISSION"
                ]}
            />
            <Redirect from={location.pathname} to='/'/>
        </Switch>
    )
};

export default withRouter(AuthRoutes);
