import React, { useEffect, useState, useCallback } from 'react'
import PropTypes from 'prop-types'
import { Button, Checkbox } from 'antd'
import _ from 'lodash'
import { apiContract, notify } from 'constants/api'
// Components
import Auxiliary from 'util/Auxiliary'
import CustomScrollbars from 'util/CustomScrollbars'
// Modules
import ContractHeader from '../modules/ContractHeader'
import ContractSidebar from '../modules/ContractSidebar'
import ContractModal from '../modules/ContractModal'
import ContractItem from '../modules/ContractItem'
import BillItem from '../modules/BillItem'
// Hooks
import useList from 'hooks/useList'
import useInitState from 'hooks/useInitState'

export default function Contract({ loading }) {
  const [contracts, setContracts, updateContracts] = useList([])
  const [bills, setBills, updateBills] = useList([])
  const [ids, setIds, clearIds] = useInitState({ room_id: null, contract_id: null })
  const [lastElectricNumber, setLastElectricNumber] = useState(0)

  const getLastElectric = useCallback(async() => {
    if (ids.contract_id) {
      let electricInfo = await apiContract.getElectric(ids)
      setLastElectricNumber(electricInfo.electric)
    }
  }, [ids])

  useEffect(() => { getLastElectric() }, [getLastElectric])

  const selectRoom = useCallback(async(room_id) => {
    loading(true)
    let contracts = await apiContract.get({ room_id })
    setContracts(contracts)
    setIds(prev => ({ ...prev, room_id }))
    loading(false)
  }, [loading, setContracts, setIds])

  const hdUpdateContract = useCallback(contract => {
    updateContracts(contract)
  }, [updateContracts])

  const hdUpdateBill = useCallback(bill => {
    updateBills(bill)
    setLastElectricNumber(bill.electric.number)
    notify('success', 'Bill\'s information has been generated successfully.')
  }, [updateBills])

  const selectContract = useCallback(contract => {
    setBills(contract.bill_id)
    setIds(prev => ({ ...prev, contract_id: contract._id }))
  }, [setBills, setIds])

  return (
    <div className='gx-main-content'>
      <div className='gx-app-module'>
        <ContractSidebar loading={loading} onSelectRoom={selectRoom}>
          <ContractModal
            onPostCreate={hdUpdateContract}
            roomId={ids.roomId}
            tgProps={{ disabled: !!ids.roomId }}
          />
        </ContractSidebar>
        <div className='gx-module-box'>
          <div className='gx-module-box-header'>
            <span className='gx-drawer-btn gx-d-flex gx-d-lg-none'>
              <i
                className='icon icon-menu gx-icon-btn'
                aria-label='Menu'
                onClick={() => {}}
              />
            </span>
            <ContractHeader onChange={() => {}} value=''/>
          </div>
          <div className='gx-module-box-content'>
            <div className='gx-module-list'>
              <div className='gx-module-box-topbar gx-module-box-topbar-todo'>
                {
                  contracts.length > 0 && <Auxiliary>
                    <Checkbox className='gx-icon-btn' color='primary'
                      // indeterminate={selectedToDos > 0 && selectedToDos < toDos.length}
                      checked={false}
                      // onChange={onAllTodoSelect.bind(this)}
                    />
                    {/*<Dropdown overlay={optionMenu()} placement='bottomRight' trigger={['click']}>*/}
                    {/*  <div>*/}
                    {/*    <span className='gx-px-2'> {optionName}</span>*/}
                    {/*    <i className='icon icon-charvlet-down'/>*/}
                    {/*  </div>*/}
                    {/*</Dropdown>*/}
                  </Auxiliary>
                }
              </div>
              {
                !!ids.contract_id && <Button onClick={() => clearIds('contract_id')}>
                  Back to list
                </Button>
              }
              {
                !!ids.contract_id || <CustomScrollbars className='gx-module-content-scroll'>
                  <div className='gx-module-list'>
                    {
                      contracts.map(c =>
                        <ContractItem
                          key={c._id}
                          roomId={ids.room_id}
                          contract={c}
                          onClick={selectContract.bind(this, c)}
                          // onTodoSelect={onTodoSelect}
                          // onMarkAsStart={onMarkAsStart}
                          // onTodoChecked={onTodoChecked}
                        />
                      )
                    }
                  </div>
                </CustomScrollbars>
              }
              {
                ids.contract_id && _.map(bills, bill => (
                  <BillItem
                    key={bill._id}
                    bill={bill}
                    apiParams={ids}
                    onAfterUpdate={hdUpdateBill}
                    lastNumber={lastElectricNumber}
                  />
                ))
              }
            </div>
            {/*{currentTodo === null ?*/}
            {/*<div className='gx-module-box-topbar gx-module-box-topbar-todo'>*/}
            {/*  {toDos.length > 0 ?*/}
            {/*    <Auxiliary>*/}
            {/*      <Checkbox className='gx-icon-btn' color='primary'*/}
            {/*        indeterminate={selectedToDos > 0 && selectedToDos < toDos.length}*/}
            {/*        checked={selectedToDos > 0}*/}
            {/*        onChange={onAllTodoSelect.bind(this)}*/}
            {/*        value='SelectMail'/>*/}
            {/*      <Dropdown overlay={optionMenu()} placement='bottomRight' trigger={['click']}>*/}
            {/*        <div>*/}
            {/*          <span className='gx-px-2'> {optionName}</span>*/}
            {/*          <i className='icon icon-charvlet-down'/>*/}
            {/*        </div>*/}
            {/*      </Dropdown>*/}
            {/*    </Auxiliary> : null}*/}

            {/*{( selectedToDos > 0) &&*/}
            {/*  <div className='gx-flex-row gx-align-items-center'>*/}
            {/*    <Dropdown overlay={labelMenu()} placement='bottomRight' trigger={['click']}>*/}
            {/*      <i className='gx-icon-btn icon icon-tag'/>*/}
            {/*    </Dropdown>*/}
            {/*    <span onClick={onDeleteSelected.bind(this, selectedToDos)}>*/}
            {/*      <i className='icon icon-trash gx-icon-btn'/>*/}
            {/*    </span>*/}
            {/*  </div>*/}
            {/*}*/}
            {/*</div>*/}
            {/*  :*/}
            {/*  <div className='gx-module-box-topbar'>*/}
            {/*    <i className='icon icon-arrow-left gx-icon-btn' onClick={() => {*/}
            {/*      setCurrentTodo(null)*/}
            {/*    }}/>*/}
            {/*  </div>*/}
            {/*}*/}
          </div>
        </div>
      </div>
      {/*{showMessage && message.info(<span id='message-id'>{alertMessage}</span>, 3, handleRequestClose)}*/}
    </div>
  )
}

Contract.propTypes = {
  loading: PropTypes.func
}
