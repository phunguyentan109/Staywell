import React, { useCallback, useEffect, useState } from 'react'
import People from '../components/People'
import { userApi, call } from 'constants/api'
import { notify, offLoading, onLoading } from 'constants/func'

function PeopleContainer(props) {
  const [people, setPeople] = useState([])

  const getPeople = useCallback(async() => {
    onLoading()
    let rs = await call(...userApi.get())
    rs.status === 200 && setPeople(rs.data)
    offLoading()
  }, [])

  useEffect(() => { getPeople() }, [getPeople])

  const hdRemove = useCallback(async(peopleId) => {
    onLoading()
    let rs = await userApi.remove(peopleId)
    if (rs.status === 200) {
      setPeople(prev => prev.filter(p => p.user_id._id !== peopleId))
      notify('success', 'People data is removed successfully.')
    }
    offLoading()
  }, [])

  return (
    <People {...props} people={people} hdRemove={hdRemove} />
  )
}

export default PeopleContainer
