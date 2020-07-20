import React, { useState } from 'react'
import { Button, Form, Modal, Input, DatePicker } from 'antd'
import moment from 'moment'

const FormItem = Form.Item
const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
}

function CreateModal() {
  const [visible, setVisible] = useState(false)
  const [loading, setLoading] = useState(false)
  const [contract, setContract] = useState({
    electric: 0,
    date: moment(Date.now()),
    month: 6
  })

  function handleModal() {
    setVisible(!visible)
  }

  function handleSubmit() {
    setLoading(true)

    setTimeout(() => {
      setVisible(!visible)
      setLoading(false)
    }, 2000)
  }

  function hdChange(e) {
    const { name, value } = e.target
    setContract(prev => ({ ...prev, [name]: value }))
  }

  function hdChangeDate(value) {
    setContract({ ...contract, date: value })
  }

  function disabledDate(current) {
    let startMonth = moment().startOf('month')
    let afterDayTen = moment(current).startOf('month').add(10, 'day')

    return current < startMonth || current > afterDayTen
  }

  function onFinishFailed(errorInfo) {
    console.log('Failed:', errorInfo)
  }

  return (
    <div>
      <div className='gx-module-add-task'>
        <Button
          variant='raised'
          type='primary'
          className='gx-btn-block'
          onClick={() => {}}>
          <span>NEW CONTRACT</span>
        </Button>
      </div>
      <Modal
        title='Create new contract'
        visible={visible}
        confirmLoading={loading}
        onOk={handleSubmit}
        onCancel={handleModal}
        footer={[
          <Button key='back' onClick={handleModal}>
            Cancel
          </Button>,
          <Button key='submit' type='primary' loading={loading} onClick={handleSubmit}>
            Submit
          </Button>,
        ]}
      >

        <Form onSubmit={handleSubmit} onFinishFailed={onFinishFailed}>
          <FormItem
            {...formItemLayout}
            label='Starting electric number'
            rules={[{ required: true, message: 'Please input electric number!' }]}
          >
            <Input
              name='electric'
              placeholder='Please enter a number'
              onChange={hdChange}
              type='number'
              value={contract.electric}
            />
          </FormItem>

          <FormItem
            {...formItemLayout}
            label='Start date'
            rules={[{ required: true, message: 'Please input start date!' }]}
          >
            <DatePicker
              name='date'
              className='gx-btn-block'
              format='YYYY-MM-DD'
              disabledDate={disabledDate}
              value={contract.date}
              onChange={hdChangeDate}
            />
          </FormItem>

          <FormItem
            {...formItemLayout}
            label='Duration (months)'
            rules={[{ required: true, message: 'Please input number duration!' }]}
          >
            <Input
              name='month'
              placeholder='Please enter a number duration'
              onChange={hdChange}
              type='number'
              value={contract.month}
            />
          </FormItem>
        </Form>
      </Modal>
    </div>
  )
}

export default CreateModal
