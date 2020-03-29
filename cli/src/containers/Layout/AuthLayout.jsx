import React from "react";
import bg from "assets/img/loginBg.jpg"
import withHelpers from "hocs/withHelpers";

import AuthNavbar from "containers/Bar/Navbar";
import AuthRoutes from "views/Auth/index";

function AuthLayout({location, device}) {
    return (
        <div className="auth-bg" style={{backgroundImage: `url(${bg})`}}>
            <div style={{backgroundColor: "rgba(0, 0, 0, 0.5)"}}>
                <AuthNavbar/>
                <AuthRoutes/>
                <div className="auth-credit">
                    {
                        device.isMobile
                        ? <p>©2019, designed and coded by Phu Nguyen</p>
                        : <p>©2019, designed and coded with all my <i className="fas fa-heartbeat"/> and <i className="fas fa-coffee"/> | Phu Nguyen</p>
                    }
                </div>
            </div>
        </div>
    )
};

export default withHelpers(AuthLayout);
