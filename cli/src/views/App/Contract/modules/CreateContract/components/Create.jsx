import React, { useState } from 'react'
import { Button, Menu, Dropdown, Modal, Input, DatePicker } from 'antd'
// import { DownOutlined } from '@ant-design/icons'
import moment from 'moment'

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

  function handleOk() {
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

  function range(start, end) {
    const result = []
    for (let i = start; i < end; i++) {
      result.push(i)
    }
    return result
  }

  function disabledDate(current) {
    let startMonth = moment().startOf('month')
    let afterDayTen = moment(current).startOf('month').add(10, 'day')

    return current < startMonth || current > afterDayTen
  }

  function disabledDateTime() {
    return {
      disabledHours: () => range(0, 24).splice(0, 24),
      disabledMinutes: () => range(0, 60),
      disabledSeconds: () => range(0, 60),
    }
  }

  function handleMenuClick(e) {
    console.log('click', e)
  }

  const menu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key='1'>1st item</Menu.Item>
      <Menu.Item key='2'>2nd item</Menu.Item>
      <Menu.Item key='3'>3rd item</Menu.Item>
    </Menu>
  )

  return (
    <div>
      <Button type='primary' className='gx-btn-block' onClick={handleModal}>
        <span>ADD CONTRACT</span>
      </Button>
      <Modal
        title='Create new contract'
        visible={visible}
        confirmLoading={loading}
        onOk={handleOk}
        onCancel={handleModal}
        footer={[
          <Button key='back' onClick={handleModal}>
            Cancel
          </Button>,
          <Button key='submit' type='primary' loading={loading} onClick={handleOk}>
            Submit
          </Button>,
        ]}
      >
        <div className='gx-form-group'>
          <h3>Starting electric number</h3>
          <Input
            name='electric'
            placeholder='Please enter a number'
            onChange={hdChange}
            type='number'
            value={contract.electric}
          />
        </div>

        <div className='gx-form-group'>
          <h3>Start date</h3>
          <DatePicker
            name='date'
            className='gx-btn-block'
            format='YYYY-MM-DD HH:mm:ss'
            disabledDate={disabledDate}
            disabledTime={disabledDateTime}
            showTime={{ defaultValue: moment('00:00:00', 'HH:mm:ss') }}
            onChange={hdChangeDate}
            value={contract.date}
          />
        </div>

        <div className='gx-form-group'>
          <h3>Duration(months)</h3>
          <Dropdown overlay={menu}>
            <Button className='gx-btn-block'>
            Actions
              {/*<DownOutlined />*/}
            </Button>
          </Dropdown>
        </div>
      </Modal>
    </div>
  )
}

export default CreateModal
