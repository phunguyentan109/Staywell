import React, { useCallback, useEffect, useMemo } from 'react'
import PropTypes from 'prop-types'
import { Badge, Card, Col, Divider, Progress, Row, Space, Table } from 'antd'
import { ClockCircleOutlined, RiseOutlined, FallOutlined } from '@ant-design/icons'
import { formatVND } from 'util/helper'
import _ from 'lodash'
import './_style.scss'
import { useToggle } from 'hooks'

function BillItem({ item, prevItem }) {
  const [pair, togglePair] = useToggle({ detail: false })

  useEffect(() => {
    if (item.status === 0) togglePair(['detail'])
  }, [item.status, togglePair])


  const getStateColor = state => {
    switch (state) {
      case 2:
        return '#b9b9b9'
      case 1:
        return '#f74b54'
      default:
        return '#358DD8FF'
    }
  }

  const hashing = useCallback(item => {
    if (!item) return {}
    return item.expenses.reduce((a, n) => {
      a[_.lowerCase(n.type)] = n.number
      return a
    }, {})
  }, [])

  const hashItem = useMemo(() => hashing(item), [hashing, item])
  const hashPrevItem = useMemo(() => hashing(prevItem), [hashing, prevItem])

  const calcUsed = useCallback((key) => {
    if (!hashItem[key]) return
    return hashItem[key] - (hashPrevItem[key] || 0)
  }, [hashItem, hashPrevItem])

  const billDetail = useMemo(() => {
    return item.expenses.map(v => {
      let amount = v.amount || calcUsed(_.lowerCase(v.type))
      return {
        ...v,
        amount,
        cost: amount * v.price
      }
    })
  }, [calcUsed, item.expenses])

  const summaryCost = useMemo(() => {
    if (billDetail.length === 0) return
    return _.sumBy(billDetail, v => v.cost)
  }, [billDetail])

  const summaryCostRow = useMemo(() => {
    if (billDetail.length === 0) return
    return { type: 'summary', cost: _.sumBy(billDetail, v => v.cost) }
  }, [billDetail])

  return (
    <Card className={`gx-card action-bar bill-item ${item.status === 0 ? 'processing' : ''}`}>
      <Row guttter={[16, 16]} justify='space-between' align='middle' wrap={false}>
        <Col span={18}>
          <div className='left-section'>
            <div
              className='gx-badge gx-text-white'
              style={{ marginBottom: 0, backgroundColor: getStateColor(item.status) }}
            >
              <span style={{ fontSize: 12 }}>{item.statusText}</span>
            </div>
            <span className='gx-toolbar-separator' style={{ margin: '0 20px 0 8px' }}>&nbsp;</span>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <span className='gx-sender-name' style={{ marginRight: 6 }}>Bill:</span>
              <span className='empty-select'>#22152</span>
              <span style={{ margin: '0 10px' }}> - </span>
              { item.status !== 3 && <ClockCircleOutlined style={{ fontSize: 16, marginRight: 10 }}/>}
              {/*{*/}
              {/*  item.status === 1 && (*/}
              {/*    <i className='far fa-calendar-times mr-sm' style={{ fontSize: 16, color: '#f5222d99' }}/>*/}
              {/*  )*/}
              {/*}*/}

              {/*{*/}
              {/*  item.progress === 100 || (*/}
              <div className='progress-b' style={{ width: 200, margin: '0 20px 0 0' }}>
                <Progress
                  percent={item.progress}
                  showInfo={false}
                  strokeColor='#87d068'
                  strokeWidth={5}
                  status={item.status === 'Processing...' ? 'active' : 'success'}
                  style={{ marginBottom: 0 }}
                />
              </div>
              {/*)*/}
              {/*}*/}

              <span className='gx-sender-name' style={{ marginRight: 6 }}>Deadline:</span> 30/12/2020
            </div>
          </div>
        </Col>

        <Col span={6} style={{ alignSelf: 'flex-end' }}>
          <div className='gx-link' style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
            {/*Hide detail*/}
            {/*<span className='mr-xs'>Summary:</span>*/}
            {/*<span className='gx-badge gx-text-white total-payment'>{formatVND(summaryCost)}</span>*/}
            {/*<span className='gx-toolbar-separator' style={{ margin: '0 8px 0 8px' }}>&nbsp;</span>*/}
            {/*{*/}
            {/*  pair.detail && (*/}
            {/*    <>*/}
            {/*      <span style={{ color: 'gray' }} onClick={() => togglePair()}>Hide</span>*/}
            {/*      <i className='fas fa-angle-double-up ml-sm' style={{ color: 'gray' }}/>*/}
            {/*    </>*/}
            {/*  )*/}
            {/*}*/}
            {/*{*/}
            {/*  !pair.detail && (*/}
            {/*    <>*/}
            <span>Mail this bill</span>
            {/*<i className='far fa-envelope ml-sm' style={{ fontSize: '16px' }}/>*/}
            <i className='fas fa-envelope-open-text ml-sm' style={{ fontSize: '16px' }}/>
            {/*    </>*/}
            {/*  )*/}
            {/*}*/}
            <span className='gx-toolbar-separator' style={{ margin: '0 8px 0 8px' }}>&nbsp;</span>
            <span>More</span>
            <i className='fas fa-ellipsis-h ml-sm'/>
            {/*<i className='fas fa-angle-down ml-sm' />*/}
          </div>
        </Col>
      </Row>
      <Row guttter={[16, 16]}>
        <Col span={24}>
          <Divider style={{ marginTop: 15, marginBottom: 3 }}/>
        </Col>
        {/*{ pair.detail && (*/}
        <Col span={24}>
          <div className={`detail-wrapper ${!pair.detail ? 'hide' : ''}`}>
            <Table
              showHeader={false}
              rowKey='type'
              dataSource={[summaryCostRow, ...billDetail]}
              pagination={false}
              size='middle'
              columns={[
                {
                  dataIndex: 'type',
                  width: 250,
                  render: v => {
                    if (v !== 'summary') return v
                    // if (pair.detail) return <span className='gx-link' onClick={() => togglePair()}>
                    //   <i className='fas fa-angle-double-up'/> Hide detail
                    // </span>
                    return <span className='gx-link' style={{ color:'gray' }} onClick={() => togglePair()}>
                      {/*<i className='fas fa-angle-double-down'/> View detail*/}
                      Summary
                    </span>
                  }
                },
                {
                  dataIndex: 'amount',
                  render: (v, r) => {
                    if (r.type === 'summary') return <span className='gx-sender-name' style={{ color: '#038fde' }}>Total Payment</span>
                    return (<div style={{ display: 'flex', alignItems: 'center' }}>
                      <div className='gx-sender-name' style={{ marginRight: 10 }}>Amount:</div>
                      <div>{v}</div>
                      <div style={{ marginLeft: 5 }}>({r.unit})</div>
                      {r.compareLastBill > 0 && (
                        (<>
                          <span className='gx-toolbar-separator' style={{ marginLeft: 14, marginRight: 0 }}>&nbsp;</span>
                          <div className='text-danger' style={{ marginLeft: 8 }}>+{r.compareLastBill} ({r.unit})</div>
                          <RiseOutlined style={{ marginLeft: 5, height: 17, color: 'red' }}/>
                        </>)
                      )}
                      {r.compareLastBill < 0 && (
                        (<>
                          <span className='gx-toolbar-separator' style={{ marginLeft: 14, marginRight: 0 }}>&nbsp;</span>
                          <div className='text-success' style={{ marginLeft: 8 }}>{r.compareLastBill} ({r.unit})</div>
                          <FallOutlined style={{ marginLeft: 5, height: 17, color: '#28a745' }}/>
                        </>)
                      )}
                    </div>)
                  },
                },
                {
                  dataIndex: 'cost',
                  render: (v, r) => r.type !== 'summary' ? <>
                    <span className='gx-sender-name' style={{ marginRight: 10 }}>Cost:</span>
                    {formatVND(v)}
                    <Badge status={r.rate || 'default'} style={{ marginLeft: 10 }}/>
                  </> : <>
                    {/*<span className='gx-sender-name' style={{ marginRight: 10 }}>Cost:</span>*/}
                    <span className='gx-link' style={{ fontWeight: '500' }}>{formatVND(v)}</span>
                  </>,
                },
                {
                  render: (v, r) =>
                    <Space align='center'>
                      {r.type !== 'summary' && item.status === 0 && <div className='gx-link'>Adjust</div>}
                      {/*<i className='fas fa-sort' style={{ color: '#038fdea3', fontSize: 16 }}/>*/}
                      {/*<ControlOutlined style={{ color: 'blue' }} />*/}
                    </Space>
                  ,
                },
              ]}
            />
            {pair.detail || <div className='expand-mask'/>}
          </div>
        </Col>
        {
          pair.detail && (
            <Col span={24} style={{ margin: '15px 0 10px', padding: '0 25px' }}>
              Payment for electric is moved to the next month, there is no charge for electric this month.
            </Col>
          )
        }
      </Row>
      <Col span={24}>
        <Divider style={{ marginTop: 20, marginBottom: 10 }}/>
      </Col>
      <Row justify='center'>
        <div className='gx-link' style={pair.detail ? { color: 'gray' } : {}} onClick={() => togglePair()}>
          {pair.detail || <>View full detail (2 more & comment) <i className='fas fa-angle-double-down ml-xs'/></>}
          {pair.detail && <>View less detail <i className='fas fa-angle-double-up ml-xs'/></>}
        </div>
      </Row>
    </Card>
  )
}

BillItem.propTypes = {
  item: PropTypes.object,
  prevItem: PropTypes.object
}

export default BillItem
