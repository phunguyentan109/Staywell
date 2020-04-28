import {
  OWNER_PERMISSION,
  PEOPLE_PERMISSION,
  isPermit
} from 'constants/credentialControl'

export default function mapState({ user }) {
  const { role } = user.data
  return {
    isOwner: isPermit(role)(OWNER_PERMISSION),
    isPeople: isPermit(role)(PEOPLE_PERMISSION)
  }
}
