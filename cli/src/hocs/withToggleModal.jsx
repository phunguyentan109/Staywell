import React, { useState } from 'react'
import { Modal } from 'antd'
import PropTypes from 'prop-types'

export default function withToggleModal(WrappedComponent) {
  function ToggleModal({ children, title, hdOK }) {
    const [state, setState] = useState({
      modal: false,
      process: false
    })

    const toggle = type => {
      setState(prev => ({ ...prev, [type]: !prev[type] }))
    }

    async function hdProcess() {
      toggle('process')
      hdOK()
      setState({ process: false, modal: false })
    }

    return (
      <>
        <span onClick={() => toggle('modal')}>
          <WrappedComponent/>
        </span>
        <Modal
          title={title}
          visible={state.modal}
          onCancel={() => toggle('modal')}
          onOk={hdProcess}
          confirmLoading={state.process}
        >
          {children}
        </Modal>
      </>
    )
  }

  ToggleModal.propTypes = {
    title: PropTypes.string,
    hdOK: PropTypes.func,
    children: PropTypes.element
  }

  ToggleModal.defaultProps = {
    title: ''
  }

  return ToggleModal
}
