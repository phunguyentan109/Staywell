import React from "react";
import {Switch, Route} from "react-router-dom";
// import RouteControl from "containers/Route/RouteControl";
import {connect} from "react-redux";

import AppLayout from "containers/Layout/AppLayout";
import AuthLayout from "containers/Layout/AuthLayout";

function RootRoutes({user}) {

    return (
        <Switch>
            {/* <RouteControl
                path="/app"
                redirectPath="/"
                component={AppLayout}
                access={[
                    "ADMIN_PERMISSION",
                    "MANAGER_PERMISSION",
                    "SALESTAFF_PERMISSION",
                    "PROVIDER_PERMISSION"
                ]}
            /> */}
            <Route path="/" component={AuthLayout}/>
            <Route path="/app" component={AppLayout}/>
            {/* <Route path="/" component={ShopLayout}/> */}
        </Switch>
    )
}

function mapState({user}) {
    return {
        user: user.data
    }
}

export default connect(mapState, null)(RootRoutes);
