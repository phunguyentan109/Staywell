import React, { useCallback } from 'react'
import PropTypes from 'prop-types'
import { Modal, Button, Row, Col } from 'antd'

export default function UpdateAction({ onConfirm, message, onCancel, children, title, buttonType }) {
  const hdConfirm = useCallback(() => {
    Modal.confirm({
      title,
      content: message,
      onOk() {
        onConfirm()
      },
      onCancel() {
        onCancel()
      },
    })
  }, [message, onCancel, onConfirm, title])

  return <Row>
    <Col span={24} className='gx-text-right'>
      <Button type={ buttonType } onClick={hdConfirm}>{children}</Button>
    </Col>
  </Row>
}

UpdateAction.propTypes = {
  onConfirm: PropTypes.func.isRequired,
  onCancel: PropTypes.func,
  warning: PropTypes.bool,
  showCancel: PropTypes.bool,
  confirmBtnText: PropTypes.string,
  cancelBtnBsStyle: PropTypes.string,
  title: PropTypes.string,
  children: PropTypes.any,
  message: PropTypes.string,
  buttonType: PropTypes.string
}

UpdateAction.defaultProps = {
  warning: true,
  onCancel: () => {},
  children: 'Update',
  showCancel: true,
  confirmBtnText: 'Yes, update it!',
  cancelBtnBsStyle: 'default',
  title: 'Are you sure to update ?',
  message: 'You will not be able to recover this data'
}
