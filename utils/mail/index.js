const emoji = require('node-emoji')
const mailer = require('nodemailer')
const { OAuth2Client } = require('google-auth-library')
const config = require('../config')
const ejs = require('ejs')

const oauthClient = new OAuth2Client(config.ggId, config.ggSecret)
oauthClient.setCredentials({ refresh_token: config.ggRefresh })

const createTransport = async () => {
  const accessToken = (await oauthClient.getAccessToken())?.token

  return mailer.createTransport({
    service: 'gmail',
    auth: {
      type: 'OAuth2',
      user: config.ggMail,
      clientId: config.ggId,
      clientSecret: config.ggSecret,
      refresh_token: config.ggRefresh,
      accessToken
    }
  })
}

async function send(mailOpts, templateName, ejsData) {
  const templatePath = `${__dirname}/templates/${templateName}.ejs`
  let html = await ejs.renderFile(templatePath, ejsData)

  const transport = await createTransport()
  return transport.sendMail({ ...mailOpts, html })
}


exports.verifyPeople = async(to, data) => {
  const subject = emoji.emojify(':building_construction: Email Confirmation - Staywell')
  const confirmUrl = `${config.host}/registration/verify/${data.userId}`

  return send({ to, subject }, 'confirmEmail', { ...data, confirmUrl })
}
