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
    access: ['PEOPLE_PM'],
    label: 'Your email',
    type: 'email',
    placeholder: 'Enter your email here...',
    name: 'email'
  },
  {
    access: [''],
    label:'Your job',
    type:'text',
    placeholder:'Enter your job here...',
    name:'job'
  },
  {
    access: [''],
    label:'Your phone',
    type:'number',
    placeholder:'Enter your phone here...',
    name:'phone'
  }
]

export const PASSWORD_INPUT = [
  {
    access: [''],
    label:'Current Password',
    placeholder:'Enter the current password here...',
    name:'current'
  },
  {
    access: [''],
    label:'New Password',
    placeholder:'Enter the new password here...',
    name:'change'
  },
  {
    access: [''],
    label:'Confirm Password',
    placeholder:'Confirm your new password here...',
    name:'confirm'
  }
]