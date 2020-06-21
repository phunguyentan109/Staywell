import React, { useState, useEffect, useCallback, Fragment } from 'react'
import { Card, Table, Divider, Button, Form, Input, Modal } from 'antd'
import PropTypes from 'prop-types'

import { apiPrice } from 'constants/api'
import PopConfirm from 'components/App/Pop/PopConfirm'
import { DEFAULT_PRICE, PRICE_COLS, PRICE_INPUTS } from '../modules/const'
import useList from 'hooks/useList'

const FormItem = Form.Item

export default function Price({ notify, setLoading }) {
  const [listPrice, setListPrice, updateListPrice] = useList([])
  const [price, setPrice] = useState(DEFAULT_PRICE)
  const [visible, setVisible] = useState(false)
  const [processing, setProcessing] = useState(false)

  const load = useCallback(async() => {
    try {
      let priceData = await apiPrice.get()
      setListPrice(priceData)
      setLoading(false)
    } catch (e) {
      return notify('error', 'Data is not loaded')
    }
  }, [setListPrice, notify, setLoading])

  useEffect(() => { load() }, [load])

  function hdChange(e) {
    let { value, name } = e.target
    setPrice(prev => ({ ...prev, [name]: value }))
  }

  function toggle() {
    setVisible(prev => !prev)
  }

  async function hdOk () {
    setProcessing(true)
    try {
      let data = price._id ? await apiPrice.update(price._id, price) : await apiPrice.create(price)
      updateListPrice(data)
      notify('success')
    } catch (error) {
      notify('error')
    }
    setProcessing(false)
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

  return (
    <Fragment>
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
                  <span className='gx-link' onClick={() => setPrice(record)}>Edit</span>
                </span>
              )
            }
          ]}
        />
      </Card>
      <Modal
        title={price._id ? 'Update Price Information' : 'Create New Price'}
        visible={visible}
        onOk={hdOk}
        confirmLoading={processing}
        onCancel={toggle}
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

Price.propTypes = {
  notify: PropTypes.func,
  setLoading: PropTypes.func
}
