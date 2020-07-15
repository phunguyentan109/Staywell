import React, { useState, useEffect, useCallback } from 'react'
import { Card, Table, Divider, Form, Input, Button } from 'antd'
import PropTypes from 'prop-types'

import { apiPrice, notify } from 'constants/api'
import DeleteAction from 'components/DeleteAction'
import { DEFAULT_PRICE, PRICE_COLS, PRICE_INPUTS } from '../modules/const'
import useList from 'hooks/useList'
import { ButtonCreate, EditAction, FormModal } from '../modules/ModalAction'

export default function Price({ loading, visible }) {
  const [listPrice, setListPrice, updateListPrice] = useList([])
  const [price, setPrice] = useState(DEFAULT_PRICE)

  const load = useCallback(async() => {
    let priceData = await apiPrice.get()
    setListPrice(priceData)
    loading(false)

    if (visible === false) {
      setPrice(DEFAULT_PRICE)
    }
  }, [setListPrice, loading, visible])

  useEffect(() => { load() }, [load])

  function hdChange(e) {
    let { value, name } = e.target
    setPrice(prev => ({ ...prev, [name]: value }))
  }

  async function hdOk () {
    // spread price but remove extra option
    let petPrice = { ...price }
    delete petPrice.extra
    delete petPrice.__v

    let objIsEmpty = Object.values(petPrice).some(val => !val)

    if (objIsEmpty === false) {
      const submit = price._id ? { price_id: price._id, data: price } : { data: price }
      let data = await apiPrice[price._id ? 'update' : 'create'](submit)
      updateListPrice(data)
      notify('success')
    } else {
      notify('error', 'Please full field Price before submit!')
    }
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
    <>
      <Card title='List of available price'>
        <ButtonCreate hdOK={hdOk} title='Add new price'>
          <FormModal hdChange={hdChange} price={price}/>
        </ButtonCreate>
        <Table
          className='gx-table-responsive'
          dataSource={listPrice}
          rowKey='_id'
          columns={[
            ...PRICE_COLS,
            {
              title: 'Action',
              key: 'action',
              render: (text, record) => (
                <span>
                  <DeleteAction onConfirm={hdRemove.bind(this, record._id)}/>
                  <Divider type='vertical'/>
                  <EditAction
                    onClick={() => setPrice(record)}
                    title='Update Price Information'
                    hdOK={hdOk}
                  >
                    <FormModal hdChange={hdChange} price={price}/>
                  </EditAction>
                </span>
              )
            }
          ]}
        />
      </Card>
    </>
  )
}

Price.propTypes = {
  notify: PropTypes.func,
  loading: PropTypes.func,
  visible: PropTypes.bool,
  toggle: PropTypes.func,
}

Price.defaultProps = {
  visible: false,
}
