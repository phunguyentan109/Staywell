import React, { useCallback, useEffect } from 'react'
import { Form, Input, Modal } from 'antd'
import PropTypes from 'prop-types'
import _ from 'lodash'
import { useStore, useToggle } from 'hooks'
import { PRICE_INPUTS, DEFAULT_PRICE } from '../../const'

const FormItem = Form.Item

export default function PriceForm({ hdSubmit, children, title, value }) {
  const [price, repPrice] = useStore(_.cloneDeep(DEFAULT_PRICE))
  const [pair, togglePair] = useToggle({ modal: false, process: false })

  useEffect(() => {
    if (!_.isEmpty(value)) {
      const { type, electric, wifi, water, living, extra } = value
      repPrice({ type, electric, wifi, water, living, extra })
    }
  }, [repPrice, value])

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
    let rs = await hdSubmit(price)
    rs.status === 200 && togglePair(['modal'])
    togglePair(['process'])
  }, [hdSubmit, price, togglePair])

  return (
    <>
      <span onClick={toggleModal}>{children}</span>
      <Modal
        title={title}
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
