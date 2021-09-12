import React, { memo } from 'react'
import { Upload, Table, Card } from 'antd'
import { InboxOutlined } from '@ant-design/icons'
import PropTypes from 'prop-types'
import UpdateAction from 'components/UpdateAction'
import '../_styles.scss'
import { DATA_COLS, BILL_COLS, PRICE_COLS } from '../const'

const { Dragger } = Upload

function Data({ onChange, rowData, clearImportData, price }) {
  const expandedRowRender = (data) => {
    return (
      <Table
        className='gx-table-responsive'
        columns={BILL_COLS}
        rowKey='_key'
        dataSource={data.bills}
        pagination={false}
        bordered
      />
    )
  }

  return (
    <>
      <h1 className='mb-lg'>Data Import</h1>
      {
        !rowData.length && (
          <div className='drag-drop-card'>
            <Card className='gx-card'>
              <Dragger onChange={onChange} showUploadList={false}>
                <p className='ant-upload-drag-icon'>
                  <InboxOutlined />
                </p>
                <p className='ant-upload-text'>Click or drag file to this area to upload</p>
                <p className='ant-upload-hint'>
              Support a excel file include format .xlsx, .xls, .csv
                </p>
              </Dragger>
            </Card>
          </div>
        )
      }
      {
        rowData.length > 0 && (
          <>
            <Card className='gx-card' title='Imported Price'>
              <Table
                className='gx-table-responsive'
                columns={PRICE_COLS}
                rowKey='type'
                dataSource={[price]}
                pagination={false}
              />
            </Card>
            <Card className='gx-card' title='Imported Contracts'>
              <Table
                className='gx-table-responsive'
                columns={DATA_COLS}
                rowKey='_id'
                dataSource={rowData}
                expandable={{ expandedRowRender }}
                pagination={false}
              />
            </Card>
            <div className='btn-import-action'>
              <UpdateAction
                buttonType='primary'
                onConfirm={() => console.log('update in database')}
              />
              <UpdateAction 
                title='Are you sure to remove ?'
                onConfirm={() => clearImportData()}
              >
                <span>Clear</span>
              </UpdateAction>
            </div>
          </>
        )
      }
    </>
  )
}

export default memo(Data)

Data.propTypes = {
  onChange: PropTypes.func,
  clearImportData: PropTypes.func,
  rowData: PropTypes.array,
  price: PropTypes.object
}