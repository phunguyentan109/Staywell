export const REGISTER_USER_ACTION = 'app/Register/REGISTER_USER_ACTION'
export const REGISTER_USER_ACTION_SUCCESS =
  'app/Register/REGISTER_USER_ACTION_SUCCESS'

export const alias = {
  sex: 'sex',
  bg: 'bgColor',
  eye: 'eyeStyle',
  face: 'faceColor',
  glass: 'glassesStyle',
  hair: 'hairStyle',
  hairColor: 'hairColor',
  hat: 'hatStyle',
  hatColor: 'hatColor',
  mouth: 'mouthStyle',
  nose: 'noseStyle',
  shirt: 'shirtStyle',
  shirtColor: 'shirtColor',
}

export const AVATAR_CONFIG = {
  sex: ['man', 'woman'],
  hairStyle: ['normal', 'thick', 'mohawk', 'womanLong', 'womanShort'],
  hairStyleMan: ['normal', 'thick', 'mohawk'],
  hairStyleWoman: ['normal', 'womanLong', 'womanShort'],
  hatStyle: ['beanie' | 'turban', 'none'],
  eyeStyle: ['circle', 'oval', 'smile'],
  glassesStyle: ['round', 'square', 'none'],
  noseStyle: ['short', 'long', 'round'],
  mouthStyle: ['laugh', 'smile', 'peace'],
  shirtStyle: ['hoody', 'short', 'polo'],
  eyeBrowStyle: ['up', 'upWoman'],
}

export const DEFAULT_ACCOUNT = {
  username: '',
  email: '',
}

export const DEFAULT_AVATAR = {
  earSize: 'small',
  eyeBrowStyle: 'up',

  [alias.bg]: 'linear-gradient(45deg, #56b5f0 0%, #45ccb5 100%)',
  [alias.eye]: 'oval',
  [alias.face]: '#F9C9B6',
  [alias.glass]: 'none',
  [alias.hairColor]: '#000',
  [alias.hair]: 'thick',
  [alias.hat]: 'none',
  [alias.mouth]: 'peace',
  [alias.nose]: 'long',
  [alias.sex]: 'man',
  [alias.shirtColor]: '#595959',
  [alias.shirt]: 'hoody',
}
