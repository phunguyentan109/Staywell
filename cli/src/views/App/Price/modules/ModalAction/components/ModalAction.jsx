import React from 'react'
import { Button } from 'antd'
import withToggleModal from 'hocs/withToggleModal'

const ButtonCreate = withToggleModal(() => {
  return <Button type='primary'>Add new price</Button>
})

const EditAction = withToggleModal(() => {
  return <span className='gx-link'>Edit</span>
})

export { ButtonCreate, EditAction }
