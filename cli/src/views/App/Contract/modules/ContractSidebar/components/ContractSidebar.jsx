import React, { useEffect, useCallback } from 'react'
import PropTypes from 'prop-types'
import { Drawer } from 'antd'
import ContractNavs from '../modules/ContractNavs'

export default function ContractSidebar({ children }) {
  const load = useCallback(() => {
    console.log('load sidebar')
  }, [])

  useEffect(() => { load() }, [load])

  return (
    <>
      <div className='gx-d-block gx-d-lg-none'>
        <Drawer
          placement='left'
          closable={false}
          visible={false}
          onClose={() => {}}
        >
          <ContractNavs>
            { children }
          </ContractNavs>
        </Drawer>
      </div>
      <div className='gx-module-sidenav gx-d-none gx-d-lg-flex'>
        <ContractNavs>
          { children }
        </ContractNavs>
      </div>
    </>
  )
}

ContractSidebar.propTypes = {
  children: PropTypes.any
}
