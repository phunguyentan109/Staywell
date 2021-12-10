import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Card, Col, Divider, Input, Row } from 'antd'
// import ContractRooms from 'views/App/Contract/modules/ContractRooms'
import _ from 'lodash'
import { FILTERS } from 'views/App/Contract/const'
// import BillList from '../../Contract/modules/BillList'
import './_style.scss'
import ContractItem from './modules/ContractItem'
import { billListSample, contractSample } from './const'
import BillItem from './modules/BillItem'
import ContractAction from './modules/ContractAction'

function Bill(props) {
  const [roomId, setRoomId] = useState(null)

  const goBack = () => {
    props.history.push('/app/contracts')
  }

  return (
    <div className='manage-bill'>
      <Row>
        <Col span={5}>
          <Card className='gx-card bill-sidebar'>
            <div className='gx-module-side-header'>
              <div>Filter options</div>
            </div>
            <ContractAction
              onPostCreate={setRoomId}
              roomId={roomId}
              tgProps={{ disabled: !!roomId }}
            />
            <ul className='gx-module-nav'>
              {/*<ContractRooms onSelectRoom={setRoomId} />*/}
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
          <ContractItem
            goBack={goBack}
            roomId={roomId}
            contract={contractSample}
          />
          <div style={{ width: '100%', display: 'flex', alignItems: 'center', margin: '30px 0 20px' }}>
            <div style={{ whiteSpace: 'nowrap' }}>5 bills contained in this contract</div>
            <Divider style={{ flexGrow: 2, minWidth: 'unset', margin: '0 10px' }}/>
            <div style={{ whiteSpace: 'nowrap', marginRight: 10 }}>Quick lookup:</div>
            <Input placeholder='Type something here...' style={{ width: 300 }} />
          </div>

          {
            billListSample.map((b, i) => (
              <BillItem item={b} prevItem={billListSample[i-1]} key={b.id} />
            ))
          }
        </Col>
      </Row>
    </div>
  )
}

Bill.propTypes = {
  history: PropTypes.object,
}


export default Bill
