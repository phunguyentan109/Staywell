import React, { useEffect, useCallback } from 'react'
import { Card, Table, Divider } from 'antd'
import PropTypes from 'prop-types'

import { apiPrice, notify } from 'constants/api'
import DeleteAction from 'components/DeleteAction'
import { DEFAULT_PRICE, PRICE_COLS } from '../modules/const'
import useList from 'hooks/useList'
import { FormModal } from '../modules/ModalAction'
import useInitState from 'hooks/useInitState'
import { createCreateModal, createEditModal } from 'components/Modal'

const CreateModal = createCreateModal('Add new price', 'Enter price\'s information')
const EditModal = createEditModal('Edit', 'Edit price\'s information')

export default function Price({ loading }) {
  const [listPrice, setListPrice, updateListPrice] = useList([])
  const [price, setPrice, clearPrice] = useInitState(DEFAULT_PRICE)

  const load = useCallback(async() => {
    let priceData = await apiPrice.get()
    setListPrice(priceData)
    loading(false)
  }, [setListPrice, loading])

  useEffect(() => { load() }, [load])

  function hdChange(e) {
    let { value, name } = e.target
    setPrice(prev => ({ ...prev, [name]: value }))
  }

  async function hdEdit() {
    let data = await apiPrice.update({ price_id: price._id, data: price })
    updateListPrice(data)
    notify('success')
  }

  async function hdCreate() {
    let data = await apiPrice.create({ data: price })
    updateListPrice(data)
  }

  async function hdRemove(price_id) {
    loading(true)
    await apiPrice.remove({ price_id })
    let updatePriceList = listPrice.filter(v => v._id !== price_id)
    setListPrice(updatePriceList)
    notify('success', 'Price data is removed successfully')
    loading(false)
  }

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

Price.propTypes = {
  notify: PropTypes.func,
  loading: PropTypes.func,
  visible: PropTypes.bool,
  toggle: PropTypes.func
}

Price.defaultProps = {
  visible: false
}
