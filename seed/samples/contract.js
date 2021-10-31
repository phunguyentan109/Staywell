const moment = require('moment')
const price = require('./price')

const contract25 = [
  {
    for: 'room25',
    usedNumber: { electric: 0 },
    deposit: 3000,
    duration: 4,
    startDate: moment([2021, 0]).startOf('month'),
    bills: [
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
  },
  {
    for: 'room25',
    usedNumber: { electric: 260 },
    deposit: 3000,
    duration: 4,
    startDate: moment([2021, 6]).startOf('month'),
    bills: [
      {
        electric: {
          number: 320,
          amount: 60
        },
        living: 1,
        water: 1,
        wifi: 1,
        deadline: moment([2021, 6]).endOf('month').format(),
        paidDate: moment([2021, 6]).endOf('month').format(),
        appliedPrice: price[0]
      },
      {
        electric: {
          number: 390,
          amount: 70
        },
        living: 1,
        water: 1,
        wifi: 1,
        deadline: moment([2021, 7]).endOf('month').format(),
        appliedPrice: price[0]
      },
      {
        living: 1,
        water: 1,
        wifi: 1,
        deadline:  moment([2021, 9]).endOf('month').format()
      },
    ]
  }
]

const contract35_2 = [
  {
    for: 'room35_2',
    usedNumber: { electric: 0 },
    deposit: 3000,
    duration: 4,
    startDate: moment([2021, 0]).startOf('month'),
    bills: [
      {
        electric: { number: 50, amount: 50 },
        living: 1,
        water: 2,
        wifi: 1,
        deadline: moment([2021, 0]).endOf('month').format(),
        appliedPrice: price[1]
      },
      {
        electric: { number: 140, amount: 90 },
        living: 1,
        water: 2,
        wifi: 1,
        deadline: moment([2021, 1]).endOf('month').format(),
        appliedPrice: price[1]
      },
      {
        electric: { number: 190, amount: 50 },
        living: 1,
        water: 2,
        wifi: 1,
        deadline: moment([2021, 2]).endOf('month').format(),
        appliedPrice: price[1]
      },
      {
        electric: { number: 250, amount: 60 },
        living: 1,
        water: 2,
        wifi: 1,
        deadline: moment([2021, 3]).endOf('month').format(),
        appliedPrice: price[1]
      },
    ]
  },
  {
    for: 'room35_2',
    usedNumber: { electric: 250 },
    deposit: 3000,
    duration: 6,
    startDate: moment([2021, 4]).startOf('month'),
    bills: [
      {
        electric: { number: 331, amount: 81 },
        living: 1,
        water: 2,
        wifi: 1,
        deadline: moment([2021, 4]).endOf('month').format(),
        appliedPrice: price[1]
      },
      {
        electric: { number: 365, amount: 34 },
        living: 1,
        water: 2,
        wifi: 1,
        deadline: moment([2021, 5]).endOf('month').format(),
        appliedPrice: price[1]
      },
      {
        electric: { number: 400, amount: 35 },
        living: 1,
        water: 2,
        wifi: 1,
        deadline: moment([2021, 6]).endOf('month').format(),
        appliedPrice: price[1]
      },
      {
        electric: { number: 440, amount: 40 },
        living: 1,
        water: 2,
        wifi: 1,
        deadline: moment([2021, 7]).endOf('month').format(),
        appliedPrice: price[1]
      },
      {
        electric: { number: 540, amount: 100 },
        living: 1,
        water: 1,
        wifi: 1,
        appliedPrice: price[1],
        deadline:  moment([2021, 8]).endOf('month').format()
      },
    ]
  },
]

const contract35 = [
  {
    for: 'room35',
    usedNumber: { electric: 0 },
    deposit: 3000,
    duration: 4,
    startDate: moment([2021, 0]).startOf('month'),
    bills: [
      {
        electric: { number: 50, amount: 50 },
        living: 1,
        water: 2,
        wifi: 1,
        deadline: moment([2021, 0]).endOf('month').format(),
        appliedPrice: price[1]
      },
      {
        electric: { number: 140, amount: 90 },
        living: 1,
        water: 2,
        wifi: 1,
        deadline: moment([2021, 1]).endOf('month').format(),
        appliedPrice: price[1]
      },
      {
        electric: { number: 190, amount: 50 },
        living: 1,
        water: 2,
        wifi: 1,
        deadline: moment([2021, 2]).endOf('month').format(),
        appliedPrice: price[1]
      },
      {
        electric: { number: 250, amount: 60 },
        living: 1,
        water: 2,
        wifi: 1,
        deadline: moment([2021, 3]).endOf('month').format(),
        appliedPrice: price[1]
      },
    ]
  },
  {
    for: 'room35',
    usedNumber: { electric: 250 },
    deposit: 3000,
    duration: 6,
    startDate: moment([2021, 4]).startOf('month'),
    bills: [
      {
        electric: { number: 331, amount: 81 },
        living: 1,
        water: 2,
        wifi: 1,
        deadline: moment([2021, 4]).endOf('month').format(),
        appliedPrice: price[1]
      },
      {
        electric: { number: 365, amount: 34 },
        living: 1,
        water: 2,
        wifi: 1,
        deadline: moment([2021, 5]).endOf('month').format(),
        appliedPrice: price[1]
      },
      {
        electric: { number: 400, amount: 35 },
        living: 1,
        water: 2,
        wifi: 1,
        deadline: moment([2021, 6]).endOf('month').format(),
        appliedPrice: price[1]
      },
      {
        electric: { number: 440, amount: 40 },
        living: 1,
        water: 2,
        wifi: 1,
        deadline: moment([2021, 7]).endOf('month').format(),
        appliedPrice: price[1]
      },
      {
        living: 1,
        water: 1,
        wifi: 1,
        deadline:  moment([2021, 8]).endOf('month').format()
      },
    ]
  },
]

const contract40 = [
  {
    for: 'room40',
    usedNumber: { electric: 210 },
    deposit: 3000,
    duration: 6,
    startDate: moment([2021, 3]).startOf('month'),
    bills: [
      {
        electric: { number: 290, amount: 80 },
        living: 1,
        water: 2,
        wifi: 1,
        deadline: moment([2021, 3]).endOf('month').format(),
        appliedPrice: price[2]
      },
      {
        electric: { number: 365, amount: 75 },
        living: 1,
        water: 2,
        wifi: 1,
        deadline: moment([2021, 4]).endOf('month').format(),
        appliedPrice: price[2]
      },
      {
        electric: { number: 422, amount: 57 },
        living: 1,
        water: 2,
        wifi: 1,
        deadline: moment([2021, 5]).endOf('month').format(),
        appliedPrice: price[2]
      },
      {
        electric: { number: 480, amount: 58 },
        living: 1,
        water: 2,
        wifi: 1,
        deadline: moment([2021, 6]).endOf('month').format(),
        appliedPrice: price[2]
      },
      {
        electric: { number: 520, amount: 40 },
        living: 1,
        water: 2,
        wifi: 1,
        deadline: moment([2021, 7]).endOf('month').format(),
        appliedPrice: price[2]
      },
      {
        living: 1,
        water: 1,
        wifi: 1,
        deadline:  moment([2021, 8]).endOf('month').format()
      },
    ]
  },
]

const contract40_2 = [
  {
    for: 'room40_2',
    usedNumber: { electric: 90 },
    deposit: 3000,
    duration: 2,
    startDate: moment([2021, 3]).startOf('month'),
    bills: [
      {
        electric: { number: 120, amount: 30 },
        living: 1,
        water: 2,
        wifi: 1,
        deadline: moment([2021, 1]).endOf('month').format(),
        appliedPrice: price[2]
      },
      {
        electric: { number: 180, amount: 60 },
        living: 1,
        water: 2,
        wifi: 1,
        deadline: moment([2021, 1]).endOf('month').format(),
        appliedPrice: price[2]
      },
    ]
  },
  {
    for: 'room40_2',
    usedNumber: { electric: 210 },
    deposit: 3000,
    duration: 6,
    startDate: moment([2021, 3]).startOf('month'),
    bills: [
      {
        electric: { number: 290, amount: 80 },
        living: 1,
        water: 2,
        wifi: 1,
        deadline: moment([2021, 3]).endOf('month').format(),
        appliedPrice: price[2]
      },
      {
        living: 1,
        water: 1,
        wifi: 1,
        deadline:  moment([2021, 8]).endOf('month').format(),
      },
    ]
  },
]

module.exports = [...contract25, ...contract35, ...contract35_2, ...contract40, ...contract40_2]
