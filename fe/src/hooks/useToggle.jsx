import { useState, useCallback } from 'react'
import _ from 'lodash'

const INVALID_PARAMS = '(useToggle) Invalid toggleState params passed, it must be an array of string'
const NOT_EXIST = k => `(useToggle) There is no '${k}' exist in useToggle's state or you may have mistyped the name.`

export default function useToggle (pairs) {
  const [state, setState] = useState(pairs)

  const toggleState = useCallback((keys) => {
    if (keys && !_.isArray(keys)) {
      return console.error(INVALID_PARAMS, keys)
    } else if (!_.isEmpty(keys)) {
      return setState(prev => {
        return {
          ...prev,
          ..._.reduce(keys, (a, k) => {
            if (_.has(prev, k)) {
              a[k] = !prev[k]
            } else {
              console.error(NOT_EXIST(k))
            }
            return a
          }, {})
        }
      })
    }
    setState(prev => _.reduce(_.keys(prev), (a, k) => {
      if (_.has(prev, k)) a[k] = !prev[k]
      return a
    }, {}))
  }, [])

  return [state, toggleState, setState]
}