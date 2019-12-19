import React from "react";
import {Switch, Redirect, Route, withRouter} from "react-router-dom";
import RouteControl from "containers/Route/RouteControl";

// Views
import Dashboard from "./CRM/index";
import People from "./People";
import Price from "./Price";

function AppRoutes(props) {
    const url = props.match.url;
    return (
        <div className="gx-main-content-wrapper">
            <Switch>
                <RouteControl
                    path={`${url}/people`}
                    redirectPath={`${url}/`}
                    component={People}
                    access={[
                        "OWNER_PERMISSION"
                    ]}
                />
                <RouteControl
                    path={`${url}/price`}
                    redirectPath={`${url}/`}
                    component={Price}
                    access={[
                        "OWNER_PERMISSION"
                    ]}
                />
                <Route path={`${url}/`} component={Dashboard}/>
                <Redirect from={props.location.pathname} to={`${url}/`}/>
            </Switch>
        </div>
    )
}

export default withRouter(AppRoutes);
