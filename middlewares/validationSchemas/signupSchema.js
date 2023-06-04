const { checkSchema } = require('express-validator')

const locale = ['es-ES']

const signupSchema = checkSchema({
  email: {
    in: ['body'],
    exists: true,
    notEmpty: { errorMessage: 'Email must not be empty' },
    isString: { errorMessage: 'Email must be a string' },
    isEmail: {
      errorMessage: 'Wrong email format',
    },
    trim: true,
    normalizeEmail: true,
  },
  password: {
    in: ['body'],
    exists: true,
    notEmpty: { errorMessage: 'Email must not be empty' },
    isString: { errorMessage: 'Email must be a string' },
    isStrongPassword: {
      errorMessage:
        'Password must include: upper and lower case letters, numbers and special characters',
    },
  },
  firstName: {
    in: ['body'],
    exists: true,
    notEmpty: { errorMessage: 'First name must not be empty' },
    isString: { errorMessage: 'First name must be a string' },
    isAlpha: {
      options: [locale, { ignore: ' ' }],
      errorMessage: 'First name must only contain letters',
    },
    trim: true,
  },
  lastName: {
    in: ['body'],
    exists: true,
    notEmpty: { errorMessage: 'Last name must not be empty' },
    isString: { errorMessage: 'Last name must be a string' },
    isAlpha: {
      options: [locale, { ignore: ' ' }],
      errorMessage: 'Last name must only contain letters',
    },
    trim: true,
  },
  phone: {
    in: ['body'],
    exists: true,
    notEmpty: { errorMessage: 'Phone must not be empty' },
    isInt: { errorMessage: 'Phone must be a number' },
    trim: true,
  },
  birthDate: {
    in: ['body'],
    exists: true,
    notEmpty: { errorMessage: 'Birth date must not be empty' },
    // isDate: { errorMessage: 'Birth date must be a date' },
    trim: true,
  },
  gender: {
    in: ['body'],
    exists: true,
    notEmpty: { errorMessage: 'Gender must not be empty' },
    isString: { errorMessage: 'Gender must be a string' },
    isAlpha: {
      options: [locale, { ignore: ' ' }],
      errorMessage: 'Gender must only contain letters',
    },
    trim: true,
  },
  address: {
    in: ['body'],
    exists: true,
    notEmpty: { errorMessage: 'Address must not be empty' },
    isString: { errorMessage: 'Address must be a string' },
    isAlphanumeric: {
      options: [locale, { ignore: ' ' }],
      errorMessage: 'Address must only contain letters or numbers',
    },
    trim: true,
  },
  city: {
    in: ['body'],
    exists: true,
    notEmpty: { errorMessage: 'City must not be empty' },
    isString: { errorMessage: 'City must be a string' },
    isAlpha: {
      options: [locale, { ignore: ' ' }],
      errorMessage: 'City must only contain letters',
    },
    trim: true,
  },
  state: {
    in: ['body'],
    exists: true,
    notEmpty: { errorMessage: 'State must not be empty' },
    isString: { errorMessage: 'State must be a string' },
    isAlpha: {
      options: [locale, { ignore: ' ' }],
      errorMessage: 'State must only contain letters',
    },
    trim: true,
  },
  country: {
    in: ['body'],
    exists: true,
    notEmpty: { errorMessage: 'Country must not be empty' },
    isString: { errorMessage: 'Country must be a string' },
    isAlpha: {
      options: [locale, { ignore: ' ' }],
      errorMessage: 'Country must only contain letters',
    },
    trim: true,
  },
  timeZone: {
    in: ['body'],
    exists: true,
    notEmpty: { errorMessage: 'Time zone must not be empty' },
    isInt: {
      options: [locale, { ignore: ' ' }],
      errorMessage: 'Time zone must be a number',
    },
    trim: true,
  },
})

module.exports = { signupSchema }
