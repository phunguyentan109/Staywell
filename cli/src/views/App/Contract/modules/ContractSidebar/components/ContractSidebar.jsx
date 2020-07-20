import React from 'react'
import CustomScrollbars from '../../../../../../util/CustomScrollbars'
import { Button } from 'antd'
import CreateContract from '../../CreateContract'

export default function ContractSidebar() {
  return (
    <div className='gx-module-side'>
      <div className='gx-module-side-header'>
        <div className='gx-module-logo'>
          <i className='icon icon-wysiwyg gx-mr-3'/>
          <span>Contract List</span>
        </div>

      </div>
      <div className='gx-module-side-content'>
        <CustomScrollbars className='gx-module-side-scroll'>
          <CreateContract/>
          <ul className='gx-module-nav'>

            <li onClick={() => {
              // setCurrentTodo(null)
              // setToDos(allToDos)
            }}>
              <span className='gx-link active'>
                <i className='icon icon-all-contacts gx-pt-1'/>
                {/*<span><IntlMessages id='todo.all'/></span>*/}
                <span>All</span>
              </span>
            </li>

            <li className='gx-module-nav-label'>
              <span>Rooms</span>
            </li>

            {/*{getNavFilters()}*/}

            <li className='gx-module-nav-label'>
              <span>Tags</span>
            </li>
            {/*{getNavLabels()}*/}
          </ul>
        </CustomScrollbars>
      </div>
    </div>
  )
}
