import React from 'react'
import PropTypes from 'prop-types'
import { Col, Row, Space } from 'antd'

SelectConfig.propTypes = {
  onChange: PropTypes.func,
  label: PropTypes.string,
  color: PropTypes.string,
}

function SelectConfig(props) {
  const hdSubmit = () => {
    props.onChange()
  }

  return (
    <Row className='avatar-select' justify='center' gutter={[0, 16]} align='middle'>
      <Col className='label' span={7}>
        {props.label}
      </Col>

      <Col>
        <Row gutter={[20]} align='middle'>
          <Col>
            <Row align='middle' gutter={[16]}>
              <Col>
                <div data-fas={true} className='arrow-left'>&#xf104;</div>
              </Col>

              <Col>
                <div className='result'>Normal</div>
              </Col>

              <Col>
                <div data-fas={true} className='arrow-right'>
              &#xf105;
                </div>
              </Col>
            </Row>
          </Col>

          <Col>
            <Space size={[8, 8]} align='center'>
              <span className='color-label'>Color</span>
              <div className='color-input'>
                <input
                  type='color'
                  value={props.color}
                  onChange={(value) => props.onChange(value, 'faceColor')}
                  name='faceColor'
                />
              </div>
            </Space>
          </Col>
        </Row>
      </Col>
    </Row>

  )
}

export default SelectConfig
