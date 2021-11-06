import React, { useCallback, useEffect, useState } from 'react'
import Contract from '../components/Contract'
import { useList } from 'hooks'
import { offLoading, onLoading } from 'constants/func'
import { call, contractApi } from 'constants/api'
import PropTypes from 'prop-types'

function ContractContainer(props) {
  const [contracts, setContracts] = useList([])
  const [contractId, setContractId] = useState(null)
  const { roomId } = props

  const getContracts = useCallback(async() => {
    if (roomId) {
      onLoading()
      let rs = await call(...contractApi.get(roomId))
      if (rs.status === 200) {
        setContracts(rs.data)
        setContractId(null)
      }
      offLoading()
    }
  }, [roomId, setContracts])

  return <Contract contracts={contracts} />
}

ContractContainer.propTypes = {
  roomId: PropTypes.number,
}

export default ContractContainer
