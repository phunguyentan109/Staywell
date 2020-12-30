import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Card, Row, Col } from 'antd'
import _ from 'lodash'

// Modules
import ContractForm from '../modules/ContractForm'
import ContractList from '../modules/ContractList'
import ContractRooms from '../modules/ContractRooms'
import { FILTERS } from '../modules/const'

export default function Contract() {
  const [roomId, setRoomId] = useState(null)

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
              onPostCreate={setRoomId}
              roomId={roomId}
              tgProps={{ disabled: !!roomId }}
            />
            <ul className='gx-module-nav'>
              <ContractRooms onSelectRoom={setRoomId} />
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
          <ContractList roomId={roomId} />
        </Col>
      </Row>
    </div>
  )
}

Contract.propTypes = {
  bills: PropTypes.array,
  selectRoom: PropTypes.func,
  selectContract: PropTypes.func,
}
