import moment from 'moment'

export function formatVND(num) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'VND',
    currencyDisplay: 'code'
  }).format(num*1000)
}

export function formatTime(date, hhMM = false) {
  return moment(date).format(hhMM ? 'Do MMM, YYYY HH:mm:ss' : 'Do MMM, YYYY')
}
