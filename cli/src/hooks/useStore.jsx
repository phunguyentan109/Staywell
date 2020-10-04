import { useCallback, useState } from 'react'
import _ from 'lodash'

export default function useStore (_state) {
  const [state, setState] = useState(_state)

  const repState = useCallback((newState) => {
    return setState(prev => ({ ...prev, ...newState }))
  }, [])

  const resetState = useCallback((keys) => {
    if (!_.isObject(_state) && keys) {
      return console.error('Warning: Please only pass keys to resetState when state value is in object type')
    } else if (_.isArray(keys) && !_.isEmpty(keys)) {
      let clrData = _.reduce(keys, (a, n) => {
        _.set(a, n, _.get(_state, n))
        return a
      }, {})
      return setState(prev => ({ ...prev, ...clrData }))
    }
    setState(_state)
  }, [_state])

  return !_.isObject(_state) ? [state, setState, resetState] : [state, repState, setState, resetState]
}