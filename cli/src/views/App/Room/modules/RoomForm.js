import React, { useEffect, useState } from 'react'
import { priceApi } from 'constants/api'
import { Form, Input, Modal, Select, Spin } from 'antd'
import { useFetch, useToggle } from 'hooks'
import PropTypes from 'prop-types'

const FormItem = Form.Item
const Option = Select.Option

function RoomForm(props) {
  const [pair, toggle] = useToggle({ modal: false })
  const { isFetching, data: price = [] } = useFetch(pair.modal ? priceApi.get() : null)
  const [form, setForm] = useState({ name: '' })

  useEffect(() => {
    if (props.value) {
      setForm({
        name: props.value.name,
        price_id: props.value?.price_id?._id
      })
    }
  }, [props.value])


  const hdOk = async() => {
    await props.mutateRoom(form)
    toggle(['modal'])
  }

  const hdChange = (name, value) => setForm(prev => ({ ...prev, [name]: value }))

  return (
    <>
      <span onClick={() => toggle(['modal'])}>{props.children}</span>
      <Modal
        title={props.title}
        visible={pair.modal}
        onCancel={() => toggle(['modal'])}
        onOk={hdOk}
        confirmLoading={props.isProcessing}
      >
        <Spin spinning={isFetching}>
          <Form layout='horizontal'>
            <FormItem
              label='Type'
              labelCol={{ xs: 24, sm: 6 }}
              wrapperCol={{ xs: 24, sm: 16 }}
            >
              <Input
                placeholder='Give a name'
                name='name'
                value={form.name}
                onChange={e => hdChange(e.target.name, e.target.value)}
              />
            </FormItem>
            <FormItem
              label='Price'
              labelCol={{ xs: 24, sm: 6 }}
              wrapperCol={{ xs: 24, sm: 16 }}
            >
              <Select
                mode='single'
                style={{ width: '100%' }}
                placeholder='Pick a price'
                onChange={price_id => hdChange('price_id', price_id)}
                value={form.price_id}
              >
                {
                  price.map(v => (
                    <Option value={v._id} key={v._id}>{v.type}</Option>
                  ))
                }
              </Select>
            </FormItem>
          </Form>
        </Spin>
      </Modal>
    </>
  )
}

RoomForm.propTypes = {
  show: PropTypes.bool,
  children: PropTypes.any,
  getPrice: PropTypes.func,
  title: PropTypes.string,
  mutateRoom: PropTypes.func,
  isProcessing: PropTypes.bool,
  price: PropTypes.array,
  value: PropTypes.object
}

export default RoomForm
