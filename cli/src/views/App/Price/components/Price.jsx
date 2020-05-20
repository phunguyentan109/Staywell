import React, { useState, useEffect, useCallback, Fragment } from 'react'
import { Card, Table, Divider, Button } from 'antd'
import { cloneDeep } from 'lodash'
import PropTypes from 'prop-types'

import { apiPrice } from 'constants/api'
import PriceModal from '../modules/PriceModal'
import PopConfirm from 'components/App/Pop/PopConfirm'
import { DEFAULT_PRICE, PRICE_COLS } from '../modules/const'

export default function Price({ notify, setLoading }) {
  const [listPrice, setListPrice] = useState([])
  const [price, setPrice] = useState(DEFAULT_PRICE)
  const [visible, setVisible] = useState(false)

  const load = useCallback(async() => {
    try {
      let priceData = await apiPrice.get()
      setListPrice(priceData)
      setLoading(false)
    } catch (e) {
      return notify('error', 'Data is not loaded')
    }
  }, [notify, setLoading])

  useEffect(() => { load() }, [load])

  function toggle() {
    setVisible(prev => !prev)
  }

  function hdRefresh (newPrice) {
    let newListPrice = cloneDeep(listPrice)
    let foundIdx = newListPrice.findIndex(price => price._id === newPrice._id)
    if (foundIdx !== -1) {
      newListPrice[foundIdx] = cloneDeep(newPrice)
      return setListPrice(newListPrice)
    }
    return setListPrice(prev => [...prev, newPrice])
  }

  async function hdRemove(price_id) {
    setLoading(true)
    try {
      await apiPrice.remove(price_id)
      let updatePriceList = listPrice.filter(v => v._id !== price_id)
      setListPrice(updatePriceList)
      notify('success', 'Price data is removed successfully')
    } catch (err) {
      notify('error')
    }
    setLoading(false)
  }

  function hdEdit(price) {
    setPrice(price)
  }

  return (
    <Fragment>
      <PriceModal
        visible={visible}
        refresh={hdRefresh}
        price={price}
        toggle={toggle}
        notify={notify}
      />
      <Card title='List of available price'>
        <Button type='primary' onClick={toggle}>Add new price</Button>
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
                  <PopConfirm
                    title='Are you sure to delete this genre?'
                    task={hdRemove.bind(this, record._id)}
                    okText='Sure, remove it'
                    cancelText='Not now'
                  > 
                    <span className='gx-link'>Delete</span>
                  </PopConfirm>
                  <Divider type='vertical'/>
                  <span className='gx-link' onClick={hdEdit.bind(this, record)}>Edit</span>
                </span>
              )
            }
          ]}
        />
      </Card>
    </Fragment>
  )
}

Price.propsTypes = {
  notify: PropTypes.func,
  setLoading: PropTypes.func
}
