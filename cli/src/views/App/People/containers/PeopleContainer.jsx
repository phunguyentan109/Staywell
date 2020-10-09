import React, { useCallback, useEffect, useRef, useState } from 'react'
import People from '../components/People'
import Loading from 'components/Loading'
import { userApi, call } from 'constants/api'
import { notify } from 'constants/func'

function PeopleContainer(props) {
  const loadRef = useRef({})
  const [people, setPeople] = useState([])

  const getPeople = useCallback(async() => {
    let rs = await call(...userApi.get())
    rs.status === 200 && setPeople(rs.data)
  }, [])

  const load = useCallback(async() => {
    loadRef.current.toggle()
    await getPeople()
    loadRef.current.toggle()
  }, [getPeople])

  useEffect(() => { load() }, [load])

  const hdRemove = useCallback(async(peopleId) => {
    let rs = await userApi.remove(peopleId)
    if (rs.status === 200) {
      setPeople(prev => prev.filter(p => p.user_id._id !== peopleId))
      notify('success', 'People data is removed successfully.')
    }
  }, [])

  return (
    <Loading ref={loadRef}>
      <People
        {...props}
        people={people}
        hdRemove={hdRemove}
      />
    </Loading>
  )
}

export default PeopleContainer
