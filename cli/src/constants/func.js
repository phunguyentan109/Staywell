import { notification } from 'antd'

const CASES = {
  error: { msg: 'Process is not completed.' },
  success: { msg: 'Everything\'s done' }
}

export function notify(type, description) {
  notification[type]({ message: CASES[type].msg, description })
}