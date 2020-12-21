import React from 'react'
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { clearAuthData } from 'appRedux/actions/user'
import PropTypes from 'prop-types'

function PublicNavbar({ location }) {
  // const [isRegister, setRegister] = useState(false)

  // const load = useCallback(() => {
  //   if (location.pathname !== '/')  return setRegister(true)
  //   setRegister(false)
  // }, [location.pathname])

  // useEffect(() => { load() }, [load])

  // function renderNavItem() {
  //   let to = isRegister ? '/' : '/register'
  //   let icon = isRegister ? 'fas fa-door-open' : 'fas fa-user-plus'
  //   let label = isRegister ? 'Try with different account?' : 'Create an account'
  //   return (
  //     <Link to={to}>
  //       <i className={icon} onClick={isRegister ? clearAuthData: null}/>
  //       <span>{label}</span>
  //     </Link>
  //   )
  // }

  return (
    <div className='auth-navbar'>
      <Link to='/'>Staywell</Link>
      {/*<div>*/}
      {/*  { renderNavItem() }*/}
      {/*  <Link to='/forgot' id='forgot'><i className='fas fa-key'/></Link>*/}
      {/*</div>*/}
    </div>
  )
}

PublicNavbar.propTypes = {
  location: PropTypes.object
}

export default withRouter(connect(null, { clearAuthData })(PublicNavbar))
