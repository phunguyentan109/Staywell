import React from 'react'
import { Avatar, Progress, Card, Col, Badge } from 'antd'
import PropTypes from 'prop-types'
import _ from 'lodash'

const AVATAR = [
  'https://images.unsplash.com/photo-1596649118660-11befb42f51a?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=100&ixlib=rb-1.2.1&q=80&w=100',
  'https://images.unsplash.com/photo-1597323892299-63afb3c6a1f4?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=100&ixlib=rb-1.2.1&q=80&w=100',
  'https://images.unsplash.com/photo-1597002565316-642989cef8bf?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=100&ixlib=rb-1.2.1&q=80&w=100'
]

export default function ContractItem({ contract, onClick }) {
  return (
    <Col span={12} onClick={onClick}>
      <Card className='gx-card'>
        <div className='contract-item'>
          <i className='far fa-square action check-box'/>
          <div className='contract-info'>
            <div>
              <div className='contract-progress'>
                <div className='progress-icon'>
                  <Badge dot>
                    <i className='icon icon-chart-pie'/>
                  </Badge>
                </div>
                <div className='progress-b'>
                  <Progress
                    percent={30}
                    showInfo={false}
                    strokeColor='#87d068'
                    status='active'
                  />
                </div>
                <p>{contract.duration} month(s)</p>
              </div>
              <span className='gx-sender-name'>From:</span> {contract.info.from}
              <span className='gx-toolbar-separator'>&nbsp;</span>
              <span className='gx-sender-name'>To:</span> {contract.info.to}
            </div>
            <div>
              { _.map(AVATAR, (v, i) => <Avatar key={i} alt='avatar' style={{ marginRight: 20 * i }} src={v}/>) }
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
}

ContractItem.defaultProps = {
  onClick: () => {},
}
