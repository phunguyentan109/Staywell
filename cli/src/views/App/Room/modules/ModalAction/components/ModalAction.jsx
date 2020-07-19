import React from 'react'
import withToggleModal from 'hocs/withToggleModal'

export const AssignModal = withToggleModal(() => {
  return <span className='gx-link'>Assign</span>
}, { title: 'Room\'s people assignment' })
