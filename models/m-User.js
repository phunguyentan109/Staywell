const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const db = require('./index')
const jwt = require('jsonwebtoken')

const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  password: String,
  email: {
    type: String,
    required: true,
    unique: true
  },
  avatar: {
    type: String,
    required: true,
    get: v => JSON.parse(v),
    set: v => JSON.stringify(v)
  },
  isVerified: Boolean,
  phone: String,
  job: String,
  birthDate: {
    type: Date,
    default: Date.now
  },
  gender: { type: String, required: true },
  room_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Room'
  },
  anonymous: {
    type: String,
    set: v => JSON.stringify(v),
  }
}, {
  timestamps: true,
  toJSON: { getters: true },
})

// ========================================================================================
// SUPPORT
// ========================================================================================
function filterVerifiedTokens(tokens) {
  if (tokens.length === 0) return tokens
  return Promise.allSettled(tokens.map(async (v) => {
    let data = await jwt.verify(v, process.env.SECRET)
    if (data) return { token: v, ...data }
  }))
}

async function refreshTokens(data) {
  // Verify tokens and get valid tokens with its payload
  let filterTokens = await filterVerifiedTokens(data.tokens)
  let filterUsedTokens = await filterVerifiedTokens(data.usedTokens)
  return {
    tokens: filterTokens.filter(v => v.status === 'fulfilled').map(t => t.value),
    usedTokens: filterUsedTokens.filter(v => v.status === 'fulfilled').map(t => t.value)
  }
}

// ========================================================================================
// HOOKS
// ========================================================================================
userSchema.pre('save', async function(next){
  try {
    //only hash the password if it is modified or new
    if (!this.isModified('password')) return next()

    this.password = await bcrypt.hash(this.password, 10)
    return next()
  } catch (err) {
    return next(err)
  }
})

userSchema.pre('remove', async function(next){
  try {
    await db.UserRole.deleteMany({ user_id: this._id })
    return next()
  } catch (err) {
    return next(err)
  }
})

// ========================================================================================
// METHODS
// ========================================================================================
userSchema.methods.comparePassword = async function(candidatePassword, next){
  try {
    if (!this.password) return false
    return await bcrypt.compare(candidatePassword, this.password)
  } catch (err) {
    return next(err)
  }
}

userSchema.methods.setAnonymousToken = async function (token, type = 'tokens') {
  let anoData = this.anonymous ? JSON.parse(this.anonymous) : { tokens: [], usedTokens: [] }
  let refreshedTokens = await refreshTokens(anoData)

  // REMOVE TOKEN IF EXISTS BEFORE THEN SET TO TYPE
  Object.keys(refreshedTokens).forEach(k => {
    refreshedTokens[k] = refreshedTokens[k].filter(v => v !== token)
  })
  refreshedTokens[type].push(token)

  this.anonymous = { ...refreshedTokens }
  await this.save()
}

userSchema.methods.getAnonymous = async function(){
  if (!this.anonymous) return { tokens: [], usedTokens: [] }
  let anonymousData = JSON.parse(this.anonymous)
  return await refreshTokens(anonymousData)
}

module.exports = mongoose.model('User', userSchema)
