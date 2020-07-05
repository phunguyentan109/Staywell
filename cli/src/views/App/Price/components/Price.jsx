import React, { useState, useEffect, useCallback } from 'react'
import { Card, Table, Divider, Form, Input } from 'antd'
import PropTypes from 'prop-types'

import { apiPrice, notify } from 'constants/api'
import DeleteAction from 'components/DeleteAction'
import { DEFAULT_PRICE, PRICE_COLS, PRICE_INPUTS } from '../modules/const'
import CustomModal from 'components/App/Modal/CustomModal'
import useList from 'hooks/useList'

const FormItem = Form.Item

export default function Price({ loading }) {
  const [listPrice, setListPrice, updateListPrice] = useList([])
  const [price, setPrice] = useState(DEFAULT_PRICE)

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

  async function hdOk () {
    setProcessing(true)
    const submit = price._id ? { price_id: price._id, data: price } : { data: price }
    let data = await apiPrice[price._id ? 'update' : 'create'](submit)
    updateListPrice(data)
    notify('success')
    return data
    // setProcessing(false)
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
        <CustomModal
          btnName='Add new price'
          title={price._id ? 'Update Price Information' : 'Create New Price'}
          hdOK={hdOk}
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
        </CustomModal>
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
                  <span className='gx-link' onClick={() => setPrice(record)}>Edit</span>
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
  loading: PropTypes.func
}
