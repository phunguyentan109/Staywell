import React from 'react'
import Auxiliary from 'util/Auxiliary'
import PropTypes from 'prop-types'

const AboutItem = ({ title, icon, desc }) => (
  <Auxiliary>
    <div className='gx-media gx-flex-nowrap gx-mt-3 gx-mt-lg-4 gx-mb-2'>
      <div className='gx-mr-3'>
        <i className={`icon icon-${icon} gx-fs-xlxl gx-text-orange`}/>
      </div>
      <div className='gx-media-body'>
        <h6 className='gx-mb-1 gx-text-grey'>{title}</h6>
        {desc === '' ? null : <p className='gx-mb-0'>{desc}</p>}
      </div>
    </div>
  </Auxiliary>
)

export default AboutItem

AboutItem.propTypes = {
  title: PropTypes.string,
  icon: PropTypes.string,
  desc: PropTypes.string
}