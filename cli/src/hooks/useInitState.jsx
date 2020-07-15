import { useState } from 'react'
import _ from 'lodash'

export default function useInitState(state) {
  const [current, setCurrent] = useState(state)
  const clr = (...keys) => {
    if (_.isObject(state) && keys.length > 0) {
      let clrData = _.reduce(keys, (a, n) => {
        _.set(a, n, _.get(state, n))
        return a
      }, {})
      return setCurrent(prev => _.merge({}, prev, clrData))
    }
    setCurrent(state)
  }
  return [current, setCurrent, clr]
}
