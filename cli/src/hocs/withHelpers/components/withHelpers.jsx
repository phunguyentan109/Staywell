import React, { useState } from 'react'
import { Spin } from 'antd'

export default function withHelpers(WrappedComponent) {
  function Helpers({ ...props }) {
    const [loading, setLoading] = useState(true)

    return (
      <Spin spinning={loading} size='large'>
        <WrappedComponent setLoading={setLoading} {...props}/>
      </Spin>
    )
  }

  return Helpers
}
