import React, { useCallback, useEffect, useState } from 'react'
import { Form, Input, Modal } from 'antd'
import PropTypes from 'prop-types'
import _ from 'lodash'
import { useToggle } from 'hooks'
import { DEFAULT_PRICE, PRICE_INPUTS } from '../../const'

const FormItem = Form.Item

export default function PriceForm(props) {
  const [price, repPrice] = useState(_.cloneDeep(DEFAULT_PRICE))
  const [pair, togglePair] = useToggle({ modal: false, process: false })

  useEffect(() => {
    if (!_.isEmpty(props.value)) {
      const { type, electric, wifi, water, living, extra } = props.value
      repPrice({ type, electric, wifi, water, living, extra })
    }
  }, [props.value, repPrice])

  const hdChange = useCallback(e => {
    const { name, value } = e.target
    repPrice({ [name]: value })
  }, [repPrice])

  const toggleModal = useCallback(() => {
    togglePair(['modal'])
    repPrice(_.cloneDeep(DEFAULT_PRICE))
  }, [repPrice, togglePair])

  const hdOk = useCallback(async() => {
    togglePair(['process'])
    let rs = await props.hdSubmit(price)
    rs.status === 200 && togglePair(['modal'])
    togglePair(['process'])
  }, [price, props, togglePair])

  return (
    <>
      <span onClick={toggleModal}>{props.children}</span>
      <Modal
        title={props.title}
        visible={pair.modal}
        onCancel={() => togglePair(['modal'])}
        onOk={hdOk}
        confirmLoading={pair.process}
      >
        <Form layout='horizontal'>
          {
            PRICE_INPUTS.map((input, i) => (
              <FormItem
                key={i}
                label={input.label}
                labelCol={{ xs: 24, sm: 6 }}
                wrapperCol={{ xs: 24, sm: 16 }}
              >
                <Input
                  type={input.type || 'number'}
                  placeholder={`Please enter the ${input.name}`}
                  name={input.name}
                  value={price[input.name]}
                  onChange={hdChange}
                />
              </FormItem>
            ))
          }
        </Form>
      </Modal>
    </>
  )
}

PriceForm.propTypes = {
  hdSubmit: PropTypes.func,
  children: PropTypes.element,
  title: PropTypes.string,
  value: PropTypes.object
}
