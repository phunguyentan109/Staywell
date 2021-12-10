import React from 'react'
import PropTypes from 'prop-types'
import './_style.scss'

function Checkbox({ checked, onClick, value, exceedCheck }) {
  let checkClass = 'far fa-square'

  if (exceedCheck && exceedCheck[0] && exceedCheck[1]) {
    let condition = exceedCheck[1] - exceedCheck[0] > 0
    checkClass = `fas ${condition ? 'fa-minus-square check' : 'fa-check-square check'}`
  } else if (checked) {
    checkClass = 'fas fa-check-square check'
  }

  const checkValue = exceedCheck ? exceedCheck[1] - exceedCheck[0] === 0 : checked

  return (
    <i
      className={`${checkClass} contract-check-box`}
      onClick={() => onClick(!checkValue, value)}
    />
  )
}

Checkbox.propTypes = {
  checked: PropTypes.bool,
  checkDepend: PropTypes.number,
  exceedCheck: PropTypes.array,
  onClick: PropTypes.func,
  value: PropTypes.oneOfType([
    PropTypes.string, PropTypes.number
  ])
}

Checkbox.defaultProps = {
  value: null
}

export default Checkbox
