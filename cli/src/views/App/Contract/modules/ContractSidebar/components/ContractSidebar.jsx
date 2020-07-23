import React, { useState, useEffect, useCallback } from 'react'
import PropTypes from 'prop-types'
import { Drawer } from 'antd'
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

  return (
    <>
      <div className='gx-d-block gx-d-lg-none'>
        <Drawer
          placement='left'
          closable={false}
          visible={false}
          onClose={() => {}}
        >
          <ContractNavs rooms={rooms} {...props}>
            { children }
          </ContractNavs>
        </Drawer>
      </div>
      <div className='gx-module-sidenav gx-d-none gx-d-lg-flex'>
        <ContractNavs rooms={rooms} {...props}>
          { children }
        </ContractNavs>
      </div>
    </>
  )
}

ContractSidebar.propTypes = {
  children: PropTypes.any,
  loading: PropTypes.func
}

ContractSidebar.defaultProps = {
  rooms: [],
  loading: () => {}
}
