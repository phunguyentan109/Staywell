import React, { useState } from 'react'
import { Button, Modal } from 'antd'
import PropTypes from 'prop-types'

export default function CustomModal({ btnName, title, hdOK, ...props }) {
  const [visible, setVisible] = useState(false)
  const [processing, setProcessing] = useState(false)

  const toggle = () => setVisible((prev) => !prev)
  
  async function hdCreate() {
    setProcessing(true)
    let okData = hdOK()
    okData && setProcessing(false)
    toggle()
  }

  return (
    <>
      <Button type='primary' onClick={toggle}>{btnName}</Button>
      <Modal
        title={title}
        visible={visible}
        onCancel={toggle}
        onOk={hdCreate}
        confirmLoading={processing}
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

CustomModal.defaultProps = {
  btnName: '',
  title: '',
}