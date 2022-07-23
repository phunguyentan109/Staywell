module.exports = {
  port: process.env.PORT,
  dbUrl: process.env.DB_URL,
  redis: process.env.REDIS_URL,

  ggSecret: process.env.CLIENT_SECRET,
  ggId: process.env.CLIENT_ID,
  ggRefresh: process.env.REFRESH_TOKEN,
  ggMail: process.env.GMAIL_USER,

  jwtSecret: process.env.SECRET,

  host: process.env.DEVHOST
}
