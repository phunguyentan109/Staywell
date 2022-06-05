import React from 'react'
import { HomeOutlined } from '@ant-design/icons'
import permissions from './permissions'

import Room from 'routes/App/Room/Loader'
import Price from 'routes/App/Price/Loader'
import Dashboard from 'routes/App/Dashboard'
import Login from 'routes/Guest/Login/Loader'
import People from 'routes/App/People/Loader'
import Register from '../routes/Public/Register/Loader'
import CompleteVerify from '../routes/Public/CompleteVerify'

export const breadNames = {
  '/app': {
    name: 'Dashboard',
    icon: <HomeOutlined />
  },
  '/app/people': {
    name: 'Manage People'
  },
  '/app/price': {
    name: 'Manage Price'
  },
  '/app/profile': {
    name: 'Manage Profile'
  },
  '/app/rooms': {
    name: 'Manage Room'
  },
  '/app/contracts': {
    name: 'Manage Contract'
  }
}

export const urls = {
  login: '/',
  registration: '/registration/:token',
  completeVerify: '/registration/verify',

  dashboard: '/app',
  rooms: '/app/rooms',
  price: '/app/price',
  people: '/app/people'
}

export default {
  guest: [
    {
      exact: true,
      path: urls.login,
      component: Login,
      permissions: [permissions.login],
      redirect: '/app'
    },
    {
      exact: true,
      path: urls.completeVerify,
      component: CompleteVerify
    },
    {
      exact: true,
      path: urls.registration,
      component: Register
    }
  ],
  app: [
    {
      path: urls.people,
      component: People,
      permissions: [permissions.mnPeople],
      redirect: '/app'
    },
    {
      path: urls.rooms,
      component: Room,
      permissions: [permissions.mnRoom],
      redirect: '/app'
    },
    {
      path: urls.price,
      component: Price,
      permissions: [permissions.mnPrice],
      redirect: '/app'
    },
    {
      exact: true,
      path: urls.dashboard,
      component: Dashboard,
      permissions: [permissions.dashboard],
      redirect: '/'
    },
  ]
}
