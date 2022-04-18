import React, { useEffect, useState } from 'react'
import { Form, Input, InputNumber, Modal, Spin } from 'antd'
import PropTypes from 'prop-types'
import _ from 'lodash'
import { useDispatch } from 'react-redux'

const FormItem = Form.Item

export default function PriceForm(props) {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const dp = useDispatch()
  const [form] = Form.useForm()

  useEffect(() => {
    if (!_.isEmpty(props.value)) {
      const { type, electric, wifi, water, living, extra } = props.value
      form.setFieldsValue({ type, electric, wifi, water, living, extra })
    }
  }, [form, props.value])

  const hdOk = (values) => {
    setLoading(true)

    if (props.value) values = { ...values, _id: props.value._id }

    dp(props.onSubmitAction(values, rs => {
      if (rs) {
        setOpen(false)
        props.getPrice()
      }
      setLoading(false)
    }))
  }

  return (
    <>
      <span onClick={() => setOpen(true)}>{props.children}</span>

      <Modal
        title={props.title}
        visible={open}
        onCancel={() => setOpen(false)}
        onOk={() => form.submit()}
        okButtonProps={{
          disabled: loading
        }}
        cancelButtonProps={{
          disabled: loading
        }}
      >
        <Spin spinning={loading}>
          <Form
            layout='horizontal'
            form={form}
            onFinish={hdOk}
          >
            <FormItem
              name='type'
              label='Price Tags'
              labelCol={{ xs: 24, sm: 6 }}
              wrapperCol={{ xs: 24, sm: 16 }}
              rules={[
                {
                  required: true,
                  message: 'This field is required!'
                }
              ]}
            >
              <Input placeholder='Name a tag' />
            </FormItem>

            <FormItem
              name='electric'
              label='Electric'
              labelCol={{ xs: 24, sm: 6 }}
              wrapperCol={{ xs: 24, sm: 16 }}
              rules={[
                {
                  required: true,
                  message: 'This field is required!'
                }
              ]}
            >
              <InputNumber
                style={{ width: '100%' }}
                placeholder='Enter number'
                min={0}
              />
            </FormItem>

            <FormItem
              name='wifi'
              label='Wifi'
              labelCol={{ xs: 24, sm: 6 }}
              wrapperCol={{ xs: 24, sm: 16 }}
              rules={[
                {
                  required: true,
                  message: 'This field is required!'
                }
              ]}
            >
              <InputNumber
                style={{ width: '100%' }}
                placeholder='Enter number'
                min={0}
              />
            </FormItem>

            <FormItem
              name='water'
              label='Water'
              labelCol={{ xs: 24, sm: 6 }}
              wrapperCol={{ xs: 24, sm: 16 }}
              rules={[
                {
                  required: true,
                  message: 'This field is required!'
                }
              ]}
            >
              <InputNumber
                style={{ width: '100%' }}
                placeholder='Enter number'
                min={0}
              />
            </FormItem>

            <FormItem
              name='living'
              label='Living'
              labelCol={{ xs: 24, sm: 6 }}
              wrapperCol={{ xs: 24, sm: 16 }}
              rules={[
                {
                  required: true,
                  message: 'This field is required!'
                }
              ]}
            >
              <InputNumber
                style={{ width: '100%' }}
                placeholder='Enter number'
                min={0}
              />
            </FormItem>

            <FormItem
              name='extra'
              label='Extra'
              labelCol={{ xs: 24, sm: 6 }}
              wrapperCol={{ xs: 24, sm: 16 }}
            >
              <InputNumber
                style={{ width: '100%' }}
                placeholder='Enter number'
                min={0}
              />
            </FormItem>
          </Form>
        </Spin>
      </Modal>
    </>
  )
}

PriceForm.propTypes = {
  onSubmitAction: PropTypes.func,
  getPrice: PropTypes.func,
  children: PropTypes.element,
  title: PropTypes.string,
  value: PropTypes.object
}
