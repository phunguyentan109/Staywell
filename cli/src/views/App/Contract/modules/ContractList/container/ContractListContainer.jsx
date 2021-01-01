import React, { useCallback, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import ContractList from '../component/ContractList'
import { offLoading, onLoading } from 'constants/func'
import { call, contractApi } from 'constants/api'
import { useList } from 'hooks'

function ContractListContainer(props) {
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

  useEffect(() => { getContracts() }, [getContracts])

  return (
    <ContractList
      {...props}
      contracts={contracts}
      contractId={contractId}
    />
  )
}

ContractListContainer.propTypes = {
  roomId: PropTypes.string
}

export default ContractListContainer
