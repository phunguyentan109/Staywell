const emoji = require('node-emoji')
const sgMail = require('@sendgrid/mail')
const ejs = require('ejs')
const fs = require('fs')
const { GMAIL_USER, SENDGRID_API_KEY } = process.env

sgMail.setApiKey(SENDGRID_API_KEY)

/*
async function activate(to, viewName, id, host) {
  let subject = emoji.emojify(':closed_lock_with_key: Activate your account - Staywell')
  let text = `
Good day ${viewName}, this mail comes from Staywell,

Please click to the link below for completing the activation of your account:
https://${host}/activate/${id}

And that's all, thank you for your time. Have a good day and see you later.

This is the automatic email from the system, please do not reply.`
  return await send(to, subject, text)
}

async function getRoom(to, viewName, roomName) {
  let subject = emoji.emojify(':house_with_garden: Your new place is ready, start living now - Staywell')
  let text = `
Good day ${viewName}, this mail comes from Staywell,

Your place has been arranged, everything is ready and you will stay in room ${roomName}. You can come and live from now.

This is the automatic email from the system, please do not reply.`
  return await send(to, subject, text)
}

async function leaveRoom(to, viewName, roomName) {
  let subject = emoji.emojify(':dash: Your staying contract has come to the end - Staywell')
  let text = `
Good day ${viewName}, this mail comes from Staywell,

You have been removed from room ${roomName}.
We will notify you about your place as soon as possible if there are any changes made.

This is the automatic email from the system, please do not reply.`
  return await send(to, subject, text)
}

async function forgotPassword(to, viewName, token, host) {
  let subject = emoji.emojify(':building_construction: Are you forgot password ? - Staywell')
  let text = `
Good day ${viewName}, this mail comes from Staywell,

This mail available in 1 hour. Please click the link below to reset your password:
https://${host}/reset/${token}

And that's all, thank you for your time. Have a good day and see you later.
This is the automatic email from the system, please do not reply.`
  return await send(to, subject, text)
}

async function changePassword(to, viewName) {
  let subject = emoji.emojify(':wrench: Your password has been changed - Staywell')
  let text = `
Good day ${viewName}, this mail comes from Staywell,

We will notify you about your password has been changed.

This is the automatic email from the system, please do not reply.`
  return await send(to, subject, text)
}

async function contactUser(to, viewName, content, title) {
  let subject = emoji.emojify(`:calling: Owner had sent - ${title} - Staywell`)
  let text = `
Good day ${viewName}, this mail comes from Staywell,

${content}.`
  return await send(to, subject, text)
}
*/

// async function sgSend({ to, subject, html }) {
//   try {
//     let data = { from: GMAIL_USER, to, subject, html }
//
//     await sgMail.send(data)
//   } catch (err) {
//     return err
//   }
// }

async function send(info, templateName, data) {
  try {
    const testTemplate = `./mailTemplate/${templateName}.ejs`
    const readTemplate = fs.readFileSync(`${__dirname}/${testTemplate}`, 'utf-8')
    let html = ejs.compile(readTemplate)(data)

    await sgMail.send({ ...info, from: GMAIL_USER, html })
  } catch (err) {
    return err
  }
}

async function login(to, viewName, token, host) {
  const subject = emoji.emojify(':building_construction: You login yet - Staywell')
  const forgotLink = `https://${host}/reset/${token}`
  const support_url = 'https://staywellapp.herokuapp.com/'

  await send({ to, subject }, 'testTemplate', { viewName, forgotLink, support_url })

  // const testTemplate = './mailTemplate/testTemplate.ejs'
  // const readTemplate = fs.readFileSync(`${__dirname}/${testTemplate}`, 'utf-8')
  // let htmlAfterCompile = ejs.compile(readTemplate)

  // await send({ , html: htmlAfterCompile() })
}

module.exports = { login }
// module.exports = { send, activate, getRoom, leaveRoom, contactUser, changePassword, forgotPassword, login }
