import React from 'react'
import Sweetalert from 'react-bootstrap-sweetalert'

export default function SweetAlert({ hdConfirm, hdCancel, ...props }) {
  // console.log(hdConfirm())
  return (
    <Sweetalert
      warning
      showCancel
      confirmBtnText='Yes, delete it !'
      cancelBtnBsStyle='default'
      title='Are you sure to delete ?'
      onConfirm={hdConfirm.bind(this)}
      onCancel={hdCancel.bind(this)}
      {...props}
    >
      {props.children}
    </Sweetalert>
  )
}