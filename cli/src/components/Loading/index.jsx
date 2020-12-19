import React from 'react'
import { Spin } from 'antd'
import PropTypes from 'prop-types'

function Loading(props) {
  return <Spin spinning size='large'>{props.children}</Spin>
}

Loading.propTypes = {
  children: PropTypes.any,
}

export default Loading
