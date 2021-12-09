import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Card, Col, Pagination, Row, Input, Select, Divider } from 'antd'
import ContractItem from '../ContractItem'
// import BillList from '../../BillList'
import _ from 'lodash'
import { samples20 } from './const'
import './_style.scss'
import Checkbox from '../Checkbox'

const Option = Select.Option

function ContractList({ contracts, roomId }) {
  const [contractIds, setContractIds] = useState([])
  const [perPage, setPerPage] = useState(5)

  const hdSelect = (checked, id) => {
    if (checked) return setContractIds(prev => [...prev, id])
    setContractIds(prev => prev.filter(v => v !== id))
  }

  const hdSelectAll = checked => {
    setContractIds(!checked ? [] : _.cloneDeep(samples20).splice(0, perPage).map(c => c._id))
  }

  return (
    <>
      <Card className='gx-card action-bar'>
        <Row justify='space-between' align='middle'>
          <Col span={18}>
            <div className='left-section'>
              <Checkbox onClick={hdSelectAll} exceedCheck={[contractIds.length, perPage]} />
              <span className='gx-toolbar-separator' style={{ margin: '0 20px 0 8px' }}>&nbsp;</span>
              {
                contractIds.length === 0 && (
                  <span className='empty-select'>No contract were selected.</span>
                )
              }
              {
                contractIds.length === 1 && (
                  <div className='view-detail-action'>
                    <i className='fas fa-file-signature mr-sm'/>
                    <span>More detail</span>
                  </div>
                )
              }
              {
                contractIds.length > 0 && (
                  <div className='remove-action'>
                    <i className='fas fa-trash mr-sm'/>
                    <span>Move to trash</span>
                  </div>
                )
              }
            </div>
          </Col>
          <Col span={6}>
            <Input placeholder='Quick lookup' style={{ border: 'none', backgroundColor: '#8080801a' }}/>
          </Col>
        </Row>
      </Card>

      <div style={{ width: '100%', display: 'flex', alignItems: 'center', marginBottom: 20 }}>
        <div style={{ whiteSpace: 'nowrap' }}>5 results loaded in 8ms</div>
        <Divider style={{ flexGrow: 2, minWidth: 'unset', margin: '0 10px' }}/>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div style={{ whiteSpace: 'nowrap' }}>Per page:</div>
          <Select value={perPage} style={{ width: 100, marginLeft: 10 }} onChange={v => setPerPage(v - 0)}>
            <Option value='5'>5</Option>
            <Option value='10'>10</Option>
          </Select>
        </div>
      </div>

      <Row gutter={[0, 20]}>
        {/*{*/}
        {/*  !!contractId || contracts.map(c => <ContractItem*/}
        {/*    key={c._id}*/}
        {/*    roomId={roomId}*/}
        {/*    contract={c}*/}
        {/*    onClick={() => setContractId(c._id)}*/}
        {/*  />)*/}
        {/*}*/}

        {
          _.cloneDeep(samples20).splice(0, perPage).map((c, i) => <ContractItem
            key={i}
            isCheck={contractIds.includes(c._id)}
            roomId={roomId}
            contract={c}
            onClick={hdSelect}
          />)
        }
        {/*{*/}
        {/*  contractIds.length > 0 && (*/}
        {/*    <>*/}
        {/*      <Col span={24}>*/}
        {/*        <Card className='gx-card back-bar'>*/}
        {/*          <i*/}
        {/*            className='fas fa-arrow-left action back-contract'*/}
        {/*            onClick={() => setContractIds(null)}*/}
        {/*          />*/}
        {/*          <span className='gx-toolbar-separator'>&nbsp;</span>*/}
        {/*          <span>Back to Contract's List</span>*/}
        {/*        </Card>*/}
        {/*      </Col>*/}
        {/*      <BillList contractId={contractIds} roomId={roomId}/>*/}
        {/*    </>*/}
        {/*  )*/}
        {/*}*/}
      </Row>
      <Row justify='center' style={{ marginTop: 40 }}>
        <Pagination defaultCurrent={1} total={50}/>
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
