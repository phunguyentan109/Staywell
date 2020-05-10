import React, { useState, useEffect } from 'react'
import { notification, Spin } from 'antd'

import { MOBILE_SIZE, DESKTOP_SIZE } from 'constants/variables'
import { CASES } from '../modules/const'

export default function withHelpers(WrappedComponent) {
  function Helpers({ ...props }) {
    const [device, setDevice] = useState({
      isMobile: false,
      isTablet: false,
      isDesktop: true
    })
    const [loading, setLoading] = useState(true)

    useEffect(() => {
      hdResize()
      window.addEventListener('resize', hdResize)
      return () => window.removeEventListener('resize', hdResize)
    }, [])

    function hdResize() {
      let isMobile = window.innerWidth < MOBILE_SIZE
      let isTablet = window.innerWidth >= MOBILE_SIZE && window.innerWidth < DESKTOP_SIZE
      let isDesktop = window.innerWidth >= DESKTOP_SIZE
      setDevice({ isMobile, isTablet, isDesktop })
    }

    const openNotificationWithIcon = (type, description) => {
      notification[type]({ message: CASES[type].msg, description })
    }

    return (
      <Spin spinning={loading} size='large'>
        <WrappedComponent
          device={{ ...device }}
          notify={openNotificationWithIcon}
          setLoading={setLoading}
          {...props}
        />
      </Spin>
    )
  }

  return Helpers
}
