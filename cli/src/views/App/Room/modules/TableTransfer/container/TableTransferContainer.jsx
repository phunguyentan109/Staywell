import React, { useEffect } from 'react'
import TableTransfer from '../components/TableTransfer'
import { PropTypes } from 'victory'

function TableTransferContainer ({ people, ...props }) {
  useEffect(() => {
    load()
    setCheckedIn(people.map(u => u._id))
  }, [load, people])

  return (
    <TableTransfer {...props} />
  )
}

TableTransferContainer.propTypes = {
  people: PropTypes.array
}

export default TableTransferContainer
