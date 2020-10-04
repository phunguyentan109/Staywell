import React, { useRef, useEffect } from 'react'
import { Spin } from 'antd'

export default function CustomLoading(WrappedComponent) {
  function Loading(value) {
    const loadRef = useRef({})

    useEffect(() => {
      loadRef.current = value
    })
	
    return (
      <Spin spinning={loadRef} size='large'>
        <WrappedComponent ref={loadRef}/>
      </Spin>
    )
  }
	
  return Loading
}