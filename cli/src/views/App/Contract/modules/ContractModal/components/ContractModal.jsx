import React, { useState, useCallback } from 'react'
import { Form, Input, DatePicker, Button, Modal } from 'antd'
import moment from 'moment'
// import ContractAction from '../modules/ContractAction'
import { apiContract } from 'constants/api'
import { getInitDate, formItemLayout } from '../modules/const'
import PropTypes from 'prop-types'
import { useToggle } from 'hooks'

const FormItem = Form.Item

function ContractModal({ onPostCreate, roomId }) {
  const [pairs, togglePairs] = useToggle({ modal: false, process: false })
  const [contract, setContract] = useState({
    electric: 0,
    from: getInitDate(),
    duration: 0
  })

  const hdSubmit = useCallback(async() => {
    const { electric, from, duration } = contract
    let data = { info: { electric, from }, duration }
    let createdContract = await apiContract.create({ room_id: roomId, data })
    onPostCreate(createdContract)
  }, [roomId, contract, onPostCreate])

  function hdChange(e) {
    const { name, value } = e.target
    setContract(prev => ({ ...prev, [name]: value }))
  }

  function hdChangeDate(from) {
    setContract({ ...contract, from })
  }

  function disabledDate(current) {
    let startMonth = moment().startOf('month')
    let dayTenth = moment(current).startOf('month').add(10, 'day')
    return current < startMonth || current > dayTenth
  }

  return (
    <>
      <div className='gx-module-add-task'>
        <Button variant='raised' type='primary' className='gx-btn-block'>
          <span className='icon icon-add-circle'/>NEW CONTRACT
        </Button>
      </div>
      <Modal
        title='Open new contract'
        visible={pairs.modal}
        onCancel={() => togglePairs(['modal'])}
        onOk={hdSubmit}
        confirmLoading={pairs.process}
      >
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
            className='gx-btn-block'
            format='YYYY-MM-DD'
            disabledDate={disabledDate}
            value={contract.from}
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
            name='duration'
            placeholder='Please enter a number'
            onChange={hdChange}
            value={contract.duration}
          />
        </FormItem>
      </Modal>
    </>
  )
}

export default ContractModal

ContractModal.propTypes = {
  tgProps: PropTypes.object,
  onPostCreate: PropTypes.func,
  roomId: PropTypes.string
}

ContractModal.defaultProps = {
  tgProps: {}
}
