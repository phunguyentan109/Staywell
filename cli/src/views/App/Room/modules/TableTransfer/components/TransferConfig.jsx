import React from 'react'
import PropTypes from 'prop-types'
import { Transfer, Table } from 'antd'
import _ from 'lodash'

export default function TransferConfig ({ leftTableColumns, rightTableColumns, ...restProps }) {
  return (
    <Transfer {...restProps} showSelectAll>
      {({
        direction,
        filteredItems,
        onItemSelectAll,
        onItemSelect,
        selectedKeys: listSelectedKeys,
        disabled: listDisabled,
      }) => {
        const columns = direction === 'left' ? leftTableColumns : rightTableColumns

        const rowSelection = {
          getCheckboxProps: item => ({ disabled: listDisabled || item.disabled }),
          onSelectAll(selected, selectedRows) {
            const treeSelectedKeys = selectedRows
              .filter(item => !item.disabled)
              .map(({ key }) => key)
            const diffKeys = selected
              ? _.difference(treeSelectedKeys, listSelectedKeys)
              : _.difference(listSelectedKeys, treeSelectedKeys)
            onItemSelectAll(diffKeys, selected)
          },
          onSelect({ key }, selected) {
            onItemSelect(key, selected)
          },
          selectedRowKeys: listSelectedKeys,
        }

        return (
          <Table
            rowKey='_id'
            rowSelection={rowSelection}
            columns={columns}
            dataSource={filteredItems}
            style={{ pointerEvents: listDisabled ? 'none' : null }}
            onRow={rec => ({
              onClick: () => {
                onItemSelect(rec._id, !listSelectedKeys.includes(rec._id))
              }
            })}
          />
        )
      }}
    </Transfer>
  )
}

TransferConfig.propTypes = {
  leftTableColumns: PropTypes.array.isRequired,
  rightTableColumns: PropTypes.array.isRequired
}
