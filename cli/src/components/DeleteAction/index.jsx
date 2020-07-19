import React, { useState } from 'react'
import SweetAlert from 'react-bootstrap-sweetalert'
import PropTypes from 'prop-types'

export default function DeleteAction({ onConfirm, message, ...props }) {
  const [modal, toggleModal] = useState(false)
  const toggle = () => toggleModal(prev => !prev)

  function hdConfirm() {
    onConfirm()
    toggle()
  }

  return (
    <span className='delete-action'>
      <span className='gx-link' onClick={toggle}>Delete</span>
      {
        modal && <SweetAlert onConfirm={hdConfirm} onCancel={toggle} {...props}>
          <span>{message}</span>
        </SweetAlert>
      }
    </span>
  )
}

DeleteAction.propTypes = {
  onConfirm: PropTypes.func.isRequired,
  warning: PropTypes.bool,
  showCancel: PropTypes.bool,
  confirmBtnText: PropTypes.string,
  cancelBtnBsStyle: PropTypes.string,
  title: PropTypes.string,
  message: PropTypes.string
}

DeleteAction.defaultProps = {
  warning: true,
  showCancel: true,
  confirmBtnText: 'Yes, delete it!',
  cancelBtnBsStyle: 'default',
  title: 'Are you sure to delete ?',
  message: 'You will not be able to recover this data'
}
