import React from "react";
import {Link} from "react-router-dom";
import bg from "assets/img/loginBg.jpg"

import "assets/css/components/stayin-style.css";
import "assets/css/views/views.css";

const AuthLayout = ({bgColor, heading, link, intro, msg, notify, closeNoti, user, logOut, ...props}) => (
    <div className="authBg" style={{backgroundImage: `url(${bg})`}}>
        <div style={{backgroundColor: "rgba(0, 0, 0, 0.5)"}}>
            {/* <Grid
                container
                item
                justify="space-between"
                alignItems="center"
                className="authNavbar"
            > */}
            {/* <div className="container-fluid"> */}
                <div className="authNavbar">
                    <Link to="/">Staywell</Link>
                    {/* { */}
                        {/* // !user.isAuthenticated && link && ( */}
                            <Link to="/"><i className="fas fa-user-plus"/> Create an account</Link>
                        {/* ) */}
                    {/* } */}
                    {/* {
                        user.isAuthenticated &&
                        <Link to="" onClick={logOut}>
                            <i className="fas fa-door-open" ></i> Try with different account?
                        </Link>
                    } */}
                </div>
            {/* </div> */}
            {/* </Grid> */}
            <div id="content">
                {heading && <h1>{heading}</h1>}
                {intro && <h4>{intro}</h4>}
                {props.children}
            </div>
            <div className="authCredit">
                <p>©2018, designed and coded with all my <i className="fas fa-heartbeat"></i> and <i className="fas fa-coffee"></i> | Phu Nguyen</p>
            </div>
        </div>
    </div>
);

export default AuthLayout;
