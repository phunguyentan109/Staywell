import React from 'react'
import PropTypes from 'prop-types'
import './_styles.less'
import { Link } from 'react-router-dom'
import { Row } from 'antd'

function PublicLayout({ children, darken }) {
  return (
    <Row
      className='auth-bg'
      align='middle'
      justify='center'
      style={{ backgroundImage: 'url("/assets/images/auth/loginBg.jpg")' }}
    >
      <Row
        className='bgColor'
        style={{ backgroundColor: `rgba(0, 0, 0, ${darken})` }}
        align='middle'
        justify='center'
      >
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
      </Row>
    </Row>
  )
}

PublicLayout.propTypes = {
  children: PropTypes.any,
  darken: PropTypes.number
}

PublicLayout.defaultProps = {
  darken: 0.3
}

export default PublicLayout
