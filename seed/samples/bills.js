const moment = require('moment')
const price = require('./price')

const billA = [
  {
    electric: {
      number: 100,
      amount: 100
    },
    living: 1,
    water: 2,
    wifi: 1,
    deadline: moment([2021, 0]).endOf('month').format(),
    paidDate: moment([2021, 0]).endOf('month').format(),
    appliedPrice: price[0]
  },
  {
    electric: {
      number: 150,
      amount: 50
    },
    living: 1,
    water: 2,
    wifi: 1,
    deadline: moment([2021, 1]).endOf('month').format(),
    paidDate: moment([2021, 1]).endOf('month').format(),
    appliedPrice: price[0]
  },
  {
    electric: {
      number: 220,
      amount: 70
    },
    living: 1,
    water: 2,
    wifi: 1,
    deadline: moment([2021, 2]).endOf('month').format(),
    paidDate: moment([2021, 2]).endOf('month').format(),
    appliedPrice: price[0]
  },
  {
    electric: {
      number: 260,
      amount: 50
    },
    living: 1,
    water: 2,
    wifi: 1,
    deadline: moment([2021, 3]).endOf('month').format(),
    paidDate: moment([2021, 3]).endOf('month').format(),
    appliedPrice: price[0]
  },
]
