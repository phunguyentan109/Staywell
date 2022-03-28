

export const pm = {
  OWNER_PM: '000',
  PEOPLE_PM: '001',
  INACTIVE_PM: '002',
  GUEST_PM: '003',
}


export function verifyPm(_pms = [{ code: pm.GUEST_PM }]) {
  let pmsCode = _pms.map(r => r.code)

  return (access, inAccess = []) => {
    if (!access) return true // Access not exist, no need verification
    let considerAccept = pmsCode.some(p => access.some(a => pm[a] === p))
    let considerDeny = pmsCode.some(p => inAccess.some(a => pm[a] === p))
    return considerAccept && !considerDeny
  }
}

export function mapState({ user }) {
  // const { role } = user.data
  // return { verifyAccess: verifyPm(role) }
}
