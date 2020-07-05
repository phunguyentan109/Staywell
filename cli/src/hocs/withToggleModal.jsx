import React, { useState } from 'react'

export default function withToggleModal(WrappedComponent) {
  function ToggleModal({ ...props }) {
    const [visible, setVisible] = useState(false)

    const toggle = () => setVisible((prev) => !prev)

    return (
      <WrappedComponent
        toggle={toggle}
        visible={visible}
        {...props}
      />
    )   
  }

  return ToggleModal
}