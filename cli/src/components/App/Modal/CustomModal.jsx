import React, { useState } from 'react'
import { Button, Modal } from 'antd'
import PropTypes from 'prop-types'

export default function CustomModal({ btnName, title, hdOK, ...props }) {
  const [visible, setVisible] = useState(false)
  const [processing, setProcessing] = useState(false)

  const toggle = () => setVisible((prev) => !prev)

  function hdProcessing() {
    setProcessing(true)
    console.log("hdOK")
    // let okData = () => hdOK
    // console.log(okData)
    // okData && setProcessing(false)
    // toggle()
  }

  return (
    <>
      <Button type='primary' onClick={toggle}>{btnName}</Button>
      <Modal
        title={title}
        visible={visible}
        onOK={hdProcessing}
        confirmLoading={processing}
        onCancel={toggle}
      >
        {props.children}
      </Modal>
    </>
  )
}

CustomModal.propTypes = {
  btnName: PropTypes.string,
  title: PropTypes.string,
  hdOK: PropTypes.func,
  children: PropTypes.element.isRequired
}