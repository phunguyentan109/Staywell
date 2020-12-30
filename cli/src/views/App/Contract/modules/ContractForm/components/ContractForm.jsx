import React, { useCallback } from 'react'
import { Form, Input, DatePicker, Button, Modal } from 'antd'
import moment from 'moment'
import { contractApi, call } from 'constants/api'
import { getInitDate, formItemLayout } from '../modules/const'
import PropTypes from 'prop-types'
import { useToggle, useStore } from 'hooks'
import _ from 'lodash'

const FormItem = Form.Item

function ContractForm({ onPostCreate, roomId }) {
  const [pairs, togglePairs] = useToggle({ modal: false, process: false })
  const [contract, repContract] = useStore({
    electric: 0,
    from: getInitDate(),
    duration: 0
  })

  const hdSubmit = useCallback(async() => {
    const { electric, from, duration } = contract
    let data = { info: { electric, from }, duration }
    let rs = await call(...contractApi.create(roomId), data)
    rs.status === 200 && onPostCreate(_.get(rs, 'data._id'))
  }, [roomId, contract, onPostCreate])

  const hdChange = useCallback(e => {
    const { name, value } = e.target
    repContract({ [name]: value })
  }, [repContract])

  const hdChangeDate = useCallback(from => repContract({ from }), [repContract])

  const disabledDate = useCallback(current => {
    let startMonth = moment().startOf('month')
    let dayTenth = moment(current).startOf('month').add(10, 'day')
    return current < startMonth || current > dayTenth
  }, [])

  return (
    <>
      <div className='gx-module-add-task'>
        <Button
          variant='raised'
          type='primary'
          className='gx-btn-block'
          onClick={() => togglePairs(['modal'])}
        >
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

export default ContractForm

ContractForm.propTypes = {
  tgProps: PropTypes.object,
  onPostCreate: PropTypes.func,
  roomId: PropTypes.string
}

ContractForm.defaultProps = {
  tgProps: {}
}
