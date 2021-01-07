import React, { useCallback } from 'react'
import PropTypes from 'prop-types'
import { Modal } from 'antd'

export default function DeleteAction({ onConfirm, message, onCancel, children, title }) {
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

  return <span className='gx-link' onClick={hdConfirm}>{children}</span>
}

DeleteAction.propTypes = {
  onConfirm: PropTypes.func.isRequired,
  onCancel: PropTypes.func,
  warning: PropTypes.bool,
  showCancel: PropTypes.bool,
  confirmBtnText: PropTypes.string,
  cancelBtnBsStyle: PropTypes.string,
  title: PropTypes.string,
  children: PropTypes.any,
  message: PropTypes.string
}

DeleteAction.defaultProps = {
  warning: true,
  onCancel: () => {},
  children: 'Delete',
  showCancel: true,
  confirmBtnText: 'Yes, delete it!',
  cancelBtnBsStyle: 'default',
  title: 'Are you sure to delete ?',
  message: 'You will not be able to recover this data'
}
