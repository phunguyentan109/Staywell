import moment from 'moment'

export const DEFAULT_PROFILE = {
  email: '',
  job: '',
  phone:'',
  birthDay: moment(),
  current: '',
  change: '',
  confirm: ''
}

export const PROFILE_INPUT = [
  {
    access: ['PEOPLE_PM'],
    label: 'Your email',
    type: 'email',
    placeholder: 'Enter your email here...',
    name: 'email'
  },
  {
    label:'Your job',
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
    name:'current',
  },
  {
    label:'New Password',
    placeholder:'Enter the new password here...',
    name:'change'
  },
  {
    label:'Confirm Password',
    placeholder:'Confirm your new password here...',
    name:'confirm'
  }
]
