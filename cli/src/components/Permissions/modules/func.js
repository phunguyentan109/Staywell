import *  as pm from './const'

export function verifyPm(_pms) {
  let pmsCode = _pms.map(r => r.code)
  return (access, inAccess = []) => {
    let considerAccept = pmsCode.some(p => access.some(a => pm[a] === p))
    let considerDeny = pmsCode.some(p => inAccess.some(a => pm[a] === p))
    return considerAccept && !considerDeny
  }
}

export function mapState({ user }) {
  const { role } = user.data
  return {
    isOwner: verifyPm(role)([ pm.OWNER_PM ]),
    isPeople: verifyPm(role)([ pm.PEOPLE_PM ]),
    verifyAccess: verifyPm(role)
  }
}
