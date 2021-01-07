require('dotenv').config()
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const hdl = require('./handlers')
const path = require('path')
const { PORT } = process.env
const { login } = require('./utils/mail')

app.use(express.static(path.join(__dirname, 'cli/build')))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())

app.use('/api/user', require('./routes/r-User'))
app.use('/api/price', require('./routes/r-Price'))
app.use('/api/rooms', require('./routes/r-Room'))

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/cli/build/index.html'))
})

app.post('/api/mail', async(req, res) => {
  await login('kyleharris815490@gmail.com', 'PhuNguyen')
  return res.status(200).json({ success: true })
})

app.use(hdl.Error.invalidRoute)

// All the error will be turned into JSON in here
app.use(hdl.Error.wrapErr)

app.listen(PORT, () => console.log(`[ SERVER IS STARTED ON PORT ${PORT} ]`))
