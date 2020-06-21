import React, { useState } from 'react'
import SweetAlert from 'react-bootstrap-sweetalert'

export default function DeleteAlert({ onRemove, row_id, ...props }) {
  const [modal, setToggleModal] = useState(false)

  function onShowModal() {
    setToggleModal(!modal)
  }

  function hdConfirm() {
    onRemove(row_id)
    setToggleModal(false)
  }

  return (
    <>
      <span className='gx-link' onClick={onShowModal}>Delete</span>
      {
        modal && <SweetAlert
          warning
          showCancel
          confirmBtnText='Yes, delete it !'
          cancelBtnBsStyle='default'
          title='Are you sure to delete ?'
          onConfirm={hdConfirm}
          onCancel={onShowModal}
          {...props}
        >
          {props.children}
        </SweetAlert>
      }
    </>
  )
}