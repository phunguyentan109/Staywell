import React from 'react'
import { Button } from 'antd'
import withToggleModal from 'hocs/withToggleModal'

export const createCreateModal = (editLabel, mdTitle) => {
  return withToggleModal(
    () => <Button type='primary'>{editLabel}</Button>,
    { title: mdTitle }
  )
}

export const createEditModal = (editLabel, mdTitle) => {
  return withToggleModal(
    () => <span className='gx-link'>{editLabel}</span>,
    { title: mdTitle }
  )
}
