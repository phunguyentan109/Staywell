import React, { useCallback, useState } from 'react'
import TableTransfer from '../components/TableTransfer'
import PropTypes from 'prop-types'
import { offLoading, onLoading } from 'constants/func'
import { roomApi, call, userApi } from 'constants/api'

function TableTransferContainer (props) {
  const { room } = props
  const [avails, setAvails] = useState([])

  const getAvailable = useCallback(async() => {
    onLoading()
    let rs = await call(...userApi.available())
    if (rs.status === 200) setAvails(rs.data)
    offLoading()
  }, [])

  const hdAssign = useCallback(async(data) => {
    return await call(...roomApi.assign(room._id), data)
  }, [room._id])

  return (
    <TableTransfer
      {...props}
      getAvailable={getAvailable}
      avails={avails}
      hdAssign={hdAssign}
    />
  )
}

TableTransferContainer.propTypes = {
  room: PropTypes.object
}

export default TableTransferContainer
