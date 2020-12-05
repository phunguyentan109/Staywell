import { notification } from 'antd'
import _ from 'lodash'

const CASES = {
  error: { msg: 'Process is not completed. Please try again!' },
  success: { msg: 'Everything\'s done' }
}

export function notify(type, description) {
  notification[type]({ message: CASES[type].msg, description })
}

export function onLoading() {
  let $spin = document.querySelector('.ant-spin-nested-loading')
  let $spinLogo = $spin.querySelector('div:first-child')
  let $spinBlur = $spin.querySelector('div.ant-spin-container')
  // Show loading if there's none
  if (!_.includes($spinBlur.classList, 'ant-spin-blur')) {
    $spinLogo.style.removeProperty('display')
    $spinBlur.classList.add('ant-spin-blur')
  }
}

export function offLoading() {
  let $spin = document.querySelector('.ant-spin-nested-loading')
  let $spinLogo = $spin.querySelector('div:first-child')
  let $spinBlur = $spin.querySelector('div.ant-spin-container')
  // Check if the loading is rendered then hide it
  if (_.includes($spinBlur.classList, 'ant-spin-container')) {
    $spinLogo.style.display = 'none'
    $spinBlur.className = 'ant-spin-container'
  }
}
