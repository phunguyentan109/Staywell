import React, {Component} from "react";
import {Menu} from "antd";
import {Link} from "react-router-dom";
import {withRouter} from "react-router";

import CustomScrollbars from "util/CustomScrollbars";
import SidebarLogo from "./SidebarLogo";

import Auxiliary from "util/Auxiliary";
import UserProfile from "./UserProfile";
import AppsNavigation from "./AppsNavigation";
import {
    NAV_STYLE_NO_HEADER_EXPANDED_SIDEBAR,
    NAV_STYLE_NO_HEADER_MINI_SIDEBAR
} from "../../constants/ThemeSetting";
import {connect} from "react-redux";
import * as permissions from "constants/credentialControl";
import {clearAuthData} from "appRedux/actions/user";

// const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

class SidebarContent extends Component {

    getNoHeaderClass = (navStyle) => {
        if (navStyle === NAV_STYLE_NO_HEADER_MINI_SIDEBAR || navStyle === NAV_STYLE_NO_HEADER_EXPANDED_SIDEBAR) {
            return "gx-no-header-notifications";
        }
        return "";
    };
    getNavStyleSubMenuClass = (navStyle) => {
        if (navStyle === NAV_STYLE_NO_HEADER_MINI_SIDEBAR) {
            return "gx-no-header-submenu-popup";
        }
        return "";
    };

    render() {
        const {navStyle, user, clearAuthData, location} = this.props;
        const selectedKeys = location.pathname;
        const defaultOpenKeys = selectedKeys.split('/')[1];
        return (
            <Auxiliary>
                <SidebarLogo/>
                <div className="gx-sidebar-content">
                    <div className={`gx-sidebar-notifications ${this.getNoHeaderClass(navStyle)}`}>
                        <UserProfile
                            username={user.username}
                            avatar={user.avatar}
                            logout={clearAuthData}
                        />
                        <AppsNavigation/>
                    </div>
                    <CustomScrollbars className="gx-layout-sider-scrollbar">
                        <Menu
                            defaultOpenKeys={[defaultOpenKeys]}
                            selectedKeys={[selectedKeys]}
                            theme='dark'
                            mode="inline"
                        >
                            <MenuItemGroup
                                key="main"
                                className="gx-menu-group"
                                title="Main"
                            >
                                <Menu.Item key="/app/dashboard">
                                    <Link to="/app/dashboard"><i className="icon icon-dasbhoard"/>Dashboard</Link>
                                </Menu.Item>
                            </MenuItemGroup>

                            <MenuItemGroup
                                key="group"
                                className="gx-menu-group"
                                title="Group"
                            >
                                <Menu.Item key="/app/people">
                                    <Link to="/app/people"><i className="icon icon-pricing-table"/> Manage People</Link>
                                </Menu.Item>
                            </MenuItemGroup>
                        </Menu>
                    </CustomScrollbars>
                </div>
            </Auxiliary>
        );
    }
}

// SidebarContent.propTypes = {};
const mapStateToProps = ({user, settings}) => {
    const {navStyle, themeType, locale, pathname} = settings;
    const {isPermit} = permissions;
    const {role} = user.data;
    return {
        navStyle, themeType, locale, pathname,
        user: user.data,
        role: {
            isOwner: isPermit(role)(permissions.OWNER_PERMISSION),
            isPeople: isPermit(role)(permissions.PEOPLE_PERMISSION)
        }
    }
};

export default connect(mapStateToProps, {clearAuthData})(withRouter(SidebarContent));
