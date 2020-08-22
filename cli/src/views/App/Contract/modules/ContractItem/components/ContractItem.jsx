import React from 'react'
import { Avatar, Progress, Checkbox, Card, Col } from 'antd'
import PropTypes from 'prop-types'

// import { DEFAULT_LABELS, DEFAULT_USERS } from '../../const'

export default function ContractItem({ contract, onClick }) {
  // roomId, onTodoSelect, onTodoChecked, onMarkAsStart
  return (
    <Col span={12}>
      <Card className='gx-card'>
        <div className='contract-item'>
          <Checkbox
            color='primary'
            checked={false}
            onClick={() => {}}
            className='gx-icon-btn'
          />

          {/*<div onClick={() => {*/}
          {/*  // contract.starred = !todo.starred*/}
          {/*  onMarkAsStart(contract)*/}
          {/*}}>*/}
          {/*  <i className={`gx-icon-btn icon icon-star${contract.starred ? '' : '-o'}`}/>*/}
          {/*</div>*/}
          {/*<div className='gx-manage-margin'>*/}
          {/*  { contract.active && <Badge count='active' style={{ backgroundColor: '#4ea04e' }}/> }*/}
          <div className='contract-info'>
            <div>
              <span className='gx-sender-name'>From:</span> {contract.info.from}
              <span className='gx-toolbar-separator'>&nbsp;</span>
              <span className='gx-sender-name'>To:</span> {contract.info.to}
              <div className='contract-progress'>
                <div>
                  <Progress
                    percent={30}
                    showInfo={false}
                    status='active'
                  />
                </div>
                <p>{contract.duration} months</p>
              </div>
            </div>
            <div className='gx-module-todo-right'>
              <Avatar
                alt='avatar'
                src='https://images.unsplash.com/photo-1596649118660-11befb42f51a?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=100&ixlib=rb-1.2.1&q=80&w=100'
                // src={user.thumb}
              />
              <Avatar
                alt='avatar'
                src='https://images.unsplash.com/photo-1597323892299-63afb3c6a1f4?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=100&ixlib=rb-1.2.1&q=80&w=100'
                // src={user.thumb}
              />
              <Avatar
                alt='avatar'
                src='https://images.unsplash.com/photo-1597002565316-642989cef8bf?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=100&ixlib=rb-1.2.1&q=80&w=100'
                // src={user.thumb}
              />
            </div>
          </div>
        </div>
      </Card>
    </Col>
  )
}

ContractItem.propTypes = {
  contract: PropTypes.object,
  onClick: PropTypes.func,
  // onTodoChecked: PropTypes.func,
  // onTodoSelect: PropTypes.func,
  // onMarkAsStart: PropTypes.func
}

ContractItem.defaultProps = {
  onClick: () => {},
  // onTodoChecked: () => {},
  // onTodoSelect: () => {},
  // onMarkAsStart: () => {}
}
