import React, { Component } from 'react'
import { Menu } from 'antd'
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router'

import CustomScrollbars from 'util/CustomScrollbars'
import SidebarLogo from './SidebarLogo'

import Auxiliary from 'util/Auxiliary'
import UserProfile from './UserProfile'
import AppsNavigation from './AppsNavigation'
import {
  NAV_STYLE_NO_HEADER_EXPANDED_SIDEBAR,
  NAV_STYLE_NO_HEADER_MINI_SIDEBAR
} from '../../constants/ThemeSetting'
import { connect } from 'react-redux'
import { PermissionRender } from 'containers/Permissions'
import { clearAuthData } from 'appRedux/actions/user'

const MenuItemGroup = Menu.ItemGroup

class SidebarContent extends Component {

    getNoHeaderClass = (navStyle) => {
      if (navStyle === NAV_STYLE_NO_HEADER_MINI_SIDEBAR || navStyle === NAV_STYLE_NO_HEADER_EXPANDED_SIDEBAR) {
        return 'gx-no-header-notifications'
      }
      return ''
    };

    render() {
      const { navStyle, user, clearAuthData, location } = this.props
      const selectedKeys = location.pathname
      const defaultOpenKeys = selectedKeys.split('/')[1]
      return (
        <Auxiliary>
          <SidebarLogo/>
          <div className='gx-sidebar-content'>
            <div className={`gx-sidebar-notifications ${this.getNoHeaderClass(navStyle)}`}>
              <UserProfile username={user.username} avatar={user.avatar.link} logout={clearAuthData}/>
              <AppsNavigation/>
            </div>
            <CustomScrollbars className='gx-layout-sider-scrollbar'>
              <Menu
                defaultOpenKeys={[defaultOpenKeys]}
                selectedKeys={[selectedKeys]}
                theme='dark'
                mode='inline'
              >
                <MenuItemGroup key='main' className='gx-menu-group' title='Main'>
                  <Menu.Item key='/app'>
                    <Link to='/app'>
                      <i className='icon icon-dasbhoard'/>
                      <span>Dashboard</span>
                    </Link>
                  </Menu.Item>
                </MenuItemGroup>

                <MenuItemGroup key='group' className='gx-menu-group' title='Group'>
                  {/* Manage People */}
                  <Menu.Item key='/app/people'>
                    <PermissionRender access={['OWNER_PM']}>
                      <Link to='/app/people'>
                        <i className='icon icon-auth-screen'/>
                        <span>Manage People</span>
                      </Link>
                    </PermissionRender>
                  </Menu.Item>

                  {/* Manage Rooms */}
                  <Menu.Item key='/app/rooms'>
                    <PermissionRender access={['OWNER_PM']}>
                      <Link to='/app/rooms'>
                        <i className='icon icon-widgets'/>
                        <span>Manage Room</span>
                      </Link>
                    </PermissionRender>
                  </Menu.Item>

                  {/* Manage Price */}
                  <Menu.Item key='/app/price'>
                    <PermissionRender access={['OWNER_PM']}>
                      <Link to='/app/price'>
                        <i className='icon icon-pricing-table'/>
                        <span>Manage Price</span>
                      </Link>
                    </PermissionRender>
                  </Menu.Item>
                </MenuItemGroup>
              </Menu>
            </CustomScrollbars>
          </div>
        </Auxiliary>
      )
    }
}

const mapStateToProps = ({ user, settings }) => {
  const { navStyle, themeType, locale, pathname } = settings
  return {
    navStyle, themeType, locale, pathname,
    user: user.data,
  }
}

export default connect(mapStateToProps, { clearAuthData })(withRouter(SidebarContent))
