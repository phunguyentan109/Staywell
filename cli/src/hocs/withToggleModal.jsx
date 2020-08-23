import React, { useState } from 'react'
import { Modal } from 'antd'
import PropTypes from 'prop-types'

export default function withToggleModal(WrappedComponent, bindProps = {}) {
  function ToggleModal({ children, title, onSubmit, onClick, tgProps, ...props }) {
    const [state, setState] = useState({ modal: false, process: false })

    const toggle = type => setState(prev => ({ ...prev, [type]: !prev[type] }))

    async function hdProcess() {
      toggle('process')
      let success = onSubmit()
      // return false in case of handling wrong case
      success === false || setState({ process: false, modal: false })
    }

    function hdClick() {
      onClick && onClick()
      toggle('modal')
    }

    return (
      <>
        <span onClick={hdClick}>
          <WrappedComponent {...tgProps} />
        </span>
        <Modal
          title={bindProps.title || title}
          visible={state.modal}
          onCancel={() => toggle('modal')}
          onOk={hdProcess}
          confirmLoading={state.process}
          { ...props }
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
    tgProps: PropTypes.object,
    children: PropTypes.element
  }

  ToggleModal.defaultProps = {
    tgProps: {},
    title: ''
  }

  return ToggleModal
}
