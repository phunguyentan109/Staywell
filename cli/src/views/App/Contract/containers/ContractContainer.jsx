import React, { useCallback, useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import Contract from '../components/Contract'
import Loading from 'components/Loading'
import { apiContract } from '../../../../constants/api'

function ContractContainer(props) {
  const [lastElectric, setLastElectric] = useState(0)
  const loadRef = useRef({})

  const getLastElectric = useCallback(async() => {
    if (ids.contract_id) {
      let electric = await apiContract.getElectric(ids)
      setLastElectric(electricNumber)
    }
  }, [])

  useEffect(() => { getLastElectric() }, [getLastElectric])

  return (
    <Loading ref={loadRef}>
      <Contract
        {...props}
        lastElect={lastElectric}
      />
    </Loading>
  )
}

ContractContainer.propTypes = {

}

export default ContractContainer
