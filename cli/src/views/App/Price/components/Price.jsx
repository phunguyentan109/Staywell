import React, { memo } from 'react'
import { Card, Table, Divider } from 'antd'
import PropTypes from 'prop-types'

import DeleteAction from 'components/DeleteAction'
import { PRICE_COLS } from '../modules/const'
import { FormModal } from '../modules/ModalAction'
import { createCreateModal, createEditModal } from 'components/Modal'

const CreateModal = createCreateModal('Add new price', 'Enter price\'s information')
const EditModal = createEditModal('Edit', 'Edit price\'s information')

function Price({ hdCreate, clearPrice, hdChange, price, setPrice, listPrice, hdRemove, hdEdit }) {
  return (
    <Card className='gx-card' title='List of available price'>
      <CreateModal onSubmit={hdCreate} onClick={clearPrice}>
        <FormModal onChange={hdChange} price={price}/>
      </CreateModal>
      <Table
        className='gx-table-responsive'
        dataSource={listPrice}
        rowKey='_id'
        columns={[
          ...PRICE_COLS,
          {
            title: 'Action',
            key: 'action',
            render: (text, record) => <>
              <DeleteAction onConfirm={hdRemove.bind(this, record._id)}/>
              <Divider type='vertical'/>
              <EditModal onClick={() => setPrice(record)} onSubmit={hdEdit}>
                <FormModal onChange={hdChange} price={price}/>
              </EditModal>
            </>
          }
        ]}
      />
    </Card>
  )
}

export default memo(Price)

Price.propTypes = {
  hdCreate: PropTypes.func, 
  clearPrice: PropTypes.func, 
  hdChange: PropTypes.func, 
  price: PropTypes.object, 
  setPrice: PropTypes.func, 
  listPrice: PropTypes.array, 
  hdRemove: PropTypes.func, 
  hdEdit: PropTypes.func,
}