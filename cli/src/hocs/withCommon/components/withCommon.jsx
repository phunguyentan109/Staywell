import React, { useState } from 'react'
import { Spin } from 'antd'

export default function withCommon(WrappedComponent) {
  function Common({ ...props }) {
    const [loading, setLoading] = useState(true)

    return (
      <Spin spinning={loading} size='large'>
        <WrappedComponent loading={setLoading} {...props}/>
      </Spin>
    )
  }

  return Common
}
