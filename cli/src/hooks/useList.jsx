import { useState } from 'react'
import { cloneDeep } from 'lodash'

export default function useList(_list) {
  const [list, setList] = useState(_list)

  function updateList(element) {
    let newList = cloneDeep(list)
    let foundIdx = newList.findIndex(price => price._id === element._id)
    if (foundIdx !== -1) {
      newList[foundIdx] = cloneDeep(element)
      return setList(newList)
    }
    return setList(prev => [...prev, element])
  }

  return [list, setList, updateList]
}
