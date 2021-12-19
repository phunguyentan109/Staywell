import React, { memo } from 'react'
import { Button, Card, Divider, Spin, Table } from 'antd'
import PropTypes from 'prop-types'

import DeleteAction from 'components/DeleteAction'
import PriceForm from './modules/PriceForm'
import { useFetch } from 'hooks'
import { priceApi } from 'constants/api'
import { PlusOutlined } from '@ant-design/icons'

function Price() {
  const { data: price, isFetching, isMutating, mutate } = useFetch(priceApi.get(), {
    remove: {
      exec: id => priceApi.remove(id),
      successMsg: 'Price is removed successfully!'
    },
    add: {
      exec: data => priceApi.add(data),
      successMsg: 'Add new price successfully!'
    },
    update: {
      exec: (id, data) => priceApi.update(id, data),
      successMsg: 'Update price information successfully!'
    }
  })

  return (
    <Spin spinning={isFetching}>
      <Card className='gx-card' title='List of available price'>
        <PriceForm
          title='Add new price'
          onSubmit={form => mutate('add', form)}
          isProcessing={isMutating}
        >
          <Button type='primary' icon={<PlusOutlined />}>New Price</Button>
        </PriceForm>
        <Table
          className='gx-table-responsive'
          dataSource={price}
          rowKey='_id'
          columns={[
            {
              title: 'Price type',
              dataIndex: 'type',
            },
            {
              title: 'Electric',
              dataIndex: 'electric'
            },
            {
              title: 'Wifi',
              dataIndex: 'wifi',
            },
            {
              title: 'Water',
              dataIndex: 'water'
            },
            {
              title: 'Living',
              dataIndex: 'living'
            },
            {
              title: 'Action',
              dataIndex: '_id',
              key: 'action',
              render: (v, record) => <>
                <DeleteAction onConfirm={() => mutate('remove', v)}/>
                <Divider type='vertical'/>
                <PriceForm
                  value={record}
                  title={'Edit price\'s information'}
                  onSubmit={price => mutate('update', v, price)}
                >
                  <span className='gx-link'>Edit</span>
                </PriceForm>
              </>
            }
          ]}
        />
      </Card>
    </Spin>
  )
}

export default memo(Price)

Price.propTypes = {
  listPrice: PropTypes.array,
  updateListPrice: PropTypes.func,
  hdRemove: PropTypes.func
}
