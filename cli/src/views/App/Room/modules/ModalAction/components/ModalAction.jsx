import React from 'react'
import { Button } from 'antd'
import withToggleModal from 'hocs/withToggleModal'

export const ButtonCreate = withToggleModal(() => {
  return <Button type='primary'>Add new room</Button>
})

export const EditAction = withToggleModal(() => {
  return <span className='gx-link'>Edit</span>
})

export const AssignAction = withToggleModal(() => {
  return <span className='gx-link'>Assign</span>
})
