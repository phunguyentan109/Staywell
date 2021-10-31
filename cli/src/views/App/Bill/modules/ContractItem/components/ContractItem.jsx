import React, { useMemo } from 'react'
import { Avatar, Progress, Card, Col, Row } from 'antd'
import PropTypes from 'prop-types'
import _ from 'lodash'
import '../_styles.scss'
import { BarcodeOutlined, HomeOutlined, RollbackOutlined, SnippetsOutlined } from '@ant-design/icons'
import Checkbox from '../../../../Contract/modules/Checkbox'

const url = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRXgqlxGKd86XJmf_lWmV19p1vHVVAjRK6I5U0bY3TqeJoejrUV-M-8qBpdLp9ivVy7fy4&usqp=CAU'

export default function ContractItem({ contract, isCheck, goBack, onClick }) {
  const users = useMemo(() => {
    return _.get(contract, 'room_id.user_id', [])
  }, [contract])

  return (
    <Card className={`gx-card bill-contract-item ${isCheck ? 'select' : ''}`}>
      <Row align='middle' justify='space-between' wrap={false}>
        <Col span={20}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <div className='btn-back-wrapper' style={{ marginRight: 30 }} onClick={goBack}>
              {/*<Checkbox value={contract._id} onClick={onClick} checked={isCheck} />*/}
              <RollbackOutlined />
              {/*<i className='fas fa-arrow-left back-btn' />*/}
            </div>

            <div>
              <div className='first-line'>
                {/*<div className='contract-progress'>*/}
                {/*<Col span={8}>*/}
                {/*<div className='progress-icon'>*/}
                {/*  <Badge dot={contract.notify}>*/}
                {/*    <i className='icon icon-chart-pie'/>*/}
                {/*  </Badge>*/}
                {/*</div>*/}
                {/*<i className='fas fa-calendar' style={{ fontSize: '12px', marginRight: 5 }}/>*/}
                <div style={{ display: 'flex', color: 'gray', whiteSpace: 'nowrap', fontSize: '14px' }}>
                  <div className='contract-id' style={{ display: 'flex', alignItems: 'center' }}>
                    {/*<BarcodeOutlined style={{ fontSize: 14, marginRight: 8 }} />*/}
                    <SnippetsOutlined style={{ fontSize: 14, marginRight: 5 }} />
                    <div style={{ fontSize: 14, height: 14, marginRight: 0 }}>#25568f</div>
                    {/*<i className='fas fa-user' style={{ fontSize: '12px' }}/>*/}
                    {/*<HomeOutlined style={{ fontSize: 14, marginRight: 8 }} />*/}
                    {/*<div style={{ fontSize: 14, height: 14, color: 'black' }}>Room A</div>*/}
                  </div>

                  <div style={{ margin: '0 10px 0 7px', color: 'gray' }}> - </div>

                  <div className='gx-badge gx-text-white price-badge' style={{ marginBottom: 0 }}>
                    <i className='fas fa-dollar-sign' style={{ fontSize: '10px' }}/>
                    <span style={{ fontSize: 12, marginLeft: 5 }}>Price A</span>
                  </div>
                </div>

                {/*<span style={{ color: 'gray', whiteSpace: 'nowrap', fontSize: '14px', width: '100px' }}>*/}
                {/*</span>*/}

                {/*<span className='gx-toolbar-separator' style={{ marginRight: 0 }}>&nbsp;</span>*/}


                {/*<div>*/}
                {/*  <span className='gx-sender-name'>From:</span> {contract.info.from}*/}
                {/*</div>*/}
                {/*<span className='gx-toolbar-separator'>&nbsp;</span>*/}
                {/*</Col>*/}

                {/*</div>*/}
                {/*<Col span={12}>*/}
                <div className='progress-b'>
                  <Progress
                    percent={contract.current / contract.duration * 100}
                    showInfo={false}
                    strokeColor='#87d068'
                    strokeWidth={5}
                    status='active'
                  />
                </div>
                {/*</Col>*/}

                <span>{contract.current}/{contract.duration} month(s)</span>


                {/*<span style={{ color: 'gray', whiteSpace: 'nowrap', fontSize: '14px' }}>*/}
                {/*  <i className='fas fa-user' style={{ fontSize: '12px' }}/> 2 people*/}
                {/*</span>*/}


                {/*<span>{contract.current}/{contract.duration} month(s)</span>*/}
              </div>

              <div style={{ display: 'flex', alignItems: 'center' }}>
                {/*<div style={{ display: 'flex', alignItems: 'center' }}>*/}

                {/*<HomeOutlined style={{ fontSize: 14, marginRight: 8 }} />*/}
                {/*<div style={{ fontSize: 14, height: 14 }}>Room A</div>*/}
                {/*</div>*/}
                <span className='gx-sender-name' style={{ marginRight: 6 }}>Place:</span> Room A
                <span className='gx-toolbar-separator'>&nbsp;</span>
                <span className='gx-sender-name' style={{ marginRight: 6 }}>From:</span> {contract.info.from}
                <span className='gx-toolbar-separator'>&nbsp;</span>
                <span className='gx-sender-name' style={{ marginRight: 6 }}>To:</span> {contract.info.to}
              </div>
            </div>
          </div>
        </Col>
        {/*<Col span={6}>*/}
        {/*<Row justify='space-between' align='middle' onClick={onClick}>*/}
        {/*<div className='contract-info' onClick={onClick}>*/}
        {/*<Col span={18}>*/}
        {/*<Row gutter={[8, 8]} align='middle' wrap={false}>*/}
        {/*<div className='contract-progress'>*/}
        {/*<Col span={1}>*/}
        {/*  <div className='progress-icon'>*/}
        {/*    <Badge dot={contract.notify}>*/}
        {/*      <i className='icon icon-chart-pie'/>*/}
        {/*    </Badge>*/}
        {/*  </div>*/}
        {/*</Col>*/}
        {/*<Col span={16}>*/}
        {/*  <div className='progress-b'>*/}
        {/*    <Progress*/}
        {/*      percent={contract.current / contract.duration * 100}*/}
        {/*      showInfo={false}*/}
        {/*      strokeColor='#87d068'*/}
        {/*      strokeWidth={5}*/}
        {/*      status='active'*/}
        {/*    />*/}
        {/*  </div>*/}
        {/*</Col>*/}
        {/*<Col span={6}>{contract.duration} month(s)</Col>*/}

        {/*</Row>*/}
        {/*  <span className='gx-sender-name'>From:</span> {contract.info.from}*/}
        {/*  <span className='gx-toolbar-separator'>&nbsp;</span>*/}
        {/*  <span className='gx-sender-name'>To:</span> {contract.info.to}*/}
        {/*</Col>*/}
        <Col span={4}>
          <Row justify='end' style={{ paddingRight: 10 }} align='middle'>
            {/*<Col span={10}>*/}
            <div className='avatars'>
              { _.map(users, (v, i) => (
                <Avatar
                  key={v._id}
                  alt='avatar'
                  style={{ marginRight: 20 * i }}
                  // src={_.get(v, 'avatar.link', '')}
                  src={url}
                />
              )) }
            </div>
            {/*</Col>*/}
            {/*</Row>*/}
            {/*</Col>*/}
          </Row>
        </Col>
      </Row>
    </Card>
  )
}

ContractItem.propTypes = {
  goBack: PropTypes.func,
  contract: PropTypes.object,
  isCheck: PropTypes.bool,
  onClick: PropTypes.func,
}

ContractItem.defaultProps = {
  onClick: () => {},
}
