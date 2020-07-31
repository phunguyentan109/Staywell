import { useState } from 'react'
import { cloneDeep } from 'lodash'

export default function useList(_list, compareKey = '_id') {
  const [list, setList] = useState(_list)

  function updateList(element) {
    let newList = cloneDeep(list)
    let foundIdx = newList.findIndex(price => price[compareKey] === element[compareKey])
    if (foundIdx !== -1) {
      newList[foundIdx] = cloneDeep(element)
      return setList(newList)
    }
    return setList(prev => [...prev, element])
  }

  function clearList () {
    setList(_list)
  }

  return [list, setList, updateList, clearList]
}
