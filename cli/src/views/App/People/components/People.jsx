import React, { useEffect, useCallback, useState } from 'react'
import { apiUser } from 'constants/api'
import { PEOPLE_PM, INACTIVE_PM } from 'containers/Permissions/modules/const'
import PropTypes from 'prop-types'
import PeopleTable from '../modules/PeopleTable'

export default function People({ notify }) {
  const [people, setPeople] = useState([])
  const [loading, setLoading] = useState(true)

  const load = useCallback(async() => {
    try {
      let peopleData = await apiUser.get()
      setPeople(peopleData)
      setLoading(false)
    } catch (e) {
      return notify('error', 'Data is not loaded')
    }
  }, [notify])

  useEffect(() => {
    load()
  }, [load])

  async function hdRemove(user_id) {
    try {
      await apiUser.remove(user_id)
      setPeople(prev => prev.filter(p => p.user_id._id !== user_id))
      return notify('success', 'Process is completed successfully!', 'People data is removed successfully.')
    } catch (e) {
      return notify('error', 'Process is not completed', 'People data cannot be removed properly')
    }
  }

  function getUnActive() {
    return people.filter(p => p.role_id.code === INACTIVE_PM)
  }

  function getActive() {
    return people.filter(p => p.role_id.code === PEOPLE_PM)
  }

  return (
    <div>
      {
        getUnActive().length > 0 && <PeopleTable
          title='List of UnActive People'
          dataSource={getUnActive()}
          loading={loading}
          hdRemove={hdRemove}
        />
      }
      <PeopleTable
        title='List of People'
        dataSource={getActive()}
        loading={loading}
        hdRemove={hdRemove}
      />
    </div>
  )
}

People.propsTypes = {
  notify: PropTypes.func
}
