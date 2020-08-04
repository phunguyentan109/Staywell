import React, { useEffect, useState, useCallback } from 'react'
import PropTypes from 'prop-types'
import { apiContract } from 'constants/api'
import { Button } from 'antd'
// import { content } from 'googleapis/build/src/apis/content'
// import { Checkbox, Drawer, Dropdown, message } from 'antd'
// import CreateContract from '../modules/CreateContract'
// import IntlMessages from '../../../../util/IntlMessages'
import ContractHeader from '../modules/ContractHeader'
import Auxiliary from 'util/Auxiliary'
// import CircularProgress from '../../../../components/CircularProgress'
import ContractSidebar from '../modules/ContractSidebar'
import ContractModal from '../modules/ContractModal'
import useList from 'hooks/useList'
import useInitState from 'hooks/useInitState'
import CustomScrollbars from 'util/CustomScrollbars'
import ContractItem from '../modules/ContractItem'
import BillItem from '../modules/BillItem'
import _ from 'lodash'
import { Checkbox } from 'antd'

export default function Contract({ loading }) {
  const [contracts, setContracts, updateContracts] = useList([])
  const [roomId, setRoomId] = useState(null)
  // const [selected, setSelected, clearSelected] = useInitState([])
  const [contract, setContract, clearContract] = useInitState(null)

  const selectContract = useCallback(async(room_id) => {
    loading(true)
    let contracts = await apiContract.get({ room_id })
    setContracts(contracts)
    setRoomId(room_id)
    loading(false)
  }, [loading, setContracts, setRoomId])

  const hdUpdateContract = useCallback(contract => {
    updateContracts(contract)
  }, [updateContracts])

  function hdViewContract(contract) {
    setContract(contract)
  }

  return (
    <div className='gx-main-content'>
      <div className='gx-app-module'>
        <ContractSidebar loading={loading} onSelectRoom={selectContract}>
          <ContractModal
            onPostCreate={hdUpdateContract}
            roomId={roomId}
            tgProps={{ disabled: roomId === null }}
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
              { _.isEmpty(contract) || <Button onClick={clearContract}>Back to list</Button> }
              {
                _.isEmpty(contract) && <CustomScrollbars className='gx-module-content-scroll'>
                  <div className='gx-module-list'>
                    {
                      contracts.map((c, i) =>
                        <ContractItem
                          key={c._id}
                          // index={i}
                          roomId={roomId}
                          contract={c}
                          onClick={hdViewContract.bind(this, c)}
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
                _.isEmpty(contract) || _.map(contract.bill_id, bill => (
                  <BillItem
                    key={bill._id}
                    bill={bill}
                    apiParams={{
                      contract_id: contract._id,
                      room_id: roomId
                    }}
                    onAfterUpdate={hdUpdateContract}
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
