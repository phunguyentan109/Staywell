import React from 'react'
import { Menu } from 'antd'
import Link from 'react-router-dom/Link'
import { withRouter } from 'react-router-dom'
import { useSelector } from 'react-redux'
import PropTypes from 'prop-types'

import CustomScrollbars from 'util/CustomScrollbars'
import SidebarLogo from './SidebarLogo'
import UserProfile from './UserProfile'
import AppsNavigation from './AppsNavigation'
import {
  NAV_STYLE_NO_HEADER_EXPANDED_SIDEBAR,
  NAV_STYLE_NO_HEADER_MINI_SIDEBAR
} from '../../constants/ThemeSetting'
import { PermissionRender } from '../Permissions'

const MenuItemGroup = Menu.ItemGroup

const SidebarContent = ({ location }) => {

  let { navStyle, user } = useSelector(({ settings, user }) => ({
    settings,
    user: user.data
  }))

  const getNoHeaderClass = (navStyle) => {
    if (navStyle === NAV_STYLE_NO_HEADER_MINI_SIDEBAR || navStyle === NAV_STYLE_NO_HEADER_EXPANDED_SIDEBAR) {
      return 'gx-no-header-notifications'
    }
    return ''
  }

  const selectedKeys = location.pathname

  return (
    <>
      <SidebarLogo/>
      <div className='gx-sidebar-content'>
        <div className={`gx-sidebar-notifications ${getNoHeaderClass(navStyle)}`}>
          <UserProfile username={user.username} avatar={user.avatar.link} logout={() => {}}/>
          <AppsNavigation/>
        </div>
        <CustomScrollbars className='gx-layout-sider-scrollbar'>
          <Menu
            defaultOpenKeys={['/app']}
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
              <Menu.Item key='/app/contracts'>
                <Link to='/app/contracts'><i className='icon icon-feedback'/>
                  <span>Manage Contracts</span>
                </Link>
              </Menu.Item>
            </MenuItemGroup>
          </Menu>
        </CustomScrollbars>
      </div>
    </>
  )
}

SidebarContent.propTypes = {
  location: PropTypes.object
}

export default withRouter(SidebarContent)

