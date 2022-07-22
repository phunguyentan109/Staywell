export const REGISTER_USER_ACTION = 'app/Register/REGISTER_USER_ACTION'
export const REGISTER_USER_ACTION_SUCCESS = 'app/Register/REGISTER_USER_ACTION_SUCCESS'

export const GENDER = {
  man: 'man',
  woman: 'woman',
}

export const DEFAULT_ACCOUNT = {
  username: '',
  email: '',
  gender: GENDER.man,
  avatar: ''
}

export const AVATAR_CONFIG = {
  sex: [GENDER.man, GENDER.woman],
  earSize: ['small', 'big'],
  hairStyle: ['normal', 'thick', 'mohawk', 'womanLong', 'womanShort'],
  hairStyleMan: ['normal', 'thick', 'mohawk'],
  hairStyleWoman: ['normal', 'womanLong', 'womanShort'],
  hatStyle: ['beanie' |'turban', 'none'],
  eyeStyle: ['circle', 'oval', 'smile'],
  glassesStyle: ['round', 'square', 'none'],
  noseStyle: ['short', 'long', 'round'],
  mouthStyle: ['laugh', 'smile', 'peace'],
  shirtStyle: ['hoody', 'short', 'polo'],
  eyeBrowStyle: ['up', 'upWoman'],
  isGradient: [true, false]
}
