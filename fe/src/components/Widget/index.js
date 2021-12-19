import React from 'react'
import { Card } from 'antd'
import PropTypes from 'prop-types'

const Widget = ({ title, children, styleName, cover, extra, actions }) => {

  return (
    <Card title={title} actions={actions} cover={cover} className={`gx-card-widget ${styleName}`} extra={extra}>
      {children}
    </Card>
  )
}

Widget.defaultProps = {
  styleName: '',
}

Widget.propTypes = {
  title: PropTypes.node,
  extra: PropTypes.node,
  cover: PropTypes.node,
  styleName: PropTypes.string,
  actions: PropTypes.node,
  children: PropTypes.node.isRequired
}

export default Widget
