import React, { useEffect, useCallback, useState, Fragment } from 'react'
import PropTypes from 'prop-types'

import { apiUser } from 'constants/api'
import { PEOPLE_PM, INACTIVE_PM } from 'containers/Permissions/modules/const'
import PeopleTable from '../modules/PeopleTable'

export default function People({ notify, setLoading }) {
  const [people, setPeople] = useState([])

  const load = useCallback(async() => {
    try {
      let peopleData = await apiUser.get()
      setPeople(peopleData)
      setLoading(false)
    } catch (e) {
      return notify('error', 'Data is not loaded')
    }
  }, [notify, setLoading])

  useEffect(() => { load() }, [load])

  async function hdRemove(user_id) {
    try {
      await apiUser.remove(user_id)
      setPeople(prev => prev.filter(p => p.user_id._id !== user_id))
      return notify('success', 'People data is removed successfully.')
    } catch (e) {
      return notify('error', 'People data cannot be removed properly')
    }
  }

  function getActiveType(type) {
    return people.filter(p => p.role_id.code === type)
  }

  return (
    <Fragment>
      {
        getActiveType(INACTIVE_PM).length > 0 && <PeopleTable
          title='List of Inactive People'
          dataSource={getActiveType(INACTIVE_PM)}
          hdRemove={hdRemove}
        />
      }
      <PeopleTable
        title='List of People'
        dataSource={getActiveType(PEOPLE_PM)}
        hdRemove={hdRemove}
      />
    </Fragment>
  )
}

People.propsTypes = {
  notify: PropTypes.func
}
