import { notification } from 'antd'
import moment from 'moment'

const CASES = {
  error: { msg: 'Process is not completed. Please try again!' },
  success: { msg: 'Process\'s completed successfully.' }
}

export function notify(type, description) {
  notification[type]({ message: CASES[type].msg, description })
}

export function formatVND(num) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'VND',
  }).format(num * 1000)
}

export function formatTime(date, hhMM = false) {
  return moment(date).format(hhMM ? 'Do MMM, YYYY HH:mm:ss' : 'Do MMM, YYYY')
}

export function formatFullTextTime (date) {
  return moment(date).format('MMMM Do YYYY')
}
