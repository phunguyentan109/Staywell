import moment from 'moment'

export const FILTERS = ['Pending', 'Processing', 'Complete']

export const STATUS_FILTERS = [
  { value: null, label: 'All' },
  { value: 'unpaid', label: 'Unpaid' },
  { value: 'processing', label: 'Processing' },
  { value: 'completed', label: 'Completed' },
  { value: 'paused', label: 'Paused' },
]

export const CONSTANT_TIMES = {
  today: {
    from: moment().format(),
    to: moment().format()
  },
  yesterday: {
    from: moment().subtract(1, 'day').startOf('day').format(),
    to: moment().subtract(1, 'day').endOf('day').format()
  },
  thisWeek: {
    from: moment().startOf('isoWeek'),
    to: moment().endOf('isoWeek')
  },
  lastWeek: {
    from: moment().subtract(1, 'weeks').startOf('isoWeek'),
    to: moment().subtract(1, 'weeks').endOf('isoWeek'),
  },
  thisMonth: {
    from: moment().startOf('month'),
    to: moment().endOf('month'),
  },
  lastMonth: {
    from: moment().subtract(1, 'month').startOf('month'),
    to: moment().subtract(1, 'month').endOf('month')
  }
}

export const CREATION_FILTERS = [
  { value: 'all', label: 'All' },
  { value: 'today', label: 'Today' },
  { value: 'yesterday', label: 'Yesterday' },
  { value: 'thisWeek', label: 'This week' },
  { value: 'thisMonth', label: 'This month' },
]
