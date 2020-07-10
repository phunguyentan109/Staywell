import React, { useState, useEffect, useCallback } from 'react'
import { Card, Table, Divider, Form, Input, Button } from 'antd'
import PropTypes from 'prop-types'

import { apiPrice, notify } from 'constants/api'
import DeleteAction from 'components/DeleteAction'
import { DEFAULT_PRICE, PRICE_COLS, PRICE_INPUTS } from '../modules/const'
import useList from 'hooks/useList'
import { ButtonCreate, EditAction } from '../modules/ModalAction'

const FormItem = Form.Item

export default function Price({ loading, toggle, visible }) {
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

  function hdEdit(price) {
    toggle()
    setPrice(price)
  }

  return (
    <>
      <Card title='List of available price'>
        <ButtonCreate hdOK={hdOk} title='Add new price'>
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
                    className='gx-link' 
                    title='Update Price Information'
                    onClick={hdEdit.bind(this, record)}
                    hdOK={hdOk}
                  />
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
