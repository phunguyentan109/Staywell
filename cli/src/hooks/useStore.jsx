import { useCallback, useState } from 'react'
import _ from 'lodash'

export default function useStore (_state) {
  const [state, setState] = useState(_state)

  const repState = useCallback((newState) => {
    return setState(prev => ({ ...prev, ...newState }))
  }, [])

  return !_.isObject(_state) ? [state, setState] : [state, repState, setState]
}
