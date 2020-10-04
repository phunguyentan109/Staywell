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
import { useList, useStore } from 'hooks'

export default function Contract({ loading }) {
  const [contracts, setContracts, updateContracts] = useList([])
  const [bills, setBills, updateBills, resetBills] = useList([])
  const [ids, repIds, setIds, clearIds] = useStore({ room_id: null, contract_id: null })
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
    setIds({ contract_id: null, room_id })
    resetBills()
    loading(false)
  }, [loading, resetBills, setContracts, setIds])

  const hdUpdateBill = useCallback(bill => {
    updateBills(bill)
    setLastElectricNumber(bill.electric.number)
    notify('success', 'Bill\'s information has been generated successfully.')
  }, [updateBills])

  const selectContract = useCallback(contract_id => async() => {
    loading(true)
    let contract = await apiContract.get({ room_id: ids.roomId, contract_id })
    const orderedBill = contract.bill_id.sort((a, b) => moment(a).diff(moment(b)))
    setBills(orderedBill)
    repIds({ contract_id: contract._id })
    loading(false)
  }, [loading, ids.roomId, setBills, repIds])

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
          <Row>
            {
              !!ids.contract_id || contracts.map(c => <ContractItem
                key={c._id}
                roomId={ids.room_id}
                contract={c}
                onClick={selectContract(c._id)}
              />)
            }
            {
              !!ids.contract_id && <Col span={24}>
                <Card className='gx-card back-bar'>
                  <i className='fas fa-arrow-left action back-contract' onClick={() => clearIds()}/>
                  <span className='gx-toolbar-separator'>&nbsp;</span>
                  <span>Contract #{ids.contract_id.substring(ids.contract_id.length - 4, ids.contract_id.length)}</span>
                </Card>
              </Col>
            }
            {
              !!ids.contract_id && _.map(bills, bill => (
                <Col span={8}>
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
