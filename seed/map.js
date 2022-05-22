const price = require('./samples/price')
const room = require('./samples/room')
const group = require('./samples/group')
const user = require('./samples/user')
const admin = require('./samples/admin')
const _ = require('lodash')

exports.mapRoom = [
  {
    seedName: 'Room A',
    schema: 'Room',
    target: room[0],
    dependencies: [
      {
        path: 'priceId',
        schema: 'Price',
        data: price[0]
      },
      {
        path: 'userIds',
        schema: 'User',
        childPath: 'roomId',
        data: [user[0]]
      }
    ]
  },
  {
    seedName: 'Room B',
    schema: 'Room',
    target: room[1],
    dependencies: [
      {
        path: 'priceId',
        schema: 'Price',
        data: price[1]
      },
      {
        path: 'userIds',
        schema: 'User',
        childPath: 'roomId',
        data: [user[2], user[3]]
      }
    ]
  },
  {
    seedName: 'Room C',
    schema: 'Room',
    target: room[3],
    dependencies: [
      {
        path: 'priceId',
        schema: 'Price',
        data: price[0]
      },
    ]
  }
]

exports.mapPrice = [
  {
    seedName: 'Price 1',
    schema: 'Price',
    target: price[0],
    dependencies: [
      {
        path: 'roomIds',
        schema: 'Room',
        data: [room[0], room[3]],
        childPath: 'priceId',
      }
    ]
  },
  {
    seedName: 'Price 2',
    schema: 'Price',
    target: price[1],
    dependencies: [
      {
        path: 'roomIds',
        schema: 'Room',
        data: [room[1]],
        childPath: 'priceId',
      }
    ]
  },
]

exports.mapGroup = [
  {
    seedName: 'Admin',
    schema: 'Group',
    target: group[0],
    dependencies: [
      {
        path: 'userIds',
        schema: 'User',
        childPath: 'groupId',
        data: [_.omit(admin[0], ['password'])]
      },
    ]
  },
  {
    seedName: 'Tenant',
    schema: 'Group',
    target: group[1],
    dependencies: [
      {
        path: 'userIds',
        schema: 'User',
        childPath: 'groupId',
        data: _.cloneDeep(user)
      },
    ]
  },
]

