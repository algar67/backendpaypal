const express = require('express')
const path = require('path')
const logger = require('morgan')
const cors = require('cors')
require('dotenv').config({ path: './.env' })
const validateToken = require('./middlewares/validators/tokenValid')
const { validateResult } = require('./middlewares/validators/bodyValid')
const { loginValidFields } = require('./middlewares/validationSchemas/login')
const { loginValid } = require('./middlewares/validators/loginValid')
const { signupSchema } = require('./middlewares/validationSchemas/signupSchema')
const app = express()

// middlewares
app.use(logger('dev'))
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'public')))

// public routes
app.get('/', function (req, res) {
  res.status(200).json('Hello world')
})
app.post('/login', loginValidFields, loginValid, require('./controllers/Auth/loginController'))
app.post('/signup', signupSchema, validateResult, require('./controllers/Auth/signupController'))

//private routes
app.use('/private', validateToken, require('./routes'))

module.exports = app
