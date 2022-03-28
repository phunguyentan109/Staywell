import React, { useCallback, useEffect } from 'react'
import { Button, Card, Divider, message, Table } from 'antd'
import PropTypes from 'prop-types'

import DeleteAction from 'components/DeleteAction'
import PriceForm from './components/PriceForm'
import { PlusOutlined } from '@ant-design/icons'
import { formatVND } from 'constants/func'
import { createPriceAction, editPriceAction, fetchPriceAction, removePriceAction } from './redux/action'
import { useDispatch, useSelector } from 'react-redux'
import { selectPrice } from './redux/selector'

export default function Price() {
  const { price, loading } = useSelector(selectPrice)

  const dp = useDispatch()

  const getPrice = useCallback(() => dp(fetchPriceAction()), [dp])

  useEffect(() => {
    getPrice()
  }, [getPrice])

  const removeRoom = roomId => {
    dp(removePriceAction(roomId, rs => {
      if (rs) message.success('Removing price successfully!')
      getPrice()
    }))
  }

  return (
    <>
      <Card className='gx-card' title='List of available price'>
        <PriceForm
          title='New price'
          onSubmitAction={createPriceAction}
          getPrice={getPrice}
        >
          <Button type='primary' icon={<PlusOutlined />}>New Price</Button>
        </PriceForm>

        <Table
          loading={loading}
          className='gx-table-responsive'
          dataSource={price}
          rowKey='_id'
          columns={[
            {
              title: 'Price Tags',
              dataIndex: 'type',
            },
            {
              title: 'Electric',
              dataIndex: 'electric',
              render: v => formatVND(v)
            },
            {
              title: 'Wifi',
              dataIndex: 'wifi',
              render: v => formatVND(v)
            },
            {
              title: 'Water',
              dataIndex: 'water',
              render: v => formatVND(v)
            },
            {
              title: 'Living',
              dataIndex: 'living',
              render: v => formatVND(v)
            },
            {
              title: 'Action',
              dataIndex: '_id',
              key: 'action',
              render: (v, record) => <>
                <DeleteAction onConfirm={() => removeRoom(v)}/>

                <Divider type='vertical'/>

                <PriceForm
                  value={record}
                  title='Edit price'
                  onSubmitAction={editPriceAction}
                  getPrice={getPrice}
                >
                  <span className='gx-link'>Edit</span>
                </PriceForm>
              </>
            }
          ]}
        />
      </Card>
    </>
  )
}

Price.propTypes = {
  price: PropTypes.object,
  updateListPrice: PropTypes.func,
  hdRemove: PropTypes.func
}
