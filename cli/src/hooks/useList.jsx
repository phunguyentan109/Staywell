import { useCallback, useState } from 'react'
import _ from 'lodash'

export default function useList (_list = [], isObjectItem = false, identKey = '_id') {
  const [list, setList] = useState(_list)

  const updateList = useCallback((item, forRemoveMode = false) => {
    if (!item) return console.error('Error: Please pass an object to carry on create/update the current list state.')
    // If valid
    let newList = _.cloneDeep(list)
    if (forRemoveMode) {
      return setList(_.filter(newList, element => element[identKey] !== item[identKey]))
    } else {
      // For create/edit mode
      let foundIdx = _.findIndex(newList, element => _.isEqual(element[identKey], item[identKey]))
      if (foundIdx !== -1) {
        newList[foundIdx] = _.cloneDeep(item)
      } else {
        newList.push(_.cloneDeep(item))
      }
      return setList(newList)
    }
  }, [identKey, list])

  const resetList = useCallback(() => {
    setList(_list)
  }, [_list])

  return isObjectItem ? [list, setList, updateList, resetList] : [list, setList, resetList]
}
