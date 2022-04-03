const emoji = require('node-emoji')
const sgMail = require('@sendgrid/mail')
const ejs = require('ejs')
const fs = require('fs')
const LogicError = require('../shield')
const { GMAIL_USER, SENDGRID_API_KEY } = process.env

sgMail.setApiKey(SENDGRID_API_KEY)

async function send(info, templateName, data) {
  const templatePath = `${__dirname}/templates/${templateName}.ejs`
  const readTemplate = fs.readFileSync(templatePath, 'utf-8')
  let html = ejs.compile(readTemplate)(data)

  await sgMail.send({ ...info, from: GMAIL_USER, html })
}

exports.confirmMail = async(host, { to, viewName, userId }) => {
  try {
    const subject = emoji.emojify(':building_construction: Email Confirmation - Staywell')
    const confirmUrl = `${process.env.DEVHOST || host}/registration/complete/${userId}`

    await send({ to, subject }, 'confirmEmail', { viewName, confirmUrl })
  } catch (e) {
    throw new LogicError(e, 'utils.mail.confirmMail', 'Failed to send mail')
  }

}
