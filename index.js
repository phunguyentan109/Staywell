require('dotenv').config()
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const path = require('path')
const { userController } = require('./controllers')
const { PORT } = process.env

app.use(express.static(path.join(__dirname, 'build')))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())

app.use('/api/user', require('./routes/r-User'))
app.use('/api/price', require('./routes/r-Price'))
app.use('/api/rooms', require('./routes/r-Room'))
app.use('/api/contracts', require('./routes/r-Contract'))

// For navigate app pages
app.get('/registration/complete/:user_id', userController.complete)

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/build/index.html'))
})

// Not found route handler
app.use((req, res, next) => {
  let err = new Error('Route not found!')
  err.status = 404
  return next(err)
})

// All the error will be turned into JSON in here
app.use((err, req, res, next) => {
  return res.status(err.status).json({
    errors: {
      display: err.logicError,
      debug: err.message,
      occurAt: err.occurAt
    },
  })
})

app.listen(PORT, () => console.log(`[ SERVER IS STARTED ON PORT ${PORT} ]`))

module.exports = app
