import React from 'react'

export const TABLE_COLS = [
  {
    title: 'Username',
    dataIndex: 'username',
    render: (text, rec) => (
      <span className='transfer'>
        <img src={rec.avatar.link} alt='img'/>{text}
      </span>
    )
  },
  {
    title: 'Email',
    dataIndex: 'email'
  }
]
