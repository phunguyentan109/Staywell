import React, { useState } from 'react'
import { Button, Card, Form, Input, Modal } from 'antd'
import PropTypes from 'prop-types'

import { DEFAULT_PRICE } from './const'

const FormItem = Form.Item

function PriceForm({ select }) {
  const [visible, setVisible] = useState(false)
  const [price, setPrice] = useState(select)

  function toggleVisible() {
    setVisible(prev => !prev)
  }

  function hdOk() {}

  // function hdCancel() {}

  function hdChange(e) {
    let { value, name } = e.target
    setPrice(prev => ({ ...prev, [name]: value }))
  }

  return (
    <Card title='Create New Price' className='gx-card'>
      <Modal
        title='Basic Modal'
        visible={visible}
        onOk={hdOk}
        onCancel={toggleVisible}
      >
        <Form layout='horizontal'>
          <FormItem
            label='Type'
            labelCol={{ xs: 24, sm: 6 }}
            wrapperCol={{ xs: 24, sm: 10 }}
          >
            <Input
              placeholder="Enter the price's type here..."
              name='type'
              value={price.type}
              onChange={hdChange}
            />
          </FormItem>
          <FormItem
            label='Electric'
            labelCol={{ xs: 24, sm: 6 }}
            wrapperCol={{ xs: 24, sm: 10 }}
          >
            <Input
              type='Number'
              placeholder='Enter the electric price here...'
              name='electric'
              value={price.electric}
              onChange={hdChange}
            />
          </FormItem>
          <FormItem
            label='Wifi'
            labelCol={{ xs: 24, sm: 6 }}
            wrapperCol={{ xs: 24, sm: 10 }}
          >
            <Input
              type='Number'
              placeholder='Enter the wifi price here...'
              name='wifi'
              value={price.wifi}
              onChange={hdChange}
            />
          </FormItem>
          <FormItem
            label='Water'
            labelCol={{ xs: 24, sm: 6 }}
            wrapperCol={{ xs: 24, sm: 10 }}
          >
            <Input
              type='Number'
              placeholder='Enter the water price here...'
              name='water'
              value={price.water}
              onChange={hdChange}
            />
          </FormItem>
          <FormItem
            label='House'
            labelCol={{ xs: 24, sm: 6 }}
            wrapperCol={{ xs: 24, sm: 10 }}
          >
            <Input
              type='Number'
              placeholder='Enter the house price here...'
              name='house'
              value={price.house}
              onChange={hdChange}
            />
          </FormItem>
          <FormItem
            label='Extra'
            labelCol={{ xs: 24, sm: 6 }}
            wrapperCol={{ xs: 24, sm: 10 }}
          >
            <Input
              type='Number'
              placeholder='Enter the extra price here...'
              name='extra'
              value={price.extra}
              onChange={hdChange}
            />
          </FormItem>
          {/*<FormItem*/}
          {/*  wrapperCol={{*/}
          {/*    xs: 24,*/}
          {/*    sm: { span: 14, offset: 6 }*/}
          {/*  }}*/}
          {/*>*/}
          {/*  <Button type='primary' onClick={hdSubmit}>Submit</Button>*/}
          {/*  <Button onClick={toggleVisible}>Cancel</Button>*/}
          {/*</FormItem>*/}
        </Form>
      </Modal>
    </Card>
  )
}

PriceForm.defaultProps = {
  select: DEFAULT_PRICE
}

export default PriceForm

// class Basic extends React.Component {
//   state = { visible: false };
//   showModal = () => {
//     this.setState({
//       visible: true,
//     })
//   };
//   handleOk = (e) => {
//     console.log(e)
//     this.setState({
//       visible: false,
//     })
//   };
//   handleCancel = (e) => {
//     console.log(e)
//     this.setState({
//       visible: false,
//     })
//   };
//
//   render() {
//     return (
//
//     )
//   }
// }
//
// export default Basic
