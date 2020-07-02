import React, { useEffect, useCallback, useState } from 'react'
import PropTypes from 'prop-types'

import { apiUser, notify } from 'constants/api'
import { PEOPLE_PM, INACTIVE_PM } from 'containers/Permissions/modules/const'
import PeopleTable from '../modules/PeopleTable'

export default function People({ loading }) {
  const [people, setPeople] = useState([])

  const load = useCallback(async() => {
    let peopleData = await apiUser('get')
    setPeople(peopleData)
    loading(false)
  }, [loading])

  useEffect(() => { load() }, [load])

  async function hdRemove(user_id) {
    await apiUser('remove', { params: { user_id } })
    setPeople(prev => prev.filter(p => p.user_id._id !== user_id))
    notify('success', 'People data is removed successfully.')
  }

  function getActiveType(type) {
    return people.filter(p => p.role_id.code === type)
  }

  return (
    <>
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
    </>
  )
}

People.propTypes = {
  loading: PropTypes.func
}
