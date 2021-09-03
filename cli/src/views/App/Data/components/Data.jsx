import React, { memo } from 'react'
import { Upload, Table, Card } from 'antd'
import { InboxOutlined } from '@ant-design/icons'
import PropTypes from 'prop-types'
import UpdateAction from 'components/UpdateAction'
import { DATA_COLS, BILL_COLS } from '../const'

const { Dragger } = Upload

function Data({ onChange, rowData }) {
  const expandedRowRender = (data) => {
    return (
      <Table
        className='gx-table-responsive'
        columns={BILL_COLS}
        rowKey='_key'
        dataSource={data.bills}
        pagination={false} 
      />
    )
  }

  return (
    <>
      {
        rowData.length > 0 ? (
          <>
            {/* <Divider/> */}
            <Card className='gx-card' title='List of modify data'>
              <Table
                className='gx-table-responsive'
                columns={DATA_COLS}
                rowKey='_id'
                dataSource={rowData}
                expandable={{ expandedRowRender }}
              />
            </Card>
            <UpdateAction/>
          </>
        ) : <Dragger onChange={onChange} showUploadList={false}>
          <p className='ant-upload-drag-icon'>
            <InboxOutlined />
          </p>
          <p className='ant-upload-text'>Click or drag file to this area to upload</p>
          <p className='ant-upload-hint'>
          Support a excel file include format .xlsx, .xls, .csv
          </p>
        </Dragger>
      }
    </>
  )
}

export default memo(Data)

Data.propTypes = {
  onChange: PropTypes.func,
  rowData: PropTypes.array
}