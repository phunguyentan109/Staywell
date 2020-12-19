import React, { useMemo } from 'react'
import PropTypes from 'prop-types'
import { Card, Row, Col } from 'antd'
import _ from 'lodash'

// Modules
import ContractForm from '../modules/ContractForm'
import ContractItem from '../modules/ContractItem'
import BillItem from '../modules/BillItem'
import ContractRooms from '../modules/ContractRooms'
import { FILTERS } from '../modules/const'

export default function Contract({ contracts, bills, selectContract, selectRoom, lastElectric, hdUpdateBill, ids, repIds }) {
  const nextGenerateAllowId = useMemo(() => {
    if (!!bills.length) {
      let nextGenerateBill = _.find(bills, b => !b.electric)
      return nextGenerateBill._id
    }
  }, [bills])

  return (
    <div className='manage-contract'>
      <Row>
        <Col span={5}>
          <Card className='gx-card contract-sidebar'>
            <div className='gx-module-side-header'>
              <div className='gx-module-logo'>
                <i className='icon icon-wysiwyg gx-mr-3'/>
                <span>Contract Options</span>
              </div>
            </div>
            <ContractForm
              onPostCreate={selectContract}
              roomId={ids.room_id}
              tgProps={{ disabled: !!ids.roomId }}
            />
            <ul className='gx-module-nav'>
              <ContractRooms onSelectRoom={selectRoom} />
              <div className='section-wrapper'>
                <div>Status Filters</div>
                {
                  _.map(FILTERS, (f, i) => (
                    <li onClick={() => {}} key={i}>
                      <span className='gx-link'>
                        <i className='icon icon-chart-pie'/>
                        <span>{f}</span>
                      </span>
                    </li>
                  ))
                }
              </div>
            </ul>
          </Card>
        </Col>
        <Col span={19}>
          <Card className='gx-card action-bar'>
            <i className='far fa-square action check-box'/>
            <span className='gx-toolbar-separator'>&nbsp;</span>
            <div className='action reload'>
              <i className='fas fa-sync-alt'/>&nbsp;Refresh
            </div>
            <div className='action remove'>
              <i className='fas fa-trash'/>&nbsp;Remove
            </div>
          </Card>
          <Row>
            {
              !!ids.contract_id || contracts.map(c => <ContractItem
                key={c._id}
                roomId={ids.room_id}
                contract={c}
                onClick={selectContract(c._id)}
              />)
            }
            {
              !!ids.contract_id && (
                <>
                  <Col span={24}>
                    <Card className='gx-card back-bar'>
                      <i
                        className='fas fa-arrow-left action back-contract'
                        onClick={() => repIds({ contract_id: null })}
                      />
                      <span className='gx-toolbar-separator'>&nbsp;</span>
                      <span>
                        Contract #{ids.contract_id.substring(ids.contract_id.length - 4, ids.contract_id.length)}
                      </span>
                    </Card>
                  </Col>
                  {
                    _.map(bills, bill => (
                      <Col span={8} key={bill._id}>
                        <BillItem
                          bill={bill}
                          apiParams={ids}
                          onAfterUpdate={hdUpdateBill}
                          lastNumber={lastElectric}
                          allowGenerate={nextGenerateAllowId === bill._id}
                          allowPayment={bill.electric && !bill.paidDate}
                        />
                      </Col>
                    ))
                  }
                </>
              )
            }
          </Row>
        </Col>
      </Row>
    </div>
  )
}

Contract.propTypes = {
  bills: PropTypes.array,
  contracts: PropTypes.array,
  repIds: PropTypes.func,
  selectRoom: PropTypes.func,
  lastElectric: PropTypes.number,
  ids: PropTypes.object,
  selectContract: PropTypes.func,
  clearIds: PropTypes.func,
  hdUpdateBill: PropTypes.func,
}
