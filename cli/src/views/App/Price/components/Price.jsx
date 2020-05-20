import React, { useState, useEffect, useCallback, Fragment } from 'react'
import { Card, Table, Divider, Form, Input, Button, Modal } from 'antd'
import PropTypes from 'prop-types'

import { apiPrice } from 'constants/api'
import PopConfirm from 'components/App/Pop/PopConfirm'
import { DEFAULT_PRICE, PRICE_COLS, PRICE_INPUTS } from '../modules/const'

const FormItem = Form.Item

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

  async function hdSubmit() {
    setLoading(true)
    try {
      if(!price._id) {
        let createdPrice = await apiPrice.create(price)
        setListPrice(prev => [...prev, createdPrice])
      } else {
        let updatePrice = await apiPrice.update(price._id, price)
        let updatePriceList = listPrice.map(v => v._id === updatePrice._id ? updatePrice : v)
        setListPrice(updatePriceList)
      }
      notify('success')
    } catch (e) {
      notify('error')
    }
    setLoading(false)
  }

  function hdOk() {}

  function hdChange(e) {
    let { value, name } = e.target
    setPrice(prev => ({ ...prev, [name]: value }))  
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

  function hdEdit(price) {
    setPrice(price)
    // toggleForm(true)
  }

  function toggleModal() {
    setVisible(prev => !prev)
  }

  return (
    <Fragment>
      <Card title='List of available price'>
        <Button type='primary' onClick={toggleModal}>Add new price</Button>
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
      <Modal
        title='Create New Price'
        visible={visible}
        onOk={hdOk}
        onCancel={toggleModal}
      >
        <Form layout='horizontal'>
          {
            PRICE_INPUTS.map((input, i) => (
              <FormItem
                key={i}
                label={input.label}
                labelCol={{ xs: 24, sm: 6 }}
                wrapperCol={{ xs: 24, sm: 16 }}
              >
                <Input
                  type={input.type || 'number'}
                  placeholder={`Please enter the ${input.name}`}
                  name={input.name}
                  value={price[input.name]}
                  onChange={hdChange}
                />
              </FormItem>
            ))
          }
        </Form>
      </Modal>
    </Fragment>
  )
}

Price.propsTypes = {
  notify: PropTypes.func,
  setLoading: PropTypes.func
}
