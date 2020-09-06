import React, { useEffect, useState, useCallback, useMemo } from 'react'
import PropTypes from 'prop-types'
import { Card, Row, Col } from 'antd'
import _ from 'lodash'
import moment from 'moment'
import { apiContract, notify } from 'constants/api'
// Modules
import ContractSidebar from '../modules/ContractSidebar'
import ContractModal from '../modules/ContractModal'
import ContractItem from '../modules/ContractItem'
import BillItem from '../modules/BillItem'
// Hooks
import useList from 'hooks/useList'
import useInitState from 'hooks/useInitState'

export default function Contract({ loading }) {
  const [contracts, setContracts, updateContracts] = useList([])
  const [bills, setBills, updateBills, resetBills] = useList([])
  const [ids, setIds, clearIds] = useInitState({ room_id: null, contract_id: null })
  const [lastElectricNumber, setLastElectricNumber] = useState(0)

  const nextGenerateAllowId = useMemo(() => {
    if (!!bills.length) {
      let nextGenerateBill = _.find(bills, b => !b.electric)
      return nextGenerateBill._id
    }
  }, [bills])

  const getLastElectric = useCallback(async() => {
    if (ids.contract_id) {
      let electricNumber = await apiContract.getElectric(ids)
      setLastElectricNumber(electricNumber)
    }
  }, [ids])

  useEffect(() => { getLastElectric() }, [getLastElectric])

  const selectRoom = useCallback(async(room_id) => {
    loading(true)
    let contracts = await apiContract.get({ room_id })
    setContracts(contracts)
    // Reset feature with new room data
    setIds({ contract_id: null, room_id })
    resetBills()
    loading(false)
  }, [loading, resetBills, setContracts, setIds])

  const hdUpdateBill = useCallback(bill => {
    updateBills(bill)
    setLastElectricNumber(bill.electric.number)
    notify('success', 'Bill\'s information has been generated successfully.')
  }, [updateBills])

  const selectContract = useCallback(async(contract_id) => {
    loading(true)
    let contract = await apiContract.get({ room_id: ids.roomId, contract_id })
    const orderedBill = contract.bill_id.sort((a, b) => moment(a).diff(moment(b)))
    setBills(orderedBill)
    setIds(prev => ({ ...prev, contract_id: contract._id }))
    loading(false)
  }, [loading, ids.roomId, setBills, setIds])

  return (
    <div className='manage-contract'>
      <Row>
        <Col span={5}>
          <ContractSidebar loading={loading} onSelectRoom={selectRoom}>
            <ContractModal
              onPostCreate={updateContracts}
              roomId={ids.room_id}
              tgProps={{ disabled: !!ids.roomId }}
            />
          </ContractSidebar>
        </Col>
        <Col span={19}>
          <Card className='gx-card action-bar'>
            <i className='far fa-square action check-box'/>
            <span className='gx-toolbar-separator'>&nbsp;</span>
            <div className='action reload'>
              <i className='fas fa-sync-alt'/>&nbsp;Refresh
            </div>
            <div className='action remove'>
              <i className='fas fa-trash'/>&nbsp;Remove
            </div>
          </Card>
          {
            !!ids.contract_id && <span onClick={() => clearIds()}>Click here to back</span>
          }
          <Row>
            {
              !!ids.contract_id || contracts.map(c => <ContractItem
                key={c._id}
                roomId={ids.room_id}
                contract={c}
                onClick={selectContract.bind(this, c._id)}
              />)
            }
            {
              !!ids.contract_id && _.map(bills, bill => (
                <Col span={6}>
                  <BillItem
                    key={bill._id}
                    bill={bill}
                    apiParams={ids}
                    onAfterUpdate={hdUpdateBill}
                    lastNumber={lastElectricNumber}
                    allowGenerate={nextGenerateAllowId === bill._id}
                    allowPayment={bill.electric && !bill.paidDate}
                  />
                </Col>
              ))
            }
          </Row>
        </Col>
      </Row>
    </div>
  )
}

Contract.propTypes = {
  loading: PropTypes.func
}
