import React, { useState } from 'react'

export default function withToggleModal(WrappedComponent) {
  function ToggleModal({ ...props }) {
    const [visible, setVisible] = useState(false)

    let toggle

    if (typeof(visible) === 'boolean') {
      toggle = () => setVisible((prev) => !prev)
    } else {
      toggle = modal => setVisible(prev => ({ ...prev, [modal]: !prev[modal] }))
    }

    return (
      <WrappedComponent
        toggle={toggle}
        visible={visible}
        setVisible={setVisible}
        {...props}
      />
    )   
  }

  return ToggleModal
}