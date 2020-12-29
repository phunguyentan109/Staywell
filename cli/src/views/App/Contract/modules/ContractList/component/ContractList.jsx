import React from 'react'
import PropTypes from 'prop-types'
import { Card, Col, Row } from 'antd'
import ContractItem from '../../ContractItem'
import _ from 'lodash'
import BillItem from '../../BillItem'

function ContractList(props) {
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
    </>
  )
}

ContractList.propTypes = {

}

export default ContractList
