import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
// import Todo from './Todo'
// import { content } from 'googleapis/build/src/apis/content'
import { Checkbox, Drawer, Dropdown, message } from 'antd'
// import CustomScrollbars from '../../../../util/CustomScrollbars'
// import CreateContract from '../modules/CreateContract'
// import IntlMessages from '../../../../util/IntlMessages'
// import AppModuleHeader from '../../../../components/AppModuleHeader'
// import Auxiliary from '../../../../util/Auxiliary'
// import CircularProgress from '../../../../components/CircularProgress'
import ContractSidebar from '../modules/ContractSidebar'
import CreateContract from '../modules/CreateContract'

export default function Contract({ loading }) {
  useEffect(() => { loading(false) }, [loading])
  return (
    <div className='gx-main-content'>
      <div className='gx-app-module'>
        <div className='gx-d-block gx-d-lg-none'>
          <Drawer
            placement='left'
            closable={false}
            visible={false}
            onClose={() => {}}
          >
            <ContractSidebar>
              <CreateContract/>
            </ContractSidebar>
          </Drawer>
        </div>
        <div className='gx-module-sidenav gx-d-none gx-d-lg-flex'>
          <ContractSidebar>
            <CreateContract/>
          </ContractSidebar>
        </div>

        {/*  <div className='gx-module-box'>*/}
        {/*    <div className='gx-module-box-header'>*/}

        {/*      <span className='gx-drawer-btn gx-d-flex gx-d-lg-none'>*/}
        {/*        <i className='icon icon-menu gx-icon-btn' aria-label='Menu'*/}
        {/*           onClick={onToggleDrawer.bind(this)}*/}
        {/*        />*/}
        {/*      </span>*/}
        {/*      <AppModuleHeader*/}
        {/*        placeholder='Search To Do'*/}
        {/*        user={user}*/}
        {/*        onChange={updateSearch.bind(this)}*/}
        {/*        value={searchTodo}*/}
        {/*      />*/}
        {/*    </div>*/}
        {/*    <div className='gx-module-box-content'>*/}
        {/*      {currentTodo === null ?*/}
        {/*        <div className='gx-module-box-topbar gx-module-box-topbar-todo'>*/}
        {/*          {toDos.length > 0 ?*/}
        {/*            <Auxiliary>*/}
        {/*              <Checkbox className='gx-icon-btn' color='primary'*/}
        {/*                        indeterminate={selectedToDos > 0 && selectedToDos < toDos.length}*/}
        {/*                        checked={selectedToDos > 0}*/}
        {/*                        onChange={onAllTodoSelect.bind(this)}*/}
        {/*                        value='SelectMail'/>*/}
        {/*              <Dropdown overlay={optionMenu()} placement='bottomRight' trigger={['click']}>*/}
        {/*                <div>*/}
        {/*                  <span className='gx-px-2'> {optionName}</span>*/}
        {/*                  <i className='icon icon-charvlet-down'/>*/}
        {/*                </div>*/}
        {/*              </Dropdown>*/}
        {/*            </Auxiliary> : null}*/}

        {/*          {( selectedToDos > 0) &&*/}
        {/*          <div className='gx-flex-row gx-align-items-center'>*/}
        {/*            <Dropdown overlay={labelMenu()} placement='bottomRight' trigger={['click']}>*/}
        {/*              <i className='gx-icon-btn icon icon-tag'/>*/}
        {/*            </Dropdown>*/}
        {/*            <span onClick={onDeleteSelected.bind(this, selectedToDos)}>*/}
        {/*                  <i className='icon icon-trash gx-icon-btn'/>*/}
        {/*                </span>*/}
        {/*          </div>*/}
        {/*          }*/}
        {/*        </div>*/}
        {/*        :*/}
        {/*        <div className='gx-module-box-topbar'>*/}
        {/*          <i className='icon icon-arrow-left gx-icon-btn' onClick={() => {*/}
        {/*            setCurrentTodo(null)*/}
        {/*          }}/>*/}
        {/*        </div>*/}
        {/*      }*/}

        {/*      {*/}
        {/*        loader*/}
        {/*          ? <div className='gx-loader-view'>*/}
        {/*            <CircularProgress/>*/}
        {/*          </div>*/}
        {/*          : showToDos({ currentTodo, toDos, conversation, user })*/}
        {/*      }*/}
        {/*    </div>*/}
        {/*  </div>*/}
      </div>
      {/*{showMessage && message.info(<span id='message-id'>{alertMessage}</span>, 3, handleRequestClose)}*/}
    </div>
  )
}

Contract.propTypes = {
  loading: PropTypes.func
}
