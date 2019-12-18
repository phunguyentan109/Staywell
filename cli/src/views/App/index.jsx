import React from "react";
import {Switch, Redirect, Route, withRouter} from "react-router-dom";

// Views
import Dashboard from "./CRM/index";

function AppRoutes(props) {
    const url = props.match.url;
    return (
        <div className="gx-main-content-wrapper">
            <Switch>
                <Route path={`${url}/`} component={Dashboard}/>
                <Redirect from={props.location.pathname} to={`${url}/`}/>
            </Switch>
        </div>
    )
}

export default withRouter(AppRoutes);
