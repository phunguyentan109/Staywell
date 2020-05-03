import React, { useState, useEffect, useCallback, Fragment } from 'react'
import { Card, Table, Divider, Form, Input, Button } from 'antd'
import PropTypes from 'prop-types'

import { apiPrice } from 'constants/api'
import PopConfirm from 'components/App/Pop/PopConfirm'
import { DEFAULT_PRICE } from '../modules/const'
import PriceForm from '../modules/PriceForm'

export default function Price({ notify, setLoading }) {
  const [listPrice, setListPrice] = useState([])
  const [price, setPrice] = useState(DEFAULT_PRICE)
  const form = useRef()
  // const [form, toggleForm] = useState(false)

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

  // function hdChange(e) {
  //   const { name, value } = e.target
  //   setPrice(prev => ({ ...prev, [name]: value }))
  // }

  async function hdSubmit() {
    setLoading(true)
    try {
      if(!price._id) {
        let createdPrice = await apiPrice.create(price)
        setListPrice(prev => [...prev, createdPrice])
        notify('success')
      } else {
        let updatePrice = await apiPrice.update(price._id, price)
        let updatePriceList = listPrice.map(v => {
          if(v._id === updatePrice._id) {
            return updatePrice
          }
          return v
        })
        setListPrice(updatePriceList)
        notify('success')
      }
      hdCancel()
    } catch (e) {
      notify('error')
    }
    setLoading(false)
  }

  async function hdRemove(price_id) {
    setLoading(true)
    try {
      await apiPrice.remove(price_id)
      let updatePriceList = listPrice.filter(v => v._id !== price_id)
      setListPrice(updatePriceList)
      notify('success', 'Price data is removed successfully')
    } catch (err){
      notify('error', 'Price data is not remove')
    }
    setLoading(false)
  }

  function hdCancel() {
    setPrice(DEFAULT_PRICE)
    // toggleForm(false)
  }

  function hdEdit(price) {
    setPrice(price)
    // toggleForm(true)
  }

  return (
    <Fragment>
      {/*{*/}
      {/*  form && <Card className='gx-card' title={!price._id ? 'Add New Price' : 'Edit Price Information'}>*/}
      {/*    <Spin spinning={loading}>*/}

      {/*    </Spin>*/}
      {/*  </Card>*/}
      {/*}*/}
      <PriceForm ref={form} />
      <Card title='List of available price'>
        <Spin spinning={loading}>
          <Button type='primary' onClick={() => form.current.toggleVisible()}>Add new price</Button>
          <Table
            className='gx-table-responsive'
            dataSource={listPrice}
            rowKey='_id'
            columns={[
              {
                title: 'Price type',
                dataIndex: 'type',
              },
              {
                title: 'Electric',
                dataIndex: 'electric'
              },
              {
                title: 'Wifi',
                dataIndex: 'wifi',
              },
              {
                title: 'Water',
                dataIndex: 'water'
              },
              {
                title: 'House',
                dataIndex: 'house'
              },
              {
                title: 'Extra',
                dataIndex: 'extra'
              },
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
        </Spin>
      </Card>
    </Fragment>
  )
}

Price.propsTypes = {
  notify: PropTypes.func,
  setLoading: PropTypes.func
}
