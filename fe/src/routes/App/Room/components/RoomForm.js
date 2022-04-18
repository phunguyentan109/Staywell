import React, { useEffect, useState } from 'react'
import { Form, Input, Modal, Select, Spin } from 'antd'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import { fetchPriceAction } from '../redux/action'

const FormItem = Form.Item
const Option = Select.Option

function RoomForm(props) {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [price, setPrice] = useState([])
  const dp = useDispatch()

  const [form] = Form.useForm()

  useEffect(() => {
    if (props.value) {
      form.setFieldsValue({
        name: props.value.name,
        price_id: props.value?.price_id?._id
      })
    }
  }, [form, props.value])

  const hdOpen = () => {
    if (!open) {
      setLoading(true)
      setOpen(true)

      dp(fetchPriceAction(data => {
        if (data) {
          setLoading(false)
          setPrice(data)
        }
      }))
    }
  }

  const hdOk = (values) => {
    setLoading(true)

    if (props.value)
      values = { ...values, _id: props.value._id }

    dp(props.onSubmitAction(values, rs => {
      if (rs) {
        setOpen(false)
        props.getRooms()
      }
      setLoading(false)
    }))
  }

  const hdCancel = () => {
    if (!loading) setOpen(false)
  }

  return (
    <>
      <span onClick={hdOpen}>{props.children}</span>
      <Modal
        title={props.title}
        visible={open}
        onCancel={hdCancel}
        onOk={() => form.submit()}
        okButtonProps={{
          disabled: loading
        }}
        cancelButtonProps={{
          disabled: loading
        }}
      >
        <Spin spinning={loading}>
          <Form layout='horizontal' form={form} onFinish={hdOk}>
            <FormItem
              label='Name'
              name='name'
              labelCol={{ xs: 24, sm: 6 }}
              wrapperCol={{ xs: 24, sm: 16 }}
              rules={[
                {
                  required: true,
                  message: 'This field is required!'
                }
              ]}
            >
              <Input placeholder='Give a name' />
            </FormItem>

            <FormItem
              label='Price'
              name='price_id'
              labelCol={{ xs: 24, sm: 6 }}
              wrapperCol={{ xs: 24, sm: 16 }}
            >
              <Select style={{ width: '100%' }} placeholder='Pick a price'>
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
  children: PropTypes.any,
  onSubmitAction: PropTypes.func,
  getRooms: PropTypes.func,
  title: PropTypes.string,
  value: PropTypes.object,
  onFetchPrice: PropTypes.func,
}

export default RoomForm
