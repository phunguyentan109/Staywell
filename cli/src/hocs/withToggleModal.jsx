import React, { useState } from 'react'
import { Modal } from 'antd'
import PropTypes from 'prop-types'

export default function withToggleModal(WrappedComponent) {
  function ToggleModal({ children, title, onSubmit, onClick }) {
    const [state, setState] = useState({
      modal: false,
      process: false
    })

    const toggle = type => setState(prev => ({ ...prev, [type]: !prev[type] }))

    async function hdProcess() {
      toggle('process')
      onSubmit()
      setState({ process: false, modal: false })
    }

    function hdClick() {
      onClick && onClick()
      toggle('modal')
    }

    return (
      <>
        <span onClick={hdClick}>
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
    onSubmit: PropTypes.func,
    onClick: PropTypes.func,
    children: PropTypes.element
  }

  ToggleModal.defaultProps = {
    title: ''
  }

  return ToggleModal
}
