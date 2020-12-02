import { notification } from 'antd'

const CASES = {
  error: { msg: 'Process is not completed. Please try again!' },
  success: { msg: 'Everything\'s done' }
}

export function notify(type, description) {
  notification[type]({ message: CASES[type].msg, description })
}
