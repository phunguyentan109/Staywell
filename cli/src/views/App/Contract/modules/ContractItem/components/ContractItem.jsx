import React, { useMemo } from 'react'
import { Avatar, Progress, Card, Col, Badge } from 'antd'
import PropTypes from 'prop-types'
import _ from 'lodash'

export default function ContractItem({ contract, onClick }) {
  const users = useMemo(() => {
    return _.get(contract, 'room_id.user_id', [])
  }, [contract])

  return (
    <Col span={12}>
      <Card className='gx-card'>
        <div className='contract-item'>
          <i className='far fa-square action check-box'/>
          <div className='contract-info' onClick={onClick}>
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
              { _.map(users, (v, i) => (
                <Avatar
                  key={v._id}
                  alt='avatar'
                  style={{ marginRight: 20 * i }}
                  src={_.get(v, 'avatar.link', '')}
                />
              )) }
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
