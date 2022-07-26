import React, { useMemo, useState } from 'react'
import _ from 'lodash'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import Avatar, { genConfig } from 'react-nice-avatar'
import { Segmented } from 'antd'
import './_styles.less'
import { DEFAULT_ACCOUNT, AVATAR_CONFIG, GENDER } from './const'
import { registerUserAction } from './redux/action'
import { selectRegister } from './redux/selector'

export default function Register(props) {
  const { loading } = useSelector(selectRegister)
  const dp = useDispatch()
  const [account, setAccount] = useState(_.cloneDeep(DEFAULT_ACCOUNT))
  const [avatar, setAvatar] = useState({
    bgColor: 'linear-gradient(45deg, #56b5f0 0%, #45ccb5 100%)',
    earSize: 'small',
    eyeBrowStyle: 'up',
    eyeStyle: 'oval',
    faceColor: '#F9C9B6',
    glassesStyle: 'none',
    hairColor: '#000',
    hairStyle: 'normal',
    hatColor: '#D2EFF3',
    hatStyle: 'beanie',
    mouthStyle: 'smile',
    noseStyle: 'short',
    sex: 'man',
    shirtColor: '#595959',
    shirtStyle: 'hoody'
  })

  async function hdSubmit(e) {
    e.preventDefault()
    dp(registerUserAction({
      ...account,
      avatar: JSON.stringify(avatar)
    }, () => {
      setAccount(_.cloneDeep(DEFAULT_ACCOUNT))
    }))
  }

  function hdChange(e) {
    const { value, name } = e.target
    setAccount(prev => ({ ...prev, [name]: value }))
  }

  const isMan = useMemo(() => account.gender === 'man', [account.gender])

  function hdChangeAvatarSelector(value, name ) {
    setAvatar(prev => ({ ...prev, [name]: value }))
  }

  function hdChangeAvatar(e) {
    const { value, name } = e.target
    setAvatar(prev => ({ ...prev, [name]: value }))
  }

  return (
    <div className='register-content'>
      <div className='register-left'>
        <div className='newAvatar'>
          <Avatar
            className='customAvatar'
            {...genConfig(avatar)}
          />
        </div>

        {/* Start avatar input */}
        <div className='avatar-selector'>
          <span>Face Color</span>
          <input
            type='color'
            value={avatar.faceColor}
            onChange={(value) => hdChangeAvatar(value, 'faceColor')}
            name='faceColor'
          />
        </div>

        <div className='avatar-selector'>
          <span>Hair Color</span>
          <input
            type='color'
            value={avatar.hairColor}
            onChange={(value) => hdChangeAvatar(value, 'hairColor')}
            name='hairColor'
          />
        </div>

        <div className='avatar-selector'>
          <span>Hat Color</span>
          <input
            type='color'
            value={avatar.hatColor}
            onChange={(value) => hdChangeAvatar(value, 'hatColor')}
            name='hatColor'
          />
        </div>

        <div className='avatar-selector'>
          <span>Shirt Color</span>
          <input
            type='color'
            value={avatar.shirtColor}
            onChange={(value) => hdChangeAvatar(value, 'shirtColor')}
            name='shirtColor'
          />
        </div>

        <div className='avatar-selector'>
          <span>Background Color</span>
          <input
            type='color'
            value={avatar.bgColor}
            onChange={(value) => hdChangeAvatar(value, 'bgColor')}
            name='bgColor'
          />
        </div>

        {/* End avatar input */}

        {/* Start avatar selector */}
        <div className='avatar-selector'>
          <span>Is Gradient</span>
          <Segmented
            options={AVATAR_CONFIG.isGradient}
            value={avatar.isGradient}
            onChange={(value) => hdChangeAvatarSelector(value, 'isGradient')}
            name='isGradient'
          />
        </div>

        <div className='avatar-selector'>
          <span>Sex</span>
          <Segmented
            options={AVATAR_CONFIG.sex}
            value={avatar.sex}
            onChange={(value) => hdChangeAvatarSelector(value, 'sex')}
            name='sex'
          />
        </div>

        <div className='avatar-selector'>
          <span>Ear Size</span>
          <Segmented
            options={AVATAR_CONFIG.earSize}
            value={avatar.earSize}
            onChange={(value) => hdChangeAvatarSelector(value, 'earSize')}
            name='earSize'
          />
        </div>

        <div className='avatar-selector'>
          <span>Hair Style</span>
          <Segmented
            options={AVATAR_CONFIG.hairStyle}
            value={avatar.hairStyle}
            onChange={(value) => hdChangeAvatarSelector(value, 'hairStyle')}
            name='hairStyle'
          />
        </div>

        {
          avatar.sex === GENDER.man
            ? <div className='avatar-selector'>
              <span>Hair Style Man</span>
              <Segmented
                options={AVATAR_CONFIG.hairStyleMan}
                value={avatar.hairStyleMan}
                onChange={(value) => hdChangeAvatarSelector(value, 'hairStyleMan')}
                name='hairStyleMan'
              />
            </div>
            : <div className='avatar-selector'>
              <span>Hair Style Woman</span>
              <Segmented
                options={AVATAR_CONFIG.hairStyleWoman}
                value={avatar.hairStyleWoman}
                onChange={(value) => hdChangeAvatarSelector(value, 'hairStyleWoman')}
                name='hairStyleWoman'
              />
            </div>
        }

        <div className='avatar-selector'>
          <span>Hat Style</span>
          <Segmented
            options={AVATAR_CONFIG.hatStyle}
            value={avatar.hatStyle}
            onChange={(value) => hdChangeAvatarSelector(value, 'hatStyle')}
            name='hatStyle'
          />
        </div>

        <div className='avatar-selector'>
          <span>Eye Style</span>
          <Segmented
            options={AVATAR_CONFIG.eyeStyle}
            value={avatar.eyeStyle}
            onChange={(value) => hdChangeAvatarSelector(value, 'eyeStyle')}
            name='eyeStyle'
          />
        </div>

        <div className='avatar-selector'>
          <span>Glasses Style</span>
          <Segmented
            options={AVATAR_CONFIG.glassesStyle}
            value={avatar.glassesStyle}
            onChange={(value) => hdChangeAvatarSelector(value, 'glassesStyle')}
            name='glassesStyle'
          />
        </div>

        <div className='avatar-selector'>
          <span>Nose Style</span>
          <Segmented
            options={AVATAR_CONFIG.noseStyle}
            value={avatar.noseStyle}
            onChange={(value) => hdChangeAvatarSelector(value, 'noseStyle')}
            name='noseStyle'
          />
        </div>

        <div className='avatar-selector'>
          <span>Mouth Style</span>
          <Segmented
            options={AVATAR_CONFIG.mouthStyle}
            value={avatar.mouthStyle}
            onChange={(value) => hdChangeAvatarSelector(value, 'mouthStyle')}
            name='mouthStyle'
          />
        </div>

        <div className='avatar-selector'>
          <span>Shirt Style</span>
          <Segmented
            options={AVATAR_CONFIG.shirtStyle}
            value={avatar.shirtStyle}
            onChange={(value) => hdChangeAvatarSelector(value, 'shirtStyle')}
            name='shirtStyle'
          />
        </div>

        <div className='avatar-selector'>
          <span>EyeBrowStyle</span>
          <Segmented
            options={AVATAR_CONFIG.eyeBrowStyle}
            value={avatar.eyeBrowStyle}
            onChange={(value) => hdChangeAvatarSelector(value, 'eyeBrowStyle')}
            name='eyeBrowStyle'
          />
        </div>
        {/* End avatar selector */}
      </div>
      <div className='register-right'>
        <form onSubmit={hdSubmit}>
          <h1>Sign up</h1>
          <h4>Please fill in below to complete registration</h4>
          <div className='auth-input'>
            <i className='far fa-user'/>
            <input
              placeholder='What should we call you?'
              name='username'
              value={account.username}
              onChange={hdChange}
            />
          </div>

          <div className='auth-input'>
            <i className='far fa-envelope'/>
            <input
              placeholder= 'Email to keep informed'
              name='email'
              onChange={hdChange}
              value={account.email}
            />
          </div>

          <div className='auth-select'>
            <button
              type='button'
              className={isMan ? 'select' : ''}
              onClick={() => setAccount(prev => ({ ...prev, gender: 'man' }))}
            >
              {isMan && <i className='fas fa-male mr-xs'/>} Male
            </button>
            <span>OR</span>
            <button
              type='button'
              className={!isMan ? 'select' : ''}
              onClick={() => setAccount(prev => ({ ...prev, gender: 'woman' }))}
            >
              {isMan || <i className='fas fa-female mr-xs'/>} Female
            </button>
          </div>

          <button type='submit' className='signup' disabled={loading}>
            {
              loading
                ? <i className='fas fa-circle-notch fa-spin'/>
                : 'Confirm'
            }
          </button>
        </form>
      </div>
    </div>
  )
}

Register.propTypes = {
  register: PropTypes.object,
  addMessage: PropTypes.func,
  registerUserAction: PropTypes.func,
  hdRegister: PropTypes.func
}

Register.defaultProps = {
  message: '',
  allow: false
}
