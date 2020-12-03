import { notification } from 'antd'

const CASES = {
  error: { msg: 'Process is not completed. Please try again!' },
  success: { msg: 'Everything\'s done' }
}

export function notify(type, description) {
  notification[type]({ message: CASES[type].msg, description })
}

export function tgLoading() {
  let $spin = document.querySelector('.ant-spin-nested-loading')
  let $spinLogo = $spin.querySelector('div:first-child')
  let $spinBlur = $spin.querySelector('div.ant-spin-container')

  if ($spinLogo.style.display === 'none') {
    $spinLogo.style.removeProperty('display')
    $spinBlur.classList.add('ant-spin-blur')
  } else {
    $spinLogo.style.display = 'none'
    $spinBlur.className = 'ant-spin-container'
  }
}
