import React, { useState, useEffect, useCallback } from 'react'
import PropTypes from 'prop-types'
import { Row, Col, Card } from 'antd'
import ContractNavs from '../modules/ContractNavs'
import { apiRoom } from 'constants/api'

export default function ContractSidebar({ children, loading, ...props }) {
  const [rooms, setRooms] = useState([])

  const init = useCallback(async() => {
    let rooms = await apiRoom.get()
    setRooms(rooms)
    loading(false)
  }, [loading])

  useEffect(() => { init() }, [init])

  // return (
  //   <>
  //     <div className='gx-d-block gx-d-lg-none'>
  //       <Drawer
  //         placement='left'
  //         closable={false}
  //         visible={false}
  //         onClose={() => {}}
  //       >
  //         <ContractNavs rooms={rooms} {...props}>
  //           { children }
  //         </ContractNavs>
  //       </Drawer>
  //     </div>
  //     <div className='gx-module-sidenav gx-d-none gx-d-lg-flex'>
  //       <ContractNavs rooms={rooms} {...props}>
  //         { children }
  //       </ContractNavs>
  //     </div>
  //   </>
  // )

  return (
    // <Card className='gx-card contract-sidebar' title='Available Contracts For:'>
    <Card className='gx-card contract-sidebar'>
      <div className='gx-module-side-header'>
        <div className='gx-module-logo'>
          <i className='icon icon-wysiwyg gx-mr-3'/>
          <span>Contract Options</span>
        </div>
      </div>
      {children}
      <ContractNavs rooms={rooms} {...props}/>
    </Card>
  )
}

ContractSidebar.propTypes = {
  children: PropTypes.any,
  loading: PropTypes.func
}

ContractSidebar.defaultProps = {
  loading: () => {}
}
