import React from 'react'
import { Card } from 'antd'
import PropTypes from 'prop-types'

export default function Widget ({ title, children, styleName, cover, extra, actions }) {
  return (
    <Card
      title={title}
      actions={actions}
      cover={cover}
      className={`gx-card-widget ${styleName}`}
      extra={extra}
    >
      {children}
    </Card>
  )
}

Widget.defaultProps = {
  styleName: '',
}

Widget.propTypes = {
  styleName: PropTypes.string,
  title: PropTypes.node,
  extra: PropTypes.node,
  cover: PropTypes.node,
  actions: PropTypes.node,
  children: PropTypes.node.isRequired
}
