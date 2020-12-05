import React from 'react'
import PropTypes from 'prop-types'

// import { apiUser, notify } from 'constants/api'
import { PEOPLE_PM, INACTIVE_PM } from 'containers/Permissions/modules/const'
import PeopleTable from '../modules/PeopleTable'

export default function People({ people, hdRemove }) {
  function getActiveType(type) {
    return people.filter(p => p.role_id.code === type)
  }

  return (
    <>
      {
        getActiveType(INACTIVE_PM).length > 0 && <PeopleTable
          title='List of Inassigned Renter'
          dataSource={getActiveType(INACTIVE_PM)}
          hdRemove={hdRemove}
        />
      }
      <PeopleTable
        title='List of Renter'
        dataSource={getActiveType(PEOPLE_PM)}
        hdRemove={hdRemove}
      />
    </>
  )
}

People.propTypes = {
  hdRemove: PropTypes.func,
  people: PropTypes.array
}
