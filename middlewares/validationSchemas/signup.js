const {
  email,
  password,
  firstName,
  lastName,
  phone,
  birthDate,
  timeZone,
  address,
  city,
  country,
} = require('./authFields')

const signupValidFields = [
  email(),
  password(),
  firstName(),
  lastName(),
  phone(),
  birthDate(),
  address(),
  city(),
  country(),
  timeZone(),
]

module.exports = { signupValidFields }
