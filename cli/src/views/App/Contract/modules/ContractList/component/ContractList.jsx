import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Card, Col, Row } from 'antd'
import ContractItem from '../modules/ContractItem'
import BillList from '../../BillList'

function ContractList({ contracts, roomId }) {
  const [contractId, setContractId] = useState(null)

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
            onClick={() => setContractId(c._id)}
          />)
        }
        {
          contractId && (
            <>
              <Col span={24}>
                <Card className='gx-card back-bar'>
                  <i
                    className='fas fa-arrow-left action back-contract'
                    onClick={() => setContractId(null)}
                  />
                  <span className='gx-toolbar-separator'>&nbsp;</span>
                  <span>
                    Contract #{contractId.substring(contractId.length - 4, contractId.length)}
                  </span>
                </Card>
              </Col>
              <BillList contractId={contractId} roomId={roomId}/>
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
  contracts: PropTypes.array
}

export default ContractList
