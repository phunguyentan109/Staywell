import React, { useState, useEffect, useCallback, Fragment } from 'react'
import { Card, Spin, Form, Input, Button, Table, Row, Col } from 'antd'
import { apiContract, apiBill, apiRoom } from 'constants/api'
import ContainerHeader from 'components/ContainerHeader'
import PropTypes from 'prop-types'
import moment from 'moment'

export default function Contract({ notify, hdCancel, room, match, loading }) {
  return (
    <Row>This is contract page</Row>
  )
}
