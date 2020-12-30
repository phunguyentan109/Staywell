import React, { useMemo } from 'react'
import PropTypes from 'prop-types'
import { Card, Col, Row } from 'antd'
import ContractItem from '../../ContractItem'
import _ from 'lodash'
import BillItem from '../../BillItem'

function ContractList({ contracts, contractId, hdSelectContract, bills, roomId }) {
  const nextGenerateAllowId = useMemo(() => {
    if (!!bills.length) {
      let nextGenerateBill = _.find(bills, b => !b.electric)
      return nextGenerateBill._id
    }
  }, [bills])

  return (
    <>
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
          !!contractId || contracts.map(c => <ContractItem
            key={c._id}
            roomId={roomId}
            contract={c}
            onClick={hdSelectContract(c._id)}
          />)
        }
        {
          !!contractId && (
            <>
              <Col span={24}>
                <Card className='gx-card back-bar'>
                  <i
                    className='fas fa-arrow-left action back-contract'
                    onClick={() => hdSelectContract(null)}
                  />
                  <span className='gx-toolbar-separator'>&nbsp;</span>
                  <span>
                    Contract #{contractId.substring(contractId.length - 4, contractId.length)}
                  </span>
                </Card>
              </Col>
              {
                _.map(bills, bill => (
                  <Col span={8} key={bill._id}>
                    <BillItem
                      bill={bill}
                      // apiParams={ids}
                      // onAfterUpdate={hdUpdateBill}
                      // lastNumber={lastElectric}
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
    </>
  )
}

ContractList.propTypes = {
  contractId: PropTypes.string,
  roomId: PropTypes.string,
  hdSelectContract: PropTypes.func,
  contracts: PropTypes.array,
  bills: PropTypes.array,
}

export default ContractList
