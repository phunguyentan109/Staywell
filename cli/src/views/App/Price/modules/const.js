export const DEFAULT_PRICE = {
  type: '',
  electric: 0,
  wifi: 0,
  water: 0,
  living: 0,
  extra: 0
}

export const PRICE_INPUTS = [
  { label: 'Type', name: 'type', type: 'text' },
  { label: 'Electric', name: 'electric' },
  { label: 'Wifi', name: 'wifi' },
  { label: 'Water', name: 'water' },
  { label: 'Living', name: 'living' },
  { label: 'Extra', name: 'extra' }
]

export const PRICE_COLS = [
  {
    title: 'Price type',
    dataIndex: 'type',
  },
  {
    title: 'Electric',
    dataIndex: 'electric'
  },
  {
    title: 'Wifi',
    dataIndex: 'wifi',
  },
  {
    title: 'Water',
    dataIndex: 'water'
  },
  {
    title: 'Living',
    dataIndex: 'living'
  },
  {
    title: 'Extra',
    dataIndex: 'extra'
  }
]
