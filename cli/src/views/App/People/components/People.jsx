import React, { useMemo } from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import PeopleTable from '../modules/PeopleTable'

export default function People({ people, hdRemove }) {
  const list = useMemo(() => {
    return _.reduce(people, (a, n) => {
      a[n.isVerified ? 'active' : 'inActive'].push(n)
      return a
    }, { active: [], inActive:[] })
  }, [people])

  return (
    <>
      {
        _.size(list.inActive) > 0 && <PeopleTable
          title='List of Not-Verified Renter'
          dataSource={list.inActive}
          hdRemove={hdRemove}
        />
      }
      <PeopleTable
        title='List of Renter'
        dataSource={list.active}
        hdRemove={hdRemove}
      />
    </>
  )
}

People.propTypes = {
  hdRemove: PropTypes.func,
  people: PropTypes.array
}
