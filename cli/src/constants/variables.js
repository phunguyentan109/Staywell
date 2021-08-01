import { HomeOutlined } from '@ant-design/icons'

export const breadNames = {
  '/app': {
    name: 'Dashboard',
    icon: HomeOutlined
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

export const routes = {
  registration: (token = ':token') => `/registration/${token}`,
  completeRegistration: (userId = ':userId') => `/registration/complete/${userId}`
}
