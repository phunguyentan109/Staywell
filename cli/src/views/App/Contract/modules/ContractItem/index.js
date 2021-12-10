import React, { useMemo } from 'react'
import { Avatar, Card, Col, Progress, Row } from 'antd'
import PropTypes from 'prop-types'
import _ from 'lodash'
import './_styles.scss'
import { CheckCircleFilled, FileTextFilled, SnippetsOutlined } from '@ant-design/icons'
import Checkbox from '../Checkbox'
import { formatFullTextTime } from 'util/helper'

const url = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRXgqlxGKd86XJmf_lWmV19p1vHVVAjRK6I5U0bY3TqeJoejrUV-M-8qBpdLp9ivVy7fy4&usqp=CAU'

export default function ContractItem({ contract, isCheck, onClick }) {
  const users = useMemo(() => {
    return _.get(contract, 'room_id.user_id', [])
  }, [contract])

  const progressTime = contract?.bill_id?.length / contract.duration * 100
  const isDoneTime = progressTime === 100

  let cssMore = ''
  if (isDoneTime) cssMore += 'done '
  if (isCheck) cssMore += 'select'

  return (
    <Col span={24}>
      <Card className={`gx-card contract-item ${cssMore}`}>
        <Row align='middle' justify='space-between' wrap={false}>
          <Col span={20}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <div style={{ marginRight: 30 }}>
                <Checkbox value={contract._id} onClick={onClick} checked={isCheck} />
              </div>

              <div>
                <div className='first-line'>
                  <div style={{ display: 'flex', color: 'gray', whiteSpace: 'nowrap', fontSize: '14px' }}>
                    <div className='contract-id' style={{ display: 'flex', alignItems: 'center' }}>
                      {isDoneTime || <SnippetsOutlined style={{ fontSize: 14, marginRight: 5 }}/>}
                      {isDoneTime && <FileTextFilled style={{ fontSize: 14, marginRight: 5, color: '#949494' }}/>}
                      <div style={{ fontSize: 14, height: 14, marginRight: 0 }}>#{_.takeRight(contract._id, 5)}</div>
                    </div>

                    <div style={{ margin: '0 10px 0 7px', color: 'gray' }}> - </div>

                    <div className='gx-badge gx-text-white price-badge'>
                      <i className='fas fa-dollar-sign' style={{ fontSize: '10px' }}/>
                      <span style={{ fontSize: 12, marginLeft: 5 }}>Price A</span>
                    </div>
                  </div>

                  <div className='progress-b'>
                    <Progress
                      percent={progressTime}
                      showInfo={false}
                      strokeColor={isDoneTime ? '#87d06987' : '#87d068'}
                      strokeWidth={5}
                      status={isDoneTime ? 'normal' : 'active'}
                    />
                  </div>

                  <span className='mr-sm' style={{ whiteSpace: 'nowrap' }}>
                    {contract?.bill_id?.length}/{contract.duration} month(s)
                  </span>

                  {isDoneTime && <div style={{ display: 'flex', alignItems: 'center' }}>
                    <CheckCircleFilled style={{ color: '#87d068', marginRight: 5 }} />
                  </div>}


                </div>

                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <span className='gx-sender-name' style={{ marginRight: 6 }}>Place:</span> {contract?.room_id?.name}
                  <span className='gx-toolbar-separator'>&nbsp;</span>
                  <span className='gx-sender-name' style={{ marginRight: 6 }}>From:</span> {formatFullTextTime(contract.startDate)}
                  <span className='gx-toolbar-separator'>&nbsp;</span>
                  <span className='gx-sender-name' style={{ marginRight: 6 }}>To:</span> {formatFullTextTime(contract.endDate)}
                </div>
              </div>
            </div>
          </Col>

          <Col span={4}>
            <Row justify='end' style={{ paddingRight: 10 }} align='middle'>
              <div className='avatars'>
                { _.map(users, (v, i) => (
                  <Avatar
                    key={v._id}
                    alt='avatar'
                    style={{ marginRight: 20 * i }}
                    src={url}
                  />
                )) }
              </div>
            </Row>
          </Col>
        </Row>
      </Card>
    </Col>
  )
}

ContractItem.propTypes = {
  contract: PropTypes.object,
  isCheck: PropTypes.bool,
  onClick: PropTypes.func,
}

ContractItem.defaultProps = {
  onClick: () => {},
}
