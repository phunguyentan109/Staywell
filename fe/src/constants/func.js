import { notification } from 'antd'

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
