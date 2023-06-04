const { validationResult } = require('express-validator')

const loginValid = (req, res, next) => {
  try {
    validationResult(req).throw()
    return next()
  } catch (err) {
    return res.status(401).json('invalid email or password').end()
  }
}

module.exports = { loginValid }
