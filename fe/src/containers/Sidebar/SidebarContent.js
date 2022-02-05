import React from 'react'
import { Menu } from 'antd'
import { Link } from 'react-router-dom'

import CustomScrollbars from 'util/CustomScrollbars'
import SidebarLogo from './SidebarLogo'
import UserProfile from './UserProfile'
import AppsNavigation from './AppsNavigation'
import {
  NAV_STYLE_NO_HEADER_EXPANDED_SIDEBAR,
  NAV_STYLE_NO_HEADER_MINI_SIDEBAR,
} from 'constants/ThemeSetting'
import { useSelector } from 'react-redux'
import Permission from 'components/Permissions'
import PropTypes from 'prop-types'

const MenuItemGroup = Menu.ItemGroup

const SidebarContent = ({ sidebarCollapsed, setSidebarCollapsed }) => {
  const { navStyle } = useSelector(({ settings }) => settings)
  const pathname = useSelector(({ common }) => common.pathname)
  const userAvatar = useSelector(({ user }) => user?.data?.avatar)

  const getNoHeaderClass = (navStyle) => {
    if (navStyle === NAV_STYLE_NO_HEADER_MINI_SIDEBAR || navStyle === NAV_STYLE_NO_HEADER_EXPANDED_SIDEBAR) {
      return 'gx-no-header-notifications'
    }
    return ''
  }

  const selectedKeys = pathname.substr(1)
  const defaultOpenKeys = selectedKeys.split('/')[1]

  return (
    <>
      <SidebarLogo sidebarCollapsed={sidebarCollapsed} setSidebarCollapsed={setSidebarCollapsed}/>
      <div className='gx-sidebar-content'>
        <div className={`gx-sidebar-notifications ${getNoHeaderClass(navStyle)}`}>
          <UserProfile avatar={userAvatar} />
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
              {/* Manage People */}
              <Menu.Item key='/app'>
                <Link to='/app'>
                  <i className='icon icon-dasbhoard'/>
                  <span>Dashboard</span>
                </Link>
              </Menu.Item>
            </MenuItemGroup>

            <MenuItemGroup key='group' className='gx-menu-group' title='Group'>
              {/*<Permission.Render access={['OWNER_PM']}>*/}
              {/*<Menu.Item key='/app/people'>*/}
              {/*  <Link to='/app/people'>*/}
              {/*    <i className='icon icon-auth-screen'/>*/}
              {/*    <span>Manage People</span>*/}
              {/*  </Link>*/}
              {/*</Menu.Item>*/}

              {/* Manage Rooms */}
              <Menu.Item key='/app/rooms'>
                <Link to='/app/rooms'>
                  <i className='icon icon-widgets'/>
                  <span>Manage Room</span>
                </Link>
              </Menu.Item>

              {/* Manage Price */}
              <Menu.Item key='/app/price'>
                <Link to='/app/price'>
                  <i className='icon icon-pricing-table'/>
                  <span>Manage Price</span>
                </Link>
              </Menu.Item>

              {/* Manage Contract */}
              {/*<Menu.Item key='/app/contracts'>*/}
              {/*  <Link to='/app/contracts'><i className='icon icon-feedback'/>*/}
              {/*    <span>Manage Contracts</span>*/}
              {/*  </Link>*/}
              {/*</Menu.Item>*/}
              {/*</Permission.Render>*/}
            </MenuItemGroup>

          </Menu>
        </CustomScrollbars>
      </div>
    </>
  )
}

SidebarContent.propTypes = {
  sidebarCollapsed: PropTypes.bool,
  setSidebarCollapsed: PropTypes.func,
}

export default React.memo(SidebarContent)

