import React from 'react'
import withToggleModal from 'hocs/withToggleModal'
import { Button } from 'antd'

const ContractAction = withToggleModal(({ disabled }) => (
  <div className='gx-module-add-task'>
    <Button
      variant='raised'
      type='primary'
      className='gx-btn-block'
      disabled={disabled}
    >
      <span className='icon icon-add-circle'/>NEW CONTRACT
    </Button>
  </div>
), { title: 'Open new contract' })

export default ContractAction
