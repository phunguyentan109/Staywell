import moment from 'moment'

export const DEFAULT_PASSWORD = {
  current: '',
  change: '',
  confirm: ''
}

export const DEFAULT_PROFILE = {
  email: '',
  job: '',
  phone:'',
  birthDate: moment()
}

export const PROFILE_INPUT = [
  {
    label:'Your job',
    type:'text',
    placeholder:'Enter your job here...',
    name:'job'
  },
  {
    label:'Your phone',
    type:'number',
    placeholder:'Enter your phone here...',
    name:'phone'
  }
]

export const PASSWORD_INPUT = [
  {
    label:'Current Password',
    placeholder:'Enter the current password here...',
    name:'current'
  },
  {
    label:'New Password',
    placeholder:'Enter the new password here...',
    name:'change'
  },
  {
    label:'Confirm New Password',
    placeholder:'Confirm your password here...',
    name:'confirm'
  }
]