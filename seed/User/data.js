const OWNER = {
  email: process.env.GMAIL_USER,
  password: 'owner',
  username: 'owner'
}

const PEOPLE = [
  {
    email: 'magazine.group@gmail.com',
    username: 'magazine.group',
    isVerified: true
  },
  {
    email: 'nothinglike1@gmail.com',
    username: 'nothinglike1'
  },
  {
    email: 'great121@gmail.com',
    username: 'great121',
    isVerified: true
  },
  {
    email: 'becauseopu13@gmail.com',
    username: 'becauseopu13'
  },
  {
    email: 'newbb213@gmail.com',
    username: 'newbb213',
    isVerified: true
  }
]

module.exports = { OWNER, PEOPLE }
