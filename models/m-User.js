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
    cloudId: String,
    link: {
      type: String,
      default: 'https://images.unsplash.com/photo-1563729574084-950da51d3822?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=100&ixlib=rb-1.2.1&q=80&w=100'
    }
  },
  isVerified: Boolean,
  phone: String,
  job: String,
  birthDate: {
    type: Date,
    default: Date.now
  },
  room_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Room'
  },
  anonymous: {
    type: String,
    set: v => JSON.stringify(v),
  }
}, { timestamps: true })

userSchema.methods.setAnonymous = async(data) => {
  let { tokens, usedTokens } = await refreshTokens(data)
  return {
    tokens: tokens.map(t => t.token),
    usedTokens: usedTokens.map(t => t.token)
  }
}

userSchema.methods.getAnonymous = async function(){
  if (!this.anonymous) return { tokens: [], usedTokens: [] }
  let anonymousData = JSON.parse(this.anonymous)
  return await refreshTokens(anonymousData)
}

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

userSchema.methods.comparePassword = async function(candidatePassword, next){
  try {
    if (!this.password) return false
    return await bcrypt.compare(candidatePassword, this.password)
  } catch (err) {
    return next(err)
  }
}

module.exports = mongoose.model('User', userSchema)


// ========================================================================================
// SUPPORT FUNCTIONS
// ========================================================================================
function filterVerifiedTokens(tokens) {
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
