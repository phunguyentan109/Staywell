import { formatVND } from 'util/helper'

export const DATA_COLS = [
  {
    title: 'Contract',
    dataIndex: 'contract',
  },
  {
    title: 'Room',
    dataIndex: 'room',
  },
  {
    title: 'Deposit',
    dataIndex: 'deposit',
    render: v => formatVND(v / 1000)
  },
]

export const BILL_COLS = [
  {
    title: 'Bill Date',
    dataIndex: 'billDate'
  },
  {
    title: 'Living',
    dataIndex: 'living',
    render: v => formatVND(v / 1000)
  },
  {
    title: 'Electric',
    dataIndex: 'electric',
    render: v => formatVND(v / 1000)
  },
  {
    title: 'Wifi',
    dataIndex: 'wifi',
    render: v => formatVND(v / 1000)
  },
  {
    title: 'Water',
    dataIndex: 'water',
    render: v => formatVND(v / 1000)
  },
  {
    title: 'Extra',
    dataIndex: 'extra',
    render: v => formatVND(v / 1000)
  },
]

export const BILL_ELEMENTS = ['billDate', 'living', 'electric', 'wifi', 'water', 'extra']

export const DEFAULT_PRICE = {
  type: 'Suggest Price',
  electric: 300,
  wifi: 100,
  water: 30,
  living: 3000,
  extra: 100
}

export const PRICE_COLS = [
  {
    title: 'Price type',
    dataIndex: 'type'
  },
  {
    title: 'Electric',
    dataIndex: 'electric',
    render: v => formatVND(v)
  },
  {
    title: 'Wifi',
    dataIndex: 'wifi',
    render: v => formatVND(v)
  },
  {
    title: 'Water',
    dataIndex: 'water',
    render: v => formatVND(v)
  },
  {
    title: 'Living',
    dataIndex: 'living',
    render: v => formatVND(v)
  },
  {
    title: 'Extra',
    dataIndex: 'extra',
    render: v => formatVND(v)
  }
]
