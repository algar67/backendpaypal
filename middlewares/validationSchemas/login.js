const { email, password } = require('./authFields')

const loginValidFields = [
  email(),
  password()
]

module.exports = { loginValidFields }
