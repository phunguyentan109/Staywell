import React, { useState, useCallback } from 'react'
import { Form, Input, DatePicker } from 'antd'
import moment from 'moment'
import ContractAction from '../modules/ContractAction'
import { apiContract } from 'constants/api'
import { getInitDate, formItemLayout } from '../modules/const'
import PropTypes from 'prop-types'

const FormItem = Form.Item

function ContractModal({ onPostCreate, roomId }) {
  const [contract, setContract] = useState({
    electric: 0,
    date: getInitDate(),
    month: 0
  })

  const hdSubmit = useCallback(async() => {
    let createdContract = await apiContract.create({ room_id: roomId, data: contract })
    onPostCreate(createdContract)
  }, [roomId, contract, onPostCreate])

  function hdChange(e) {
    const { name, value } = e.target
    setContract(prev => ({ ...prev, [name]: value }))
  }

  function hdChangeDate(value) {
    setContract({ ...contract, date: value })
  }

  function disabledDate(current) {
    let startMonth = moment().startOf('month')
    let dayTenth = moment(current).startOf('month').add(10, 'day')
    return current < startMonth || current > dayTenth
  }

  return (
    <ContractAction onSubmit={hdSubmit}>
      <>
        <FormItem
          {...formItemLayout}
          label='Initial electric number'
          rules={[{ required: true, message: 'Please input electric number!' }]}
        >
          <Input
            type='number'
            name='electric'
            placeholder='Please enter a number'
            onChange={hdChange}
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
          rules={[{ required: true, message: 'Duration is required. Please enter a number' }]}
        >
          <Input
            type='number'
            name='month'
            placeholder='Please enter a number'
            onChange={hdChange}
            value={contract.month}
          />
        </FormItem>
      </>
    </ContractAction>
  )
}

export default ContractModal

ContractModal.propTypes = {
  onPostCreate: PropTypes.func,
  roomId: PropTypes.string.isRequired
}
