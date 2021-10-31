import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import { STATUS_FILTERS } from '../const'
import { Card } from 'antd'
import ContractForm from '../ContractForm'
import { TagOutlined, TagsFilled } from '@ant-design/icons'
import './_styles.scss'

function Filter({ onFilter }) {
  const [filter, setFilter] = useState({
    status: null,
    createdAt: 'all'
  })

  useEffect(() => {
    onFilter(filter)
  }, [filter, onFilter])

  const hdFilter = (key, value) => () => {
    setFilter(prev => ({ ...prev, [key]: value }))
  }

  return (
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
              <li onClick={hdFilter('status', r.value)} key={r.value}>
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
  )
}

Filter.propTypes = {
  onFilter: PropTypes.func,
}

export default Filter
