import React, { useCallback, useMemo } from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import { Badge, Button, Card, Col, Dropdown, Menu, Row, Table, Tooltip } from 'antd'
import Widget from 'components/Widget'
import { formatTime } from 'util/helper'
import '../_styles.scss'
import DeleteAction from 'components/DeleteAction'
import { notify } from 'constants/func'
import { routes } from 'constants/variables'

export default function People({ people, hdRemove, tokens, removeToken, hdOpenRegistration }) {
  const hdCopy = useCallback((e, token) => {
    e.target.classList.add('bounceIn')

    setTimeout(() => {
      let $tokens = document.querySelectorAll('.token-copy')

      // Perform copy
      let input = document.body.appendChild(document.createElement('input'))
      input.value = `${window.location.host}${routes.registration(token)}`
      input.focus()
      input.select()
      document.execCommand('copy')
      input.parentNode.removeChild(input)

      // Notify status
      notify('success', 'Url copied!')
      _.forEach($tokens, t => {
        t.classList.remove('bounceIn')
      })
    }, 1000)
  }, [])

  const filterRooms = useMemo(() => {
    let roomNames = _.map(_.filter(people, p => p.room_id), p => p.room_id.name)
    return _.map(_.uniq(roomNames.flat()), v => ({ text: v, value: v }))
  }, [people])

  return (
    <div className='app-people'>
      <Row>
        <Col xs={24} md={24}>
          <Widget styleName='gx-bg-dark-primary gx-text-white'>
            <Row align='middle' justify='space-between'>
              <Col span={12}>
                <p>
                  <i className='icon icon-refer gx-text-white' />
                  Register new renter
                </p>
                <h4 className='gx-font-weight-semi-bold gx-text-white gx-mb-0'>
                  Tap the button to open page & share it to the renters
                </h4>
              </Col>
              <Col span={12} className='gx-text-right'>
                <Button
                  size='large'
                  style={{ marginBottom: 0 }}
                  className='gx-btn-secondary'
                  onClick={hdOpenRegistration}
                >
                  Generate URL
                </Button>
              </Col>
            </Row>
          </Widget>
        </Col>

        <Col md={14} sm={24}>
          <Card className='gx-card' title='List of Renter'>
            <Table
              className='gx-table-responsive'
              scroll={{ x: 'max-content' }}
              dataSource={people}
              rowKey='_id'
              columns={[
                {
                  title: 'Avatar',
                  dataIndex: ['avatar', 'link'],
                  render: (text, rec) => (
                    <span className='user-cell'>
                      <img src={text} alt=''/>
                      <div>
                        <p>{rec.username}</p>
                        <small>{rec.email}</small>
                      </div>
                    </span>
                  )
                },
                {
                  title: 'Living Status',
                  dataIndex: ['room_id', 'name'],
                  filters: [
                    { text: 'Not Assigned', value: 'Not Assigned' },
                    { text: 'Not Verified', value: 'Not Verified' },
                    ...filterRooms
                  ],
                  onFilter: (v, r) => {
                    switch (v) {
                      case 'Not Assigned':
                        return !r.room_id && r.isVerified
                      case 'Not Verified':
                        return !r.isVerified
                      default:
                        return r.isVerified && r.room_id?.name.includes(v)
                    }
                  },
                  render: (v, r) => {
                    if (!r.isVerified) return <span className='text-danger'>Not Verified</span>
                    return <span>{v ? v : 'Not Assigned'}</span>
                  }
                },
                {
                  title: 'Action',
                  key: 'action',
                  render: (t, r) => <DeleteAction onConfirm={() => hdRemove(r._id)}/>
                }
              ]}
            />
          </Card>
        </Col>

        <Col lg={10} sm={24} xs={24}>
          <Widget
            title={
              <h2 className='h4 gx-text-capitalize gx-mb-0'>Registration-Open Pages</h2>
            }
          >
            <div className='gx-table-responsive'>
              <Table
                className='token-table'
                rowKey='token'
                columns={[
                  {
                    title: 'Page Code',
                    dataIndex: 'token',
                    render: (v, r) => {
                      return (
                        <Tooltip
                          placement='left'
                          title='Copied!'
                          trigger={['click']}
                          className='d-flex align-items-center'
                        >
                          <Badge status={r.isClose ? 'default' : 'processing'}/>
                          <div onClick={e => hdCopy(e, v)} className='token-copy'>
                            {v.substring(v.length - 10, v.length)}
                          </div>
                        </Tooltip>
                      )
                    }
                  },
                  {
                    title: 'Open At',
                    dataIndex: 'openAt',
                    render: v => formatTime(v, true),
                  },
                  {
                    title: 'Action',
                    dataIndex: 'isClose',
                    render: (v, r) => {
                      return <Dropdown
                        overlay={(
                          <Menu>
                            <Menu.Item>
                              <a target='_blank' rel='noopener noreferrer' href={routes.registration(r.token)}>
                                View in new tab
                              </a>
                            </Menu.Item>
                            <Menu.Divider/>
                            <Menu.Item>
                              <DeleteAction onConfirm={() => removeToken(r.token)}>
                                <span className='gx-text-danger'>Remove</span>
                              </DeleteAction>
                            </Menu.Item>
                          </Menu>
                        )}
                        trigger={['click']}
                      >
                        <i className='fas fa-ellipsis-h gx-link'/>
                      </Dropdown>
                    },
                  },
                ]}
                dataSource={tokens}
                pagination={false}
                size='small'
              />
            </div>
          </Widget>
        </Col>
      </Row>
    </div>
  )
}

People.propTypes = {
  removeToken: PropTypes.func,
  hdRemove: PropTypes.func,
  hdOpenRegistration: PropTypes.func,
  people: PropTypes.array,
  tokens: PropTypes.array
}

People.defaultProps = {
  tokens: []
}
