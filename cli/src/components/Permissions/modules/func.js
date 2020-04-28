import { OWNER_PERMISSION, PEOPLE_PERMISSION, isPermit } from 'constants/credentialControl'

function mapState({ user }) {
  const { role } = user.data
  return {
    role: {
      isOwner: isPermit(role)(OWNER_PERMISSION),
      isPeople: isPermit(role)(PEOPLE_PERMISSION)
    }
  }
}

export default mapState
