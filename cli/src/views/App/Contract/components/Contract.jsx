import React, { useEffect, useState, useCallback } from 'react'
import PropTypes from 'prop-types'
import { apiContract } from 'constants/api'
// import { content } from 'googleapis/build/src/apis/content'
// import { Checkbox, Drawer, Dropdown, message } from 'antd'
// import CustomScrollbars from '../../../../util/CustomScrollbars'
// import CreateContract from '../modules/CreateContract'
// import IntlMessages from '../../../../util/IntlMessages'
import ContractHeader from '../modules/ContractHeader'
// import Auxiliary from '../../../../util/Auxiliary'
// import CircularProgress from '../../../../components/CircularProgress'
import ContractSidebar from '../modules/ContractSidebar'
import CreateContract from '../modules/CreateContract'
import useInitState from 'hooks/useInitState'

export default function Contract({ loading }) {
  const [contracts, setContracts] = useInitState([])

  const selectContract = useCallback(async(room_id) => {
    loading(true)
    let contracts = await apiContract.get({ room_id })
    setContracts(contracts)
    loading(false)
  }, [loading, setContracts])

  return (
    <div className='gx-main-content'>
      <div className='gx-app-module'>
        <ContractSidebar loading={loading} onSelectRoom={selectContract}>
          <CreateContract />
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
            <ContractHeader
              // user={user}
              user={{}}
              // onChange={updateSearch.bind(this)}
              onChange={() => {}}
              // value={searchTodo}
              value=''
            />
          </div>
          {/*<div className='gx-module-box-content'>*/}
          {/*  {currentTodo === null ?*/}
          {/*    <div className='gx-module-box-topbar gx-module-box-topbar-todo'>*/}
          {/*      {toDos.length > 0 ?*/}
          {/*        <Auxiliary>*/}
          {/*          <Checkbox className='gx-icon-btn' color='primary'*/}
          {/*            indeterminate={selectedToDos > 0 && selectedToDos < toDos.length}*/}
          {/*            checked={selectedToDos > 0}*/}
          {/*            onChange={onAllTodoSelect.bind(this)}*/}
          {/*            value='SelectMail'/>*/}
          {/*          <Dropdown overlay={optionMenu()} placement='bottomRight' trigger={['click']}>*/}
          {/*            <div>*/}
          {/*              <span className='gx-px-2'> {optionName}</span>*/}
          {/*              <i className='icon icon-charvlet-down'/>*/}
          {/*            </div>*/}
          {/*          </Dropdown>*/}
          {/*        </Auxiliary> : null}*/}

          {/*      {( selectedToDos > 0) &&*/}
          {/*        <div className='gx-flex-row gx-align-items-center'>*/}
          {/*          <Dropdown overlay={labelMenu()} placement='bottomRight' trigger={['click']}>*/}
          {/*            <i className='gx-icon-btn icon icon-tag'/>*/}
          {/*          </Dropdown>*/}
          {/*          <span onClick={onDeleteSelected.bind(this, selectedToDos)}>*/}
          {/*            <i className='icon icon-trash gx-icon-btn'/>*/}
          {/*          </span>*/}
          {/*        </div>*/}
          {/*      }*/}
          {/*    </div>*/}
          {/*    :*/}
          {/*    <div className='gx-module-box-topbar'>*/}
          {/*      <i className='icon icon-arrow-left gx-icon-btn' onClick={() => {*/}
          {/*        setCurrentTodo(null)*/}
          {/*      }}/>*/}
          {/*    </div>*/}
          {/*  }*/}
          {/*</div>*/}
        </div>
      </div>
      {/*{showMessage && message.info(<span id='message-id'>{alertMessage}</span>, 3, handleRequestClose)}*/}
    </div>
  )
}

Contract.propTypes = {
  loading: PropTypes.func
}
