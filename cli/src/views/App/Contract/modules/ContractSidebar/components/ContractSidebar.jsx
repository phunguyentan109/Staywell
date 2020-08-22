import React, { useState, useEffect, useCallback } from 'react'
import PropTypes from 'prop-types'
import { Drawer, Row, Col, Card, Layout } from 'antd'
import ContractNavs from '../modules/ContractNavs'
import {
//   ClearRefinements,
//   HierarchicalMenu,
  Panel,
//   RangeInput,
//   RatingMenu,
//   RefinementList,
} from 'react-instantsearch-dom'
import { apiRoom } from 'constants/api'
const { Sider } = Layout

export default function ContractSidebar({ children, loading, ...props }) {
  const [rooms, setRooms] = useState([])

  const init = useCallback(async() => {
    let rooms = await apiRoom.get()
    setRooms(rooms)
    loading(false)
  }, [loading])

  useEffect(() => { init() }, [init])

  // return (
  //   <>
  //     <div className='gx-d-block gx-d-lg-none'>
  //       <Drawer
  //         placement='left'
  //         closable={false}
  //         visible={false}
  //         onClose={() => {}}
  //       >
  //         <ContractNavs rooms={rooms} {...props}>
  //           { children }
  //         </ContractNavs>
  //       </Drawer>
  //     </div>
  //     <div className='gx-module-sidenav gx-d-none gx-d-lg-flex'>
  //       <ContractNavs rooms={rooms} {...props}>
  //         { children }
  //       </ContractNavs>
  //     </div>
  //   </>
  // )

  return (
    <Row>
      <Col md={5}>
        <Card className='gx-card' title='Contract Options'>
          {/*<Sider className='gx-algolia-sidebar'>*/}
          {/*  <div className='gx-algolia-sidebar-content'>*/}
          {/*<ClearRefinements*/}
          {/*  translations={{*/}
          {/*    reset: 'Clear all filters',*/}
          {/*  }}*/}
          {/*/>*/}

          {/*<div className='gx-algolia-category-item'>*/}
          {/*  <div className='gx-algolia-category-title'>Show results for</div>*/}
          {/*  <HierarchicalMenu*/}
          {/*    attributes={['category', 'sub_category', 'sub_sub_category']}*/}
          {/*  />*/}
          {/*</div>*/}

          {/* <div className='gx-algolia-category-item'> */}
            {/* <div className='gx-algolia-category-title'>Active Rooms</div> */}
            <ContractNavs rooms={rooms} {...props}/>
            {/*{ children }*/}

            {/*<Panel header={<span>Type</span>}>*/}
            {/*  <RefinementList className='gx-algolia-refinementList' attribute='type' operator='or' limit={5} searchable/>*/}
            {/*</Panel>*/}

            {/*<Panel header={<span>Materials</span>}>*/}
            {/*  <RefinementList className='gx-algolia-refinementList'*/}
            {/*    attribute='materials'*/}
            {/*    operator='or'*/}
            {/*    limit={5}*/}
            {/*    searchable*/}
            {/*  />*/}
            {/*</Panel>*/}

            {/*<Panel header={<span>Rooms</span>}>*/}
            {/*  /!*<RatingMenu className='gx-algolia-refinementList' attribute='rating' max={5}/>*!/*/}
            {/*</Panel>*/}
          {/* </div> */}
          {/*</div>*/}
          {/*</Sider>*/}
        </Card>
      </Col>
    </Row>

  )
}

ContractSidebar.propTypes = {
  children: PropTypes.any,
  loading: PropTypes.func
}

ContractSidebar.defaultProps = {
  loading: () => {}
}
