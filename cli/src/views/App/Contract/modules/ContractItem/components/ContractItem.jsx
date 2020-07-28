import React, { useState } from 'react'
import { Avatar, Badge, Checkbox } from 'antd'
import PropTypes from 'prop-types'

import { DEFAULT_LABELS, DEFAULT_USERS } from '../../const'

export default function ContractItem({ contract, onTodoSelect, onTodoChecked, onMarkAsStart }) {
  const [users, setUsers] = useState(DEFAULT_USERS)
  const [labels, setLabels] = useState(DEFAULT_LABELS)

  // let user = null
  // if (todo.user > 0)  user = users[todo.user - 1]

  return (
    <div className='gx-module-list-item'>
      <div className='gx-module-list-icon'>
        <Checkbox color='primary'
          checked={true}
          onClick={(event) => {
            event.stopPropagation()
            onTodoChecked(contract)
          }}
          value='SelectTodo'
          className='gx-icon-btn'
        />

        {/*<div onClick={() => {*/}
        {/*  todo.starred = !todo.starred*/}
        {/*  onMarkAsStart(todo)*/}
        {/*}}>*/}
        {/*  {todo.starred ?*/}
        {/*    <i className='gx-icon-btn icon icon-star'/> :*/}
        {/*    <i className='gx-icon-btn icon icon-star-o'/>*/}
        {/*  }*/}

        {/*</div>*/}
      </div>
      <div className='gx-module-list-info'
        // onClick={() => {
        //   onTodoSelect(todo)
        // }}
      >
        <div className='gx-module-todo-content'>
          <div className={`gx-subject ${contract.completed && 'gx-text-muted gx-text-strikethrough'}`}>
            <span className='gx-sender-name'>From </span> {contract.startDate}
            <span className='gx-toolbar-separator'>&nbsp;</span>
            <span className='gx-sender-name'>To </span> {contract.to}

            <span className='gx-d-inline-block gx-text-truncate gx-send-subject'>Durations: 6</span>
          </div>
          <div className='gx-manage-margin'>
            {labels.map((label, index) => {
              return (contract.labels).includes(label.id) &&
                <Badge key={index} count={label.title} style={{ backgroundColor: label.color }}/>
            })}
          </div>
        </div>
        <div className='gx-module-todo-right'>
          <Avatar
            alt={''}
            src='https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png'
            // src={user.thumb}
          />
          {/*{*/}
          {/*  user === null*/}
          {/*    ? <Avatar>Null</Avatar>*/}
          {/*    : <span>*/}
          {/*      */}
          {/*      <Avatar alt={user.name}*/}
          {/*        src='https://images.unsplash.com/photo-1563729574084-950da51d3822?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=100&ixlib=rb-1.2.1&q=80&w=100'*/}
          {/*        // src={user.thumb}*/}
          {/*      />*/}
          {/*      <Avatar alt={user.name}*/}
          {/*        src='https://images.unsplash.com/photo-1563729574084-950da51d3822?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=100&ixlib=rb-1.2.1&q=80&w=100'*/}
          {/*        // src={user.thumb}*/}
          {/*      />*/}
          {/*    </span>*/}
          {/*}*/}
        </div>
      </div>
    </div>
  )
}

ContractItem.propTypes = {
  contract: PropTypes.object,
  onTodoChecked: PropTypes.func,
  onTodoSelect: PropTypes.func,
  onMarkAsStart: PropTypes.func
}

ContractItem.defaultProps = {
  onTodoChecked: () => {},
  onTodoSelect: () => {},
  onMarkAsStart: () => {}
}
