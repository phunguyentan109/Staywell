import React from 'react'

export const DEFAULT_ROOM = {
  name: '',
  user_id: []
}

export const TABLE_COLS = [
  {
    title: 'Username',
    dataIndex: 'people_id.username',
    render: (text, rec) => <span>{rec.avatar.link} {text}</span>
  },
  {
    title: 'Email',
    dataIndex: 'email'
  }
]
