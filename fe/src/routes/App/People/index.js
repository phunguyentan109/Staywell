import React, { useCallback, useEffect, useMemo } from 'react'
import PropTypes from 'prop-types'
import { Badge, Button, Card, Col, Dropdown, Menu, message, Row, Table, Tooltip, Typography } from 'antd'
import Widget from 'components/Widget'
import './_styles.less'
import DeleteAction from 'components/DeleteAction'
import { urls } from 'constants/routes'
import { useDispatch, useSelector } from 'react-redux'
import { selectPeople } from './redux/selector'
import _ from 'lodash'
import { createRegistrationToken, fetchPeopleAction, removePeopleAction } from './redux/action'
import { formatTime } from 'constants/func'
import Avatar from 'react-nice-avatar'

export default function People(props) {
  const { people, loading } = useSelector(selectPeople)
  const dp = useDispatch()

  const getPeople = useCallback(() => dp(fetchPeopleAction()), [dp])

  useEffect(() => {
    getPeople()
  }, [getPeople])

  const removePeople = (peopleId) => {
    dp(removePeopleAction(peopleId, rs => {
      if (rs) message.success('Removing people successfully!')
      getPeople()
    }))
  }

  // const { data: people, isFetching, isMutating, mutate } = useFetch(userApi.get(), {
  //   remove: {
  //     exec: id => userApi.remove(id),
  //     successMsg: 'User is removed successfully!'
  //   },
  //   getRegisterToken: {
  //     exec: () => userApi.openRegistration(),
  //     successMsg: 'Registration token is generated successfully!',
  //     revalidate: false
  //   }
  // })

  // const hdCopy = useCallback((e, token) => {
  //   e.target.classList.add('bounceIn')
  //
  //   setTimeout(() => {
  //     let $tokens = document.querySelectorAll('.token-copy')
  //
  //     // Perform copy
  //     let input = document.body.appendChild(document.createElement('input'))
  //     input.value = `${window.location.host}${routes.registration(token)}`
  //     input.focus()
  //     input.select()
  //     document.execCommand('copy')
  //     input.parentNode.removeChild(input)
  //
  //     // Notify status
  //     notify('success', 'Url copied!')
  //     _.forEach($tokens, t => {
  //       t.classList.remove('bounceIn')
  //     })
  //   }, 1000)
  // }, [])

  const hdOpenRegistration = async () => {
    dp(createRegistrationToken())
    // dp(sendReloadUser(userData._id))
  }

  // const filterRooms = useMemo(() => {
  //   let roomNames = _.map(_.filter(people, p => p.room_id), p => p.room_id.name)
  //   return _.map(_.uniq(roomNames.flat()), v => ({ text: v, value: v }))
  // }, [people])

  const hdRemove = (peopleId) => {
    // dp(removePeopleAction(peopleId), () => {
    //
    // })
  }

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

        <Col lg={24} sm={24} xs={24}>
          <Widget
            title={
              <h2 className='h4 gx-text-capitalize gx-mb-0'>Registration-Open Pages</h2>
            }
          >
            <div className='gx-table-responsive'>
              <Table
                loading={loading}
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
                          <Typography.Text >
                            {v.substring(v.length - 10, v.length)}
                          </Typography.Text>
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
                              <a target='_blank' rel='noopener noreferrer' href={urls.registration(r.token)}>
                                View in new tab
                              </a>
                            </Menu.Item>
                            <Menu.Divider/>
                            <Menu.Item>
                              <DeleteAction onConfirm={() => props.removeToken(r.token)}>
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
                dataSource={props.tokens}
                pagination={false}
                size='small'
              />
            </div>
          </Widget>

          <Card className='gx-card' title='List of Renter'>
            <Table
              loading={loading}
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
                      <Avatar
                        className='gx-size-40 gx-mr-3 customAvatar'
                        {...text}
                      />
                      <div>
                        <p>{rec.username}</p>
                        <small>{rec.email}</small>
                      </div>
                    </span>
                  )
                },
                {
                  title: 'Living Status',
                  dataIndex: ['roomId', 'name'],
                  // filters: [
                  //   { text: 'Not Assigned', value: 'Not Assigned' },
                  //   { text: 'Not Verified', value: 'Not Verified' },
                  //   ...filterRooms
                  // ],
                  // onFilter: (v, r) => {
                  //   switch (v) {
                  //     case 'Not Assigned':
                  //       return !r.room_id && r.isVerified
                  //     case 'Not Verified':
                  //       return !r.isVerified
                  //     default:
                  //       return r.isVerified && r.room_id?.name.includes(v)
                  //   }
                  // },
                  render: (v, r) => {
                    if (!r.isVerified) return <span className='text-danger'>Not Verified</span>
                    return <span>{v ? v : 'Not Assigned'}</span>
                  }
                },
                {
                  title: 'Action',
                  key: 'action',
                  dataIndex: '_id',
                  render: v => <DeleteAction onConfirm={() => removePeople(v)}/>
                }
              ]}
            />
          </Card>
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
  tokens: PropTypes.array,
  removeTokens: PropTypes.func,
}

People.defaultProps = {
  tokens: []
}
