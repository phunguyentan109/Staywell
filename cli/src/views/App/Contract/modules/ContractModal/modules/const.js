import moment from 'moment'

export function getInitDate() {
  let dayTenth = moment().startOf('month').add(10, 'day')
  return moment().isAfter(dayTenth) ? moment().add(1, 'month').startOf('month') : moment()
}

export const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
}
