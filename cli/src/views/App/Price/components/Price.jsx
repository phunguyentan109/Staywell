import React, { memo } from 'react'
import { Card, Table, Divider, Button } from 'antd'
import PropTypes from 'prop-types'

import DeleteAction from 'components/DeleteAction'
import { PRICE_COLS } from '../modules/const'
import PriceForm from '../modules/PriceForm'

function Price({ listPrice, hdRemove, updateListPrice, priceApi }) {
  return (
    <Card className='gx-card' title='List of available price'>
      <PriceForm
        title={'Create price\'s information'}
        api={priceApi.create()}
        updateListPrice={updateListPrice}
      >
        <Button type='primary'>Add new price</Button>
      </PriceForm>
      <Table
        className='gx-table-responsive'
        dataSource={listPrice}
        rowKey='_id'
        columns={[
          ...PRICE_COLS,
          {
            title: 'Action',
            key: 'action',
            render: (_, record) => <>
              <DeleteAction onConfirm={hdRemove.bind(this, record._id)}/>
              <Divider type='vertical'/>
              <PriceForm
                value={record}
                title={'Edit price\'s information'}
                api={priceApi.update(record._id)}
                updateListPrice={updateListPrice}
              >
                <span className='gx-link'>Edit</span>
              </PriceForm>
            </>
          }
        ]}
      />
    </Card>
  )
}

export default memo(Price)

Price.propTypes = {
  listPrice: PropTypes.array, 
  updateListPrice: PropTypes.func, 
  hdRemove: PropTypes.func, 
  priceApi: PropTypes.object,
}