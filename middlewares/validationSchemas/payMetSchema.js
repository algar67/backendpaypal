const { checkSchema } = require('express-validator')

const locale = ['es-ES']

const payMetSchema = checkSchema({
  paymentMethodUuid: {
    in: ['body'],
    exists: true,
    notEmpty: { errorMessage: 'Payment method uuid must not be empty' },
    isString: { errorMessage: 'Payment method uuid must be a string' },
    isAlphanumeric: {
      options: [locale, { ignore: '-' }],
      errorMessage: 'Payment method uuid must only contain letters, numbers and dashes',
    },
    trim: true,
  },
  cardNumber: {
    in: ['body'],
    exists: true,
    notEmpty: { errorMessage: 'Card number must not be empty' },
    isInt: { errorMessage: 'Card number must be a number' },
    isLength: { min: 16, max: 16, errorMessage: 'Card number length is not valid' },
    trim: true,
  },
  cardOwnerName: {
    in: ['body'],
    exists: true,
    notEmpty: { errorMessage: 'Card owner name must not be empty' },
    isString: { errorMessage: 'Card owner name must be a string' },
    isAlpha: {
      options: [locale, { ignore: ' ' }],
      errorMessage: 'Card owner name must only contain letters',
    },
    trim: true,
  },
})

module.exports = { payMetSchema }
