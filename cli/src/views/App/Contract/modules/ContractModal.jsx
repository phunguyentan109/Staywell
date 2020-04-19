import React, { useState, Fragment } from 'react'
import { Button, Card, Form, Input, Modal } from 'antd'

const FormItem = Form.Item

export default function ContractModal() {
  const [electric, setElectric] = useState(0)
  const [visible, setVisible] = useState(false)
  const [loading, setLoading] = useState(false)

  function hdSubmit () {

    setVisible(false)
  }

  function hdCancel () {

  }

  function toggleModal () {
    setVisible(prev => !prev)
  }

  return (
    <p>This is the place for contract modal</p>
  )
}
