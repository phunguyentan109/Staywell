import React, { useCallback, useEffect, useMemo, useState } from 'react'
import PropTypes from 'prop-types'
import { Card, Row, Col, Input, Divider, Select, Pagination } from 'antd'
// import _ from 'lodash'
import './_style.scss'

// Modules
// import ContractList from '../modules/ContractList'
// import { samples20 } from './modules/ContractList/modules/const'
// import ContractForm from './modules/ContractForm'
// import ContractRooms from './modules/ContractRooms'
// import { FILTERS } from './modules/const'
// import Filter from './modules/Filter'
import Checkbox from './modules/Checkbox'
import ContractItem from './modules/ContractItem'
// import { fetchContracts } from './effect'
import { useFetch } from 'hooks'
import { contractApi } from 'constants/api'
import ContractForm from './modules/ContractForm'
import _ from 'lodash'
import { STATUS_FILTERS } from './const'
import { TagOutlined, TagsFilled } from '@ant-design/icons'

const { Option } = Select

function Contract(props) {
  const [filter, setFilter] = useState({
    query: {},
    paging: {
      from: 0,
      size: 8
    }
  })

  const { data: contracts = [], isFetching, isMutating, mutate } = useFetch(contractApi.get(filter), {
    remove: {
      exec: id => contractApi.remove(id),
      successMsg: 'Contract is removed successfully!'
    },
  })


  const [roomId, setRoomId] = useState(null)
  // const [contracts, setContracts] = useState([])
  const [contractIds, setContractIds] = useState([])
  // const [perPage, setPerPage] = useState(8)
  // const [page, setPage] = useState({
  //   from: 0,
  //   size: 8
  // })

  // const load = useCallback(async () => {
  //   let contracts = await fetchContracts({ filter: {}, paging: page })
  //   setContracts(contracts.sort((a, b) => a.isFullTime - b.isFullTime ))
  // }, [page])
  //
  // useEffect(() => { load() }, [load])

  const hdSelect = (checked, id) => {
    if (checked) return setContractIds(prev => [...prev, id])
    setContractIds(prev => prev.filter(v => v !== id))
  }

  const hdSelectAll = checked => {
    setContractIds(!checked ? [] : contracts.map(c => c._id))
  }

  const hdMoreDetail = () => {
    props.history.push(`/app/contracts/${contractIds[0]}`)
  }

  return (
    <div className='manage-contract'>
      <Row>
        <Col span={5}>
          {/*<Filter onFilter={console.log} />*/}
          <Card className='gx-card contract-sidebar'>
            <div className='gx-module-side-header'>
              <div className='gx-module-logo'>
                <span>Contract Options</span>
              </div>
            </div>
            <ContractForm
              // onPostCreate={setRoomId}
              // roomId={roomId}
              // tgProps={{ disabled: !!roomId }}
            />
            <ul className='gx-module-nav'>
              {/*<div className='section-wrapper'>*/}
              {/*  <div>Created Time</div>*/}
              {/*  {filter.createdAt === 'option' || <RangePicker format='DD/MM/YYYY'/>}*/}
              {/*  {*/}
              {/*    _.map(CREATION_FILTERS, (r, i) => (*/}
              {/*      <li onClick={hdFilter('createdAt', r.value)} key={r.value}>*/}
              {/*        <span className={filter.createdAt === r.value ? 'gx-link active' : 'gx-link'}>*/}
              {/*          {r.value === filter.createdAt ? <ClockCircleFilled style={{ fontSize: 16 }} /> : <ClockCircleOutlined />}*/}
              {/*          <span className='ml-sm'>{r.label}</span>*/}
              {/*        </span>*/}
              {/*      </li>*/}
              {/*    ))*/}
              {/*  }*/}
              {/*</div>*/}

              <div className='section-wrapper'>
                <div>By Status</div>
                {
                  _.map(STATUS_FILTERS, r => (
                    <li onClick={() => {}} key={r.value}>
                      <span className={filter.status === r.value ? 'gx-link active' : 'gx-link'}>
                        {r.value === filter.status ? <TagsFilled style={{ fontSize: 18 }} /> : <TagOutlined/>}
                        <span className='ml-sm'>{r.label}</span>
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
            <Row justify='space-between' align='middle'>
              <Col span={18}>
                <div className='left-section'>
                  <Checkbox onClick={hdSelectAll} exceedCheck={[contractIds.length, filter.paging.size]} />
                  <span className='gx-toolbar-separator' style={{ margin: '0 20px 0 8px' }}>&nbsp;</span>
                  {
                    contractIds.length === 0 && (
                      <span className='empty-select'>No contract were selected.</span>
                    )
                  }
                  {
                    contractIds.length === 1 && (
                      <div className='view-detail-action' onClick={hdMoreDetail}>
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
              <Select
                value={filter.paging.size}
                style={{ width: 100, marginLeft: 10 }}
                onChange={v => setFilter(prev => ({
                  ...prev,
                  paging: { ...prev.paging, size: v - 0 }
                }))}
              >
                <Option value='8'>8</Option>
                <Option value='16'>16</Option>
              </Select>
            </div>
          </div>

          <Row gutter={[0, 20]}>
            {
              contracts.map((c, i) => <ContractItem
                key={i}
                isCheck={contractIds.includes(c._id)}
                roomId={roomId}
                contract={c}
                onClick={hdSelect}
              />)
            }
          </Row>

          <Row justify='center' style={{ marginTop: 40 }}>
            <Pagination defaultCurrent={1} total={50}/>
          </Row>
        </Col>
      </Row>
    </div>
  )
}

Contract.propTypes = {
  bills: PropTypes.array,
  history: PropTypes.object,
  selectRoom: PropTypes.func,
  selectContract: PropTypes.func,
}

export default Contract
