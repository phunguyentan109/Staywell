import React, { useState, useEffect, useCallback } from 'react'
import { Card, Spin, Form, Input, Button, Table, Row, Col } from 'antd'
import { apiContract, apiBill, apiRoom } from 'constants/api'
import moment from 'moment'

export default function Contract({ notify, hdCancel, room, match, loading, setLoading }) {
  return (
    <Row>This is contract page</Row>
  )
}
