import React from 'react'
import '../_styles.scss'
import PublicLayout from 'layout/PublicLayout'

function Confirm(props) {
  console.log('access confirm')
  return (
    <PublicLayout>
      <div className='confirm-content'>
        <i className='far fa-check-circle'/>
        <h1>Information Successfully Verified!</h1>
        <p>Thank you for choosing us and put your trust in to our service, wish you to have a good time!</p>
      </div>
    </PublicLayout>
  )
}

export default Confirm
