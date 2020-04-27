const mapStateToProps = ({ user, settings }) => {
  const { navStyle, themeType, locale, pathname } = settings
  const { isPermit } = permissions
  const { role } = user.data
  return {
    navStyle, themeType, locale, pathname,
    user: user.data,
    role: {
      isOwner: isPermit(role)(permissions.OWNER_PERMISSION),
      isPeople: isPermit(role)(permissions.PEOPLE_PERMISSION)
    }
  }
}
