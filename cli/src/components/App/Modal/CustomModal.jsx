import React, { useState } from 'react'
import { Modal } from 'antd'
import PropTypes from 'prop-types'

export default function CustomModal({ title, hdOK, toggle, visible, ...props }) {
  const [processing, setProcessing] = useState(false)

  
  async function hdProcess() {
    setProcessing(true)
    hdOK() && setProcessing(false)
    toggle()
  }

  return (
    <>
      <Modal
        title={title}
        visible={visible}
        onCancel={toggle}
        onOk={hdProcess}
        confirmLoading={processing}
      >
        {props.children}
      </Modal>
    </>
  )
}

CustomModal.propTypes = {
  title: PropTypes.string,
  hdOK: PropTypes.func,
  children: PropTypes.element.isRequired,
  visible: PropTypes.bool,
  toggle: PropTypes.func,
}

CustomModal.defaultProps = {
  title: '',
  visible: false,
}