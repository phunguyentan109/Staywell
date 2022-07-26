import React from 'react'
import bg from 'assets/img/loginBg.jpg'
import PropTypes from 'prop-types'
import './_styles.less'
import { Link } from 'react-router-dom'

function PublicLayout({ children }) {
  return (
    <div className='auth-bg' style={{ backgroundImage: `url(${bg})` }}>
      <div style={{ backgroundColor: 'rgba(0, 0, 0, 0.3)' }}>
        <div className='auth-navbar'>
          <Link to='/'>Staywell</Link>
        </div>

        {children}

        {/* <div className='auth-credit'>
          <p>©2019, designed and coded by Phu Nguyen</p>
          <p>
            ©2019, designed and coded with all my
            <i className='fas fa-heartbeat'/> and <i className='fas fa-coffee'/> | Phu Nguyen
          </p>
        </div> */}
      </div>
    </div>
  )
}

PublicLayout.propTypes = {
  children: PropTypes.any
}

export default PublicLayout
