import React, { useImperativeHandle, forwardRef } from 'react'
import { Spin } from 'antd'
import { useToggle } from 'hooks'
import PropTypes from 'prop-types'

function Loading(props, ref) {
  const [state, toggleState] = useToggle({ loading: false })
  useImperativeHandle(ref, () => ({ toggle: toggleState }))

  return <Spin spinning={state.loading} size='large'>{props.children}</Spin>
}

Loading.propTypes = {
  children: PropTypes.any,
}

export default forwardRef(Loading)