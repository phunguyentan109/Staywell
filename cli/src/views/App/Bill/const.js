export const contractSample = {
  _id: 1,
  info: {
    from: 'February 6th 2022',
    to: 'August 6th 2021'
  },
  duration: 6,
  current: 3,
  room_id: {
    user_id: [
      { _id: 1 },
      { _id: 2 },
      { _id: 5 },
    ]
  }
}

export const billSample = [
  { type: 'Rent', number: 1, unit: 'Individual', price: 2000, rate: 'error' },
  { type: 'Electric', number: 20, unit: 'Kwh', price: 3.5 },
  { type: 'Water', number: 6, unit: 'm3', price: 12 },
  { type: 'Wifi', number: 1, unit: 'Individual', price: 120, rate: 'warning' },
]

export const billListSample = [
  {
    id: '24fa2',
    deadline: '30/06/2021',
    progress: 100,
    status: 1,
    statusText: 'Unpaid',
    expenses: [
      { type: 'Rent', amount: 1, unit: 'Individual', price: 2000 },
      { type: 'Electric', number: 105, unit: 'Kwh', price: 3.5 },
      { type: 'Water', number: 12, unit: 'm3', price: 12 },
      { type: 'Wifi', amount: 1, unit: 'Individual', price: 120 },
    ]
  },
  {
    id: '54fa2',
    deadline: '31/07/2021',
    progress: 100,
    status: 2,
    statusText: 'Closed',
    expenses: [
      { type: 'Rent', amount: 1, unit: 'Individual', price: 2000 },
      { type: 'Electric', number: 120, unit: 'Kwh', price: 3.5, compareLastBill: 7 },
      { type: 'Water', number: 16, unit: 'm3', price: 12 },
      { type: 'Wifi', amount: 1, unit: 'Individual', price: 120 },
    ]
  },
  {
    id: '22fa2',
    deadline: '30/08/2021',
    status: 0,
    statusText: 'Processing...',
    progress: 40,
    expenses: [
      { type: 'Rent', amount: 1, unit: 'Individual', price: 2000 },
      { type: 'Electric', number: 220, unit: 'Kwh', price: 3.5, compareLastBill: -5 },
      { type: 'Water', number: 26, unit: 'm3', price: 12 },
      { type: 'Wifi', amount: 1, unit: 'Individual', price: 120 },
    ]
  }
]

