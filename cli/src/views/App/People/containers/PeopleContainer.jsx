import React, { useCallback, useEffect, useState } from 'react'
import People from '../components/People'
import { userApi, call } from 'constants/api'
import { notify, offLoading, onLoading } from 'constants/func'
import { useDispatch, useSelector } from 'react-redux'
import { sendReloadUser } from 'appRedux/actions/user'

function PeopleContainer(props) {
  const [people, setPeople] = useState([])
  const reduxData = useSelector(({ user }) => user.data)
  const dispatch = useDispatch()

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

  const removeToken = useCallback(async(token) => {
    onLoading()
    let rs = await call(...userApi.closeRegistration(token))
    if (rs.status === 200) {
      dispatch(sendReloadUser(reduxData._id))
      notify('success', 'Token is removed successfully.')
    }
    offLoading()
  }, [dispatch, reduxData._id])

  const hdOpenRegistration = useCallback(async() => {
    onLoading()
    await call(...userApi.openRegistration())
    dispatch(sendReloadUser(reduxData._id))
    offLoading()
  }, [dispatch, reduxData._id])

  return (
    <People
      {...props}
      people={people}
      removeToken={removeToken}
      hdRemove={hdRemove}
      tokens={reduxData.anonymous?.tokens}
      hdOpenRegistration={hdOpenRegistration}
    />
  )
}

export default PeopleContainer
